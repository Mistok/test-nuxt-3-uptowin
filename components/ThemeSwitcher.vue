<template>
  <button class="theme-switcher" @click="store.toggleTheme()">
    {{ store.theme === 'light' ? '🌙' : '☀️' }}
    {{ store.theme === 'light' ? 'Dark' : 'Light' }}
  </button>
</template>

<script setup>
import { useGeneralStore } from '~/stores/general'

const store = useGeneralStore()
</script>

<style scoped>
.theme-switcher {
  padding: 6px 12px;
  border: 1px solid var(--border-color);
  background-color: var(--button-bg);
  color: var(--text-color);
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s;
}

.theme-switcher:hover {
  background-color: var(--button-hover);
}
</style>
