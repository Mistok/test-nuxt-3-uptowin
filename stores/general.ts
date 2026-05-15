import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGeneralStore = defineStore('general', () => {
  const theme = ref<'light' | 'dark'>('light')

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    // Apply theme to HTML element
    if (process.client) {
      if (theme.value === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
    if (process.client) {
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  return {
    theme,
    toggleTheme,
    setTheme,
  }
})