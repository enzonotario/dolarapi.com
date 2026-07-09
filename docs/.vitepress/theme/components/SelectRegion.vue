<script setup>
import { useRouter } from 'vitepress'
import { useRegion } from '../composables/useRegion.js'

const region = useRegion()

const router = useRouter()

const options = region.regions
</script>

<template>
  <form class="flex items-center sm:px-2 space-x-1">
    <label for="region" class="region">Región</label>
    <select
      id="region"
      class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
      @change="region.onRegionChange($event, router)"
    >
      <option
        v-for="option in options"
        :key="option.code"
        :value="option.code"
        :selected="option.code === region.currentRegion.value.code"
      >
        {{ option.name }}
      </option>
    </select>
  </form>
</template>

<style scoped>
@reference "../style.css";

.region {
  @apply hidden sm:block text-sm font-medium text-gray-900 dark:text-white;
}
</style>
