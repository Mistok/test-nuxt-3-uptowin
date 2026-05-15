<template>
  <div class="filters">
    <input
      :value="search"
      @input="$emit('update:search', $event.target.value)"
      placeholder="Search by name or email"
    />

    <BaseSelect
      :model-value="role"
      @update:model-value="$emit('update:role', $event)"
      :options="['admin', 'manager', 'user']"
    />

    <div class="per-page-buttons">
      <button
        v-for="option in [10, 15, 20]"
        :key="option"
        :class="{ active: perPage === option }"
        @click="$emit('update:perPage', option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  search: String,
  role: String,
  perPage: Number,
})

defineEmits([
  'update:search',
  'update:role',
  'update:perPage',
])
</script>

<style scoped>
.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.per-page-buttons {
  display: flex;
  gap: 4px;
}

.per-page-buttons button {
  padding: 4px 8px;
  border: 1px solid var(--border-color);
  background-color: var(--button-bg);
  color: var(--text-color);
  cursor: pointer;
  font-size: 14px;
}

.per-page-buttons button:hover {
  background-color: var(--button-hover);
}

.per-page-buttons button.active {
  background-color: var(--button-hover);
  font-weight: bold;
}

input {
  padding: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-color);
  color: var(--text-color);
  border-radius: 4px;
  flex: 1;
  font-size: 14px;
}

input::placeholder {
  opacity: 0.6;
}

/* Tablet styles */
@media (max-width: 768px) {
  .filters {
    gap: 6px;
  }

  input {
    padding: 6px;
    font-size: 13px;
  }

  .per-page-buttons button {
    padding: 4px 6px;
    font-size: 12px;
  }
}

/* Mobile styles */
@media (max-width: 480px) {
  .filters {
    flex-direction: column;
    gap: 8px;
  }

  input {
    width: 100%;
    padding: 8px;
    font-size: 14px;
  }

  .per-page-buttons {
    width: 100%;
  }

  .per-page-buttons button {
    flex: 1;
    padding: 8px 4px;
    font-size: 12px;
  }
}
</style>
