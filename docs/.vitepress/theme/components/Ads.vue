<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const BASE_URL = 'https://api.argentinadatos.com/static/assets/arq/'
const LINK_URL =
  'https://www.arqfinance.com/?utm_source=dolarapi_docs&utm_medium=banner&utm_campaign=dolarapi_docs_ad'

const banners = [
  {
    id: 10,
    desktopUrl: `${BASE_URL}Desktop_banner_10.png`,
    mobileUrl: `${BASE_URL}Mobile_banner_10.png`,
    altText: 'Banner 10',
    linkUrl: LINK_URL,
  },
  {
    id: 20,
    desktopUrl: `${BASE_URL}Desktop_banner_20.png`,
    mobileUrl: `${BASE_URL}Mobile_banner_20.png`,
    altText: 'Banner 20',
    linkUrl: LINK_URL,
  },
  {
    id: 30,
    desktopUrl: `${BASE_URL}Desktop_banner_30.png`,
    mobileUrl: `${BASE_URL}Mobile_banner_30.png`,
    altText: 'Banner 30',
    linkUrl: LINK_URL,
  },
  {
    id: 40,
    desktopUrl: `${BASE_URL}Desktop_banner_40.png`,
    mobileUrl: `${BASE_URL}Mobile_banner_40.png`,
    altText: 'Banner 40',
    linkUrl: LINK_URL,
  },
]

const playlist = [
  { bannerId: 10, duration: 5000 },
  { bannerId: 20, duration: 5000 },
  { bannerId: 30, duration: 5000 },
  { bannerId: 40, duration: 3000 },
]

const isMobile = ref(false)
const imageError = ref(false)
const currentPlaylistIndex = ref(0)

const currentBanner = computed(() => {
  if (imageError.value) return null
  const entry = playlist[currentPlaylistIndex.value]
  return banners.find((b) => b.id === entry.bannerId) || null
})

const bannerImageUrl = computed(() => {
  if (!currentBanner.value) return ''
  return isMobile.value
    ? currentBanner.value.mobileUrl
    : currentBanner.value.desktopUrl
})

onMounted(() => {
  const defer = window.requestIdleCallback || ((fn) => setTimeout(fn, 1))

  defer(() => {
    const checkMobile = () => {
      isMobile.value = window.innerWidth < 768
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })

    let timeoutId
    const scheduleNext = () => {
      const entry = playlist[currentPlaylistIndex.value]
      timeoutId = setTimeout(() => {
        currentPlaylistIndex.value =
          (currentPlaylistIndex.value + 1) % playlist.length
        scheduleNext()
      }, entry.duration)
    }
    scheduleNext()

    onUnmounted(() => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timeoutId)
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
      />
    </a>
  </div>
</template>
