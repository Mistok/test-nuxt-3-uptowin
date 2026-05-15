import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface User {
  id: number
  name: string
  email: string
  age: number
  role: string
  createdAt: string
}

// Simple debounce function
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: number | undefined
  return function (...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export function useUsersTable(users: User[]) {
  const route = useRoute()
  const router = useRouter()

  // filters
  const search = ref('')
  const role = ref<string | null>(null)

  // sorting
  const sortBy = ref<string | null>(null) // 'age' | 'createdAt'
  const sortDirection = ref('asc')

  // pagination
  const page = ref(1)
  const perPage = ref(10)

  // Filtered users - apply role and search filters
  const filteredUsers = computed(() => {
    return users.filter((user: User) => {
      // Role filter
      if (role.value && user.role !== role.value) {
        return false
      }

      // Search filter (case-insensitive, search in name and email)
      if (search.value) {
        const searchLower = search.value.toLowerCase()
        const nameMatch = user.name.toLowerCase().includes(searchLower)
        const emailMatch = user.email.toLowerCase().includes(searchLower)
        if (!nameMatch && !emailMatch) {
          return false
        }
      }

      return true
    })
  })

  // Sorted users - apply sorting logic
  const sortedUsers = computed(() => {
    const sorted = [...filteredUsers.value]

    if (sortBy.value) {
      sorted.sort((a, b) => {
        let aVal: number
        let bVal: number

        if (sortBy.value === 'age') {
          aVal = a.age
          bVal = b.age
        } else if (sortBy.value === 'createdAt') {
          aVal = new Date(a.createdAt).getTime()
          bVal = new Date(b.createdAt).getTime()
        } else {
          return 0
        }

        if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1
        if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1
        return 0
      })
    }

    return sorted
  })

  // Paginated users
  const paginatedUsers = computed(() => {
    const start = (page.value - 1) * perPage.value
    const end = start + perPage.value
    return sortedUsers.value.slice(start, end)
  })

  // Total pages
  const totalPages = computed(() => {
    return Math.ceil(sortedUsers.value.length / perPage.value)
  })

  // Sync filters to query params
  const updateQueryParams = () => {
    const query: Record<string, string | number | undefined> = {
      search: search.value || undefined,
      role: role.value || undefined,
      sortBy: sortBy.value || undefined,
      sortDirection: sortDirection.value === 'asc' ? undefined : sortDirection.value,
      page: page.value === 1 ? undefined : page.value,
      perPage: perPage.value === 10 ? undefined : perPage.value,
    }

    // Remove undefined values
    Object.keys(query).forEach((key) => {
      if (query[key] === undefined) delete query[key]
    })

    router.push({ query })
  }

  // Debounced update for search
  const debouncedUpdateQueryParams = debounce(updateQueryParams, 500)

  // Reset page to 1 when filters, sorting, or page size change
  watch(
    [search, role, sortBy, sortDirection, perPage],
    () => {
      if (page.value !== 1) {
        page.value = 1
      }
    }
  )

  // Update query params when filter/sort/pagination state changes
  watch(
    [search, role, sortBy, sortDirection, page, perPage],
    () => {
      debouncedUpdateQueryParams()
    },
    { deep: true }
  )

  // Initialize from query params on mount
  onMounted(() => {
    if (typeof route.query.search === 'string') search.value = route.query.search
    if (typeof route.query.role === 'string') role.value = route.query.role
    if (typeof route.query.sortBy === 'string') sortBy.value = route.query.sortBy
    if (typeof route.query.sortDirection === 'string') sortDirection.value = route.query.sortDirection
    if (typeof route.query.page === 'string') page.value = parseInt(route.query.page)
    if (typeof route.query.perPage === 'string') perPage.value = parseInt(route.query.perPage)
  })

  return {
    search,
    role,
    sortBy,
    sortDirection,
    page,
    perPage,

    filteredUsers,
    sortedUsers,
    paginatedUsers,
    totalPages,
  }
}
