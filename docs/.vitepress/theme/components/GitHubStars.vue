<script setup>
import { onMounted, ref } from 'vue'

const githubStars = ref(null)

onMounted(async () => {
  const response = await fetch(
    'https://api.github.com/repos/enzonotario/esjs-dolar-api',
  )
  const data = await response.json()
  githubStars.value = data.stargazers_count
})
</script>

<template>
  <div class="flex items-center px-2">
    <a
      href="https://github.com/enzonotario/esjs-dolar-api"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center px-2.5 py-0.5 space-x-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm font-medium rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <span v-if="false" class="i-mdi-home w-5 h-5" />
      <span class="i-mdi-star-outline w-5 h-5" />

      <span class="stars">Stars: </span>
      <span>{{ githubStars }}</span>
    </a>
  </div>
</template>

<style scoped>
@reference "../style.css";

.stars {
  @apply hidden sm:block;
}
</style>
