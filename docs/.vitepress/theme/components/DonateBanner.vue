<script setup>
import { onMounted, ref } from 'vue'

const isVisible = ref(false)
const showBanner = ref(false)

onMounted(() => {
  // Check localStorage to see if the banner was previously closed.
  const bannerClosed = localStorage.getItem('donateBannerClosed')
  if (bannerClosed !== 'true') {
    // Show banner after a reasonable delay (5 seconds).
    setTimeout(() => {
      isVisible.value = true
      // Add a small delay before starting the animation.
      setTimeout(() => {
        showBanner.value = true
      }, 100)
    }, 5000)
  }
})

function closeBanner() {
  // First hide with animation.
  showBanner.value = false
  // Then remove from DOM after animation completes.
  setTimeout(() => {
    isVisible.value = false
    // Store the banner state in localStorage.
    localStorage.setItem('donateBannerClosed', 'true')
  }, 500) // Match the duration in the CSS transition.
}
</script>

<template>
  <div
    v-if="isVisible" class="fixed bottom-5 right-5 bg-white dark:bg-[#1e1e1e] rounded-lg shadow-lg p-4 max-w-[360px] z-[100] border border-gray-200 dark:border-gray-800 transition-all duration-500 ease-in-out" :class="[
      showBanner ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0',
    ]"
  >
    <button
      class="absolute top-2 right-2 bg-transparent border-none cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Cerrar banner"
      @click="closeBanner"
    >
      <span class="i-mdi-close text-lg" />
    </button>
    <div class="flex flex-col pr-4 gap-1 text-sm leading-relaxed ">
      <p class="m-0">
        DolarApi.com es una API <strong>pública y gratuita</strong>, ayudanos a mantenerla en funcionamiento.
      </p>

      <a
        href="https://cafecito.app/enzonotario"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-1 self-start bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 text-white font-medium py-1.5 px-3 rounded text-sm transition-colors"
      >
        <span class="i-mdi-coffee" />
        Invitanos un Cafecito
      </a>

      <span class="text-gray-600 dark:text-gray-300 text-xs">
        O apoyanos en GitHub Sponsors
      </span>

      <iframe src="https://github.com/sponsors/enzonotario/button" title="Sponsor enzonotario" height="32" width="114" style="border: 0; border-radius: 6px;" />
    </div>
  </div>
</template>

<style>
@media (max-width: 640px) {
  .fixed.bottom-5.right-5 {
    bottom: 12px;
    right: 12px;
    left: 12px;
    max-width: none;
  }
}
</style>
