<script setup>
import { computed } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
})

const parsedContent = computed(() => {
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  return props.content.replace(
    markdownLinkRegex,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary-500 hover:text-primary-600 underline">$1</a>',
  )
})
</script>

<template>
  <span v-html="parsedContent" />
</template>
