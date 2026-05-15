<template>
  <div class="table-wrapper">
    <table class="users-table">
      <thead>
        <tr>
          <th @click="$emit('sort', 'name')">Name</th>
          <th @click="$emit('sort', 'email')">Email</th>
          <th @click="$emit('sort', 'age')">Age</th>
          <th @click="$emit('sort', 'role')">Role</th>
          <th @click="$emit('sort', 'createdAt')">Created</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.role }}</td>
          <td>{{ new Date(user.createdAt).toLocaleDateString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    required: true,
  },
})

defineEmits(['sort'])
</script>

<style scoped>
.table-wrapper {
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 4px;
}

.users-table thead {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--button-hover);
  border-bottom: 2px solid var(--border-color);
}

.users-table th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
}

.users-table th:hover {
  background-color: var(--button-active);
}

.users-table tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.users-table td {
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
}

.users-table tbody tr:last-child td {
  border-bottom: none;
}

/* Tablet styles (768px and below) */
@media (max-width: 768px) {
  .users-table th,
  .users-table td {
    padding: 8px;
    font-size: 14px;
  }

  .users-table th {
    font-weight: 500;
  }
}

/* Mobile styles (480px and below) */
@media (max-width: 480px) {
  .table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .users-table {
    min-width: 500px;
    font-size: 12px;
  }

  .users-table th,
  .users-table td {
    padding: 6px;
  }

  /* Hide email column on very small screens */
  .users-table th:nth-child(2),
  .users-table td:nth-child(2) {
    display: none;
  }
}

/* Extra small screens (360px and below) */
@media (max-width: 360px) {
  .users-table {
    min-width: 400px;
    font-size: 11px;
  }

  .users-table th,
  .users-table td {
    padding: 4px;
  }
}
</style>
