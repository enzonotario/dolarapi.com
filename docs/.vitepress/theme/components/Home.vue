<script setup>
import { useRouter } from 'vitepress'
import { useRegion } from '../composables/useRegion.js'
import Ads from './Ads.vue'
import LatamMap from './LatamMap.vue'
import SponsorsAvatars from './sponsors/SponsorsAvatars.vue'

const region = useRegion()
const router = useRouter()

function handleRegionSelect(selectedRegion) {
  const path = `/docs${selectedRegion.prefix}/`.replace(/\/\//g, '/')
  router.go(path)
}
</script>

<template>
  <div>
    <div class="home-container">
      <div class="background-pattern" />

      <div class="content">
        <header class="hero">
          <div class="logo-wrapper">
            <img src="/assets/logo.png" alt="DolarApi" class="logo">
          </div>

          <div class="titles">
            <h1 class="title select-all">
              DolarApi<span class="title-accent">.com</span>
            </h1>
            <p class="subtitle">
              API desarrollada en
              <a
                href="https://es.js.org/?ref=dolarapi.com"
                target="_blank"
                rel="noopener noreferrer"
                class="esjs-link"
              >EsJS</a>
              de Cotizaciones de Dólar y Monedas de América Latina
            </p>
          </div>
        </header>

        <main class="main">
          <LatamMap :regions="region.regions" @select="handleRegionSelect" />
        </main>

        <section class="footer-section">
          <div class="sponsors-wrapper">
            <h2 class="section-title !border-t-0 !mt-0">
              <span class="i-mdi-heart text-rose-500" />
              Sponsors
            </h2>
            <SponsorsAvatars :size="52" />
          </div>

          <div class="banner-wrapper">
            <Ads />
          </div>
        </section>
      </div>
    </div>

    <hr>
    <section class="mt-24 -mb-24 flex justify-center">
      <a
        href="https://malvinas.argentinadatos.com/"
        target="_blank"
        rel="noreferrer"
        class="block"
      >
        <img
          src="https://malvinas.argentinadatos.com/strip.png"
          width="800"
          height="130"
          alt="Islas Malvinas Argentinas — Franja"
        >
      </a>
    </section>
  </div>
</template>

<style scoped>
@reference "../style.css";

.home-container {
  @apply relative min-h-[calc(100dvh-4rem)] flex flex-col overflow-hidden;
}

.background-pattern {
  @apply absolute inset-0 -z-10;
  background-image: radial-gradient(
      circle at 20% 30%,
      rgba(99, 102, 241, 0.08) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(139, 92, 246, 0.06) 0%,
      transparent 50%
    ),
    radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.02) 0%, transparent 100%);
}

.dark .background-pattern {
  background-image: radial-gradient(
      circle at 20% 30%,
      rgba(99, 102, 241, 0.12) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(139, 92, 246, 0.08) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 50% 50%,
      rgba(255, 255, 255, 0.01) 0%,
      transparent 100%
    );
}

.content {
  @apply flex-1 flex flex-col items-center justify-center px-3 md:px-6 py-12 gap-12;
}

.hero {
  @apply flex flex-col items-center gap-6 text-center;
}

.logo-wrapper {
  @apply relative;
}

.logo {
  @apply w-20 h-20 sm:w-24 sm:h-24;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
}

.titles {
  @apply flex flex-col gap-3;
}

.title {
  @apply text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight;
  @apply text-gray-900 dark:text-white;
}

.title-accent {
  @apply text-gray-400 dark:text-gray-500;
}

.subtitle {
  @apply text-base sm:text-lg md:text-xl max-w-md;
  @apply text-gray-600 dark:text-gray-400;
}

.main {
  @apply w-full max-w-4xl;
}

.footer {
  @apply flex flex-col items-center gap-6;
}

.actions {
  @apply flex gap-4;
}

.github-btn {
  @apply inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm
    bg-gray-900 text-white
    dark:bg-white dark:text-gray-900
    hover:bg-gray-700 dark:hover:bg-gray-200
    transition-all duration-200
    no-underline!;
}

.github-icon {
  @apply w-5 h-5;
}

.credits {
  @apply text-sm text-gray-500 dark:text-gray-500;
}

.esjs-link {
  @apply font-semibold text-gray-700 dark:text-gray-300
    hover:text-indigo-600 dark:hover:text-indigo-400
    transition-colors duration-200
    no-underline hover:underline;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.dark .footer-section {
  border-top-color: rgba(55, 65, 81, 0.6);
}

.sponsors-wrapper {
  text-align: center;
}

.sponsors-wrapper :deep(.flex) {
  justify-content: center;
}

.banner-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 1.5rem;
  color: #111827;
}

.dark .section-title {
  color: #f9fafb;
}
</style>
