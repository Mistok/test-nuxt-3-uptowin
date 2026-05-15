<template>
  <div class="container">
    <ThemeSwitcher class="themeSwitcher"/>
    <NuxtPage />
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}
.themeSwitcher {
  margin-bottom: 16px;
}
</style>

<script setup>
import { useGeneralStore } from '~/stores/general'
import { onMounted, watch } from 'vue'

const store = useGeneralStore()

// Initialize theme on mount
onMounted(() => {
  if (process.client) {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      store.setTheme(savedTheme)
    } else {
      // Check system preference
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      store.setTheme(isDark ? 'dark' : 'light')
    }
  }
})

// Watch theme changes and save to localStorage
const unwatch = watch(
  () => store.theme,
  (newTheme) => {
    if (process.client) {
      localStorage.setItem('theme', newTheme)
    }
  }
)
</script>