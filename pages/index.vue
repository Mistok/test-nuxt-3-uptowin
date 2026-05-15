<template>
  <UserFilters
    :search="search"
    :role="role"
    :perPage="perPage"
    @update:search="search = $event"
    @update:role="role = $event"
    @update:perPage="perPage = $event"
  />

  <UserTable
    :users="paginatedUsers"
    @sort="onSort"
  />

  <div class="pagination">
    <button
      @click="page--"
      :disabled="page === 1"
    >
      Prev
    </button>

    <span>{{ page }} / {{ totalPages }}</span>

    <button
      @click="page++"
      :disabled="page === totalPages"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { users } from '~/data/users'
import { useUsersTable } from '~/composables/useUsersTable'

const {
  search,
  role,
  sortBy,
  sortDirection,
  page,
  perPage,
  paginatedUsers,
  totalPages,
} = useUsersTable(users)

function onSort(field) {
  if (sortBy.value === field) {
    sortDirection.value =
      sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortDirection.value = 'asc'
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.pagination button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination span {
  padding: 0 8px;
  font-size: 14px;
  white-space: nowrap;
}

/* Mobile styles */
@media (max-width: 480px) {
  .pagination {
    flex-wrap: wrap;
    gap: 4px;
  }

  .pagination button {
    padding: 6px 12px;
    font-size: 12px;
  }

  .pagination span {
    padding: 0 4px;
    font-size: 12px;
    width: 100%;
    text-align: center;
    order: 3;
  }
}
</style>
