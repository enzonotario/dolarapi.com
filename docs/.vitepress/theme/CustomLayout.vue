<script setup>
import DefaultTheme from 'vitepress/theme'
import Ads from './components/Ads.vue'
import DonateBanner from './components/DonateBanner.vue'
import GitHubStars from './components/GitHubStars.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <div class="fixed h-px w-full">
        <div class="section-flare">
          <div class="section-flare-item" />
          <div class="section-flare-item" />
          <div class="section-flare-item" />
          <div class="section-flare-item" />
          <div class="section-flare-item" />
          <div class="section-flare-item" />
          <div class="section-flare-item" />
          <div class="section-flare-item" />
        </div>
      </div>
    </template>

    <template #nav-bar-content-after>
      <GitHubStars class="hidden sm:block" />
    </template>

    <template #layout-bottom>
      <DonateBanner />
    </template>

    <template #doc-footer-before>
      <Ads />
    </template>
  </Layout>
</template>

<style scoped>
.section-flare {
  width: 100vw;
  height: 400px;
  position: absolute;
}
.section-flare-item:first-of-type:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  --stripes: repeating-linear-gradient(100deg, #fff 0%, #fff 0%, transparent 2%, transparent 12%, #fff 17%);
  --stripesDark: repeating-linear-gradient(100deg, #000 0%, #000 0%, transparent 10%, transparent 12%, #000 17%);
  --rainbow: repeating-linear-gradient(100deg, #60a5fa 10%, #e879f9 16%, #5eead4 22%, #60a5fa 30%);
  contain: strict;
  contain-intrinsic-size: 100vw 40vh;
  background-image: var(--stripes), var(--rainbow);
  background-size: 300%, 200%;
  background-position: 50% 50%, 50% 50%;
  filter: opacity(10%) saturate(200%);
  -webkit-mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
  mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
  pointer-events: none;
}
.dark .section-flare-item:first-of-type:before {
  background-image: var(--stripesDark), var(--rainbow);
  filter: opacity(20%) saturate(200%);
}
.section-flare-item:first-of-type:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: var(--stripes), var(--rainbow);
  background-size: 200%, 100%;
  background-attachment: fixed;
  mix-blend-mode: difference;
  pointer-events: none;
}
.dark .section-flare-item:first-of-type:after {
  background-image: var(--stripesDark), var(--rainbow);
}

.section-flare-item:first-of-type:after,
.section-flare-item:first-of-type:before {
  background-image: var(--stripes), var(--rainbow);
  filter: opacity(10%) saturate(200%);
}
</style>
