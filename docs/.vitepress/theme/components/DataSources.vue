<script setup>
defineProps({
  sources: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div v-if="sources && sources.length">
    <h5 class="text-sm font-semibold mb-2">Fuentes de datos</h5>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div v-for="source in sources" :key="source" class="flex items-center gap-2">
        <span class="text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
        </span>
        <MarkdownLink :content="source" />
      </div>
    </div>
  </div>
</template>
