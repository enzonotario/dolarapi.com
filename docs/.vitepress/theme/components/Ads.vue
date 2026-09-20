<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const BASE_URL = 'https://api.argentinadatos.com/static/assets/arq/'
const LINK_URL
  = 'https://www.arqfinance.com/referrals/arr?referralCode=enzonotario_sJx&pid=referral&c=arr&is_retargeting=true'

const banner = {
  id: 1,
  desktopUrl: `${BASE_URL}desktop.gif`,
  mobileUrl: `${BASE_URL}mobile.gif`,
  altText: 'ARQ — Pagá tus compras online en dólares',
  linkUrl: LINK_URL,
}

const isMobile = ref(false)
const imageError = ref(false)

const currentBanner = computed(() => (imageError.value ? null : banner))

const bannerImageUrl = computed(() => {
  if (!currentBanner.value)
    return ''
  return isMobile.value
    ? currentBanner.value.mobileUrl
    : currentBanner.value.desktopUrl
})

onMounted(() => {
  const defer = window.requestIdleCallback || (fn => setTimeout(fn, 1))

  defer(() => {
    const checkMobile = () => {
      isMobile.value = window.innerWidth < 768
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })

    onUnmounted(() => {
      window.removeEventListener('resize', checkMobile)
    })
  })
})

function handleImageError() {
  imageError.value = true
}
</script>

<template>
  <div v-if="currentBanner" class="relative">
    <a
      :href="currentBanner.linkUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="block w-full"
    >
      <img
        :src="bannerImageUrl"
        :alt="currentBanner.altText"
        class="w-full rounded-lg"
        loading="lazy"
        decoding="async"
        @error="handleImageError"
      >
    </a>
  </div>
</template>
