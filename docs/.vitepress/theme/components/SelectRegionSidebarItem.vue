<script setup>
import { useRouter } from 'vitepress'
import { useRegion } from '../composables/useRegion.js'

const region = useRegion()

const router = useRouter()

const options = region.regions
</script>

<template>
  <form style="width: calc(var(--vp-sidebar-width) - 64px);" class="pb-3 mb-3 lg:mb-0 border-b dark:border-gray-600">
    <label for="region-sidebar" class="block my-1 text-sm font-medium text-gray-900 dark:text-white">Región</label>
    <select
      id="region-sidebar"
      class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
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
