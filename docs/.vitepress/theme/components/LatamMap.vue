<script setup>
import { computed } from 'vue'

const props = defineProps({
  regions: {
    type: Array,
    required: true,
  },
})

const supportedCodes = computed(() => props.regions.map(r => r.code))

function isSupported(code) {
  return supportedCodes.value.includes(code)
}

function getRegion(code) {
  return props.regions.find(r => r.code === code)
}

function getHref(code) {
  if (!isSupported(code))
    return undefined
  const region = getRegion(code)
  return `/docs/${region.prefix.replace(/^\//, '')}/`
}

function getSvg(region) {
  let svg
  switch (region.code) {
    case 'ar':
      svg = `<svg class="size-10 sm:size-12" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" fill="#f0f0f0" r="256"/><g fill="#338af3"><path d="m256 0c-101.494 0-189.19 59.065-230.598 144.696h461.195c-41.407-85.631-129.104-144.696-230.597-144.696z"/><path d="m256 512c101.493 0 189.19-59.065 230.598-144.696h-461.196c41.408 85.631 129.104 144.696 230.598 144.696z"/></g><path d="m332.515 256-31.265 14.707 16.649 30.279-33.95-6.495-4.302 34.296-23.647-25.224-23.648 25.224-4.301-34.296-33.95 6.494 16.648-30.279-31.264-14.706 31.265-14.707-16.649-30.278 33.949 6.494 4.303-34.296 23.647 25.224 23.648-25.224 4.301 34.296 33.951-6.494-16.649 30.279z" fill="#ffda44"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>`
      break
    case 'cl':
      svg = `<svg class="size-10 sm:size-12" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" fill="#f0f0f0" r="256"/><path d="m512 256c0 141.384-114.616 256-256 256s-256-114.616-256-256 256 0 256 0 193.761 0 256 0z" fill="#d80027"/><path d="m0 256c0-141.384 114.616-256 256-256v256s-166.957 0-256 0z" fill="#0052b4"/><path d="m152.389 89.043 16.577 51.018h53.643l-43.398 31.53 16.576 51.018-43.398-31.531-43.398 31.531 16.576-51.018-43.398-31.53h53.643z" fill="#f0f0f0"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>`
      break
    case 've':
      svg = `<svg class="size-10 sm:size-12" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m486.598 367.304c16.275-33.656 25.402-71.413 25.402-111.304s-9.127-77.648-25.402-111.304l-230.598-22.261-230.598 22.261c-16.275 33.656-25.402 71.413-25.402 111.304s9.127 77.648 25.402 111.304l230.598 22.261z" fill="#0052b4"/><path d="m256 512c101.493 0 189.19-59.065 230.598-144.696h-461.196c41.408 85.631 129.104 144.696 230.598 144.696z" fill="#d80027"/><g fill="#f0f0f0"><path d="m443.367 306.252-13.521 10.566 5.868 16.121-14.227-9.593-13.522 10.564 4.728-16.495-14.225-9.596 17.149-.598 4.732-16.495 5.87 16.124z"/><path d="m408.741 246.282-9.091 14.553 11.031 13.142-16.651-4.146-9.094 14.549-1.199-17.117-16.649-4.153 15.912-6.429-1.196-17.118 11.029 13.147z"/><path d="m355.694 201.769-3.566 16.785 14.86 8.58-17.065 1.799-3.568 16.78-6.98-15.674-17.067 1.791 12.754-11.482-6.979-15.674 14.86 8.578z"/><path d="m290.622 178.087 2.391 16.993 16.897 2.978-15.422 7.526 2.389 16.992-11.92-12.344-15.426 7.522 8.058-15.153-11.921-12.342 16.9 2.979z"/><path d="m221.377 178.087 8.057 15.151 16.896-2.981-11.917 12.347 8.053 15.152-15.422-7.524-11.922 12.341 2.391-16.989-15.423-7.522 16.899-2.982z"/><path d="m156.305 201.769 12.754 11.483 14.857-8.578-6.977 15.68 12.751 11.48-17.065-1.795-6.982 15.674-3.563-16.783-17.066-1.792 14.86-8.582z"/><path d="m103.258 246.282 15.913 6.428 11.026-13.144-1.193 17.121 15.908 6.429-16.649 4.149-1.199 17.115-9.09-14.549-16.651 4.149 11.03-13.145z"/><path d="m68.634 306.252 17.152.598 5.866-16.122 4.735 16.496 17.147.599-14.226 9.596 4.728 16.494-13.52-10.564-14.227 9.593 5.869-16.124z"/></g><path d="m486.598 144.696c-41.408-85.631-129.105-144.696-230.598-144.696-101.494 0-189.19 59.065-230.598 144.696z" fill="#ffda44"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>`
      break
    case 'uy':
      svg = `<svg class="size-10 sm:size-12" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" fill="#f0f0f0" r="256"/><path id="SVGCleanerId_0" d="m256 189.217h247.181c-6.419-23.814-16.175-46.255-28.755-66.783h-218.426z" fill="#338af3"/><g fill="#338af3"><path d="m96.643 456.348h318.713c23.363-18.608 43.399-41.21 59.069-66.783h-436.851c15.671 25.572 35.707 48.175 59.069 66.783z"/><path d="m256 0v55.652h159.357c-43.73-34.828-99.108-55.652-159.357-55.652z"/></g><g><path id="SVGCleanerId_0_1_" d="m256 189.217h247.181c-6.419-23.814-16.175-46.255-28.755-66.783h-218.426z" fill="#338af3"/></g><path d="m0 256c0 23.107 3.08 45.489 8.819 66.783h494.363c5.738-21.294 8.818-43.676 8.818-66.783z" fill="#338af3"/><path d="m222.609 149.821-31.266 14.707 16.649 30.28-33.95-6.494-4.302 34.295-23.646-25.224-23.648 25.224-4.301-34.295-33.95 6.492 16.648-30.279-31.264-14.706 31.265-14.705-16.649-30.28 33.949 6.494 4.303-34.295 23.647 25.224 23.647-25.224 4.301 34.295 33.951-6.494-16.649 30.281z" fill="#ffda44"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>`
      break
    case 'mx':
      svg = `<svg class="size-10 sm:size-12" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" fill="#f0f0f0" r="256"/><path d="m512 256c0-101.494-59.065-189.19-144.696-230.598v461.195c85.631-41.407 144.696-129.103 144.696-230.597z" fill="#d80027"/><g fill="#6da544"><path d="m0 256c0 101.494 59.065 189.19 144.696 230.598v-461.196c-85.631 41.408-144.696 129.104-144.696 230.598z"/><path d="m189.217 256c0 36.883 29.9 66.783 66.783 66.783s66.783-29.9 66.783-66.783v-22.261h-133.566z"/></g><path d="m345.043 211.478h-66.783c0-12.294-9.967-22.261-22.261-22.261s-22.261 9.967-22.261 22.261h-66.783c0 12.295 10.709 22.261 23.002 22.261h-.741c0 12.295 9.966 22.261 22.261 22.261 0 12.295 9.966 22.261 22.261 22.261h44.522c12.295 0 22.261-9.966 22.261-22.261 12.295 0 22.261-9.966 22.261-22.261h-.742c12.295 0 23.003-9.966 23.003-22.261z" fill="#ff9811"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>`
      break
    case 'bo':
      svg = `<svg class="w-12 h-12" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0-31.314-5.632-61.311-15.923-89.043l-240.077-11.131-240.077 11.13c-10.291 27.733-15.923 57.73-15.923 89.044s5.632 61.311 15.923 89.043l240.077 11.131 240.077-11.13c10.291-27.733 15.923-57.73 15.923-89.044z" fill="#ffda44"/><path d="m256 512c110.071 0 203.906-69.472 240.077-166.957h-480.154c36.171 97.485 130.006 166.957 240.077 166.957z" fill="#6da544"/><path d="m15.923 166.957h480.155c-36.172-97.485-130.007-166.957-240.078-166.957s-203.906 69.472-240.077 166.957z" fill="#d80027"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>`
      break
    case 'br':
      svg = `<svg class="w-12 h-12" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" fill="#6da544" r="256"/><path d="m256 100.174 211.478 155.826-211.478 155.826-211.478-155.826z" fill="#ffda44"/><circle cx="256" cy="256" fill="#f0f0f0" r="89.043"/><g fill="#0052b4"><path d="m211.478 250.435c-15.484 0-30.427 2.355-44.493 6.725.623 48.64 40.227 87.884 89.015 87.884 30.168 0 56.812-15.017 72.919-37.968-27.557-34.497-69.958-56.641-117.441-56.641z"/><path d="m343.393 273.06c1.072-5.524 1.651-11.223 1.651-17.06 0-49.178-39.866-89.043-89.043-89.043-36.694 0-68.194 22.201-81.826 53.899 12.05-2.497 24.526-3.812 37.305-3.812 51.717-.001 98.503 21.497 131.913 56.016z"/></g><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>`
      break
    case 'co':
      svg = `<svg class="size-10 sm:size-12" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" fill="#f0f0f0" r="256"/><path d="m0 0h512v256h-512z" fill="#ffda44"/><path d="m0 256h512v128h-512z" fill="#0052b4"/><path d="m0 384h512v128h-512z" fill="#d80027"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>`
      break
  }
  return svg
}
</script>

<template>
  <div class="map-container">
    <svg
      viewBox="120 420 200 300"
      class="latam-map"
      xmlns="http://www.w3.org/2000/svg"
      style="transform: rotate(6deg); transform-origin: center;"
    >
      <defs>
        <linearGradient id="hoverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366f1" />
          <stop offset="100%" stop-color="#8b5cf6" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="0.5" stdDeviation="1" flood-opacity="0.2" />
        </filter>
      </defs>

      <a :href="getHref('mx')" class="country-link country-mx" :class="{ supported: isSupported('mx') }">
        <path
          class="country"
          :class="{ active: isSupported('mx') }"
          d="M133.847,433.982l4.175,13.146l-1.945,1.089l0.216,2.61l3.674,2.827v5.229l4.538,4.356l-1.945-12.847l-2.593-8.497l0.648-5.877l2.161,0.217l0.865,1.962l-0.865,5.005l11.237,21.99v7.841l9.077,10.666l9.94,4.573l4.106-2.396l5.835,4.789l3.458-3.483l-1.513-3.925l4.97-1.521l1.513,0.873l1.513-1.521h2.377l4.322-7.624l-2.161-1.962l-8.428,1.962l-1.945,5.662L182.106,480l-5.834-2.396l-2.593-8.271l1.962-10.434l-4.011-2.498l-1.91-10.02l-1.599-0.683l-2.922,2.965l-3.354-1.789l-1.313-6.682l-13.286-1.393l-6.863-5.16L133.847,433.982z"
        >
          <title>México</title>
        </path>
      </a>

      <path class="country" d="M183.456,491.11l5.126,3.752l5.169-6.423l-0.881-1.331l-1.764-0.062v-3.761l-1.322-0.804l-4.002,1.192l1.53,3.526L183.456,491.11z">
        <title>Guatemala</title>
      </path>

      <path class="country" d="M191.823,483.228l-0.043,3.154h0.726l2.472-4.615h-1.677L191.823,483.228z">
        <title>Belice</title>
      </path>

      <path class="country" d="M194.408,488.742l7.987-0.303l2.369,2.817l-1.478-0.338l-2.844,0.121l-3.717,3.492l-1.59,3.536l-1.046-0.555l-0.009-3.872l-2.299-1.539L194.408,488.742z">
        <title>Honduras</title>
      </path>

      <path class="country" d="M189.308,495.217l4.062,2.022l-0.061-3.207l-2.083-1.271L189.308,495.217z">
        <title>El Salvador</title>
      </path>

      <path class="country" d="M203.216,491.62l1.893,0.381l0.061,3.881l-2.204,6.293l-5.938-0.588l-1.323-3.034l1.764-3.682l3.345-3.112L203.216,491.62z">
        <title>Nicaragua</title>
      </path>

      <path class="country" d="M202.905,502.745l1.202,2.352l0.977,1.297l-1.314,3.898l-2.507-1.764l-4.097-3.752v-2.48L202.905,502.745z">
        <title>Costa Rica</title>
      </path>

      <path class="country" d="M205.68,506.748l-1.262,3.941l4.167,1.079l2.584,0.512l0.441-3.052l2.775-1.4l2.463,1.271l0.968,1.547l1.175-0.138l0.925-2.81l-3.078-1.271l-2.334-1.271l-2.333,1.59l-2.775,1.4l-2.835-1.141L205.68,506.748z">
        <title>Panamá</title>
      </path>

      <path class="country" d="M205.904,469.846v1.1l4.599,0.086l2.169-1.263l0.337,0.926l4.512,1.098l4.011,3.622l-0.917,1.262l0.165,1.436l3.345,0.839l3.345-1.514l1.504-1.513l-2.169-1.098l-11.194-6.569l-3.924-0.424L205.904,469.846z">
        <title>Cuba</title>
      </path>

      <a :href="getHref('co')" class="country-link country-co" :class="{ supported: isSupported('co') }">
        <path
          class="country"
          :class="{ active: isSupported('co') }"
          d="M234.326,498.251l-1.781-0.182l-11.773,9.707l-1.245,3.414l-1.608,0.182l0.717,7.546l-4.105,10.07l4.46,3.776l5.714,0.363l3.924,5.757l5.705,0.183l-0.182,4.312h2.135l2.316-7.909l-2.144-2.694l0.536-5.031l4.46-0.363l-0.536-11.688l-9.993-3.232l-2.316-6.293L234.326,498.251z"
        >
          <title>Colombia</title>
        </path>
      </a>

      <a :href="getHref('ve')" class="country-link country-ve" :class="{ supported: isSupported('ve') }">
        <path
          class="country"
          :class="{ active: isSupported('ve') }"
          d="M231.5,503.558l0.38,2.239l2.809,0.892l0.64-4.124l2.965-3.068l2.965,3.475l6.82,1.859l5.774-1.211l3.933,4.849l2.965,1.858l-3.25,4.953l1.089,3.752l-1.858,2.299l-1.928,1.616l-4.175-2.102l-0.959,0.969v2.99l3.052,1.452l-2.248,2.43l-2.248,2.43l-2.965-0.242l-2.982-3.275l-0.631-12.326l-10.183-3.476l-1.85-5.42L231.5,503.558z"
        >
          <title>Venezuela</title>
        </path>
      </a>

      <path class="country" d="M261.399,510.654l6.241,5.652l-2.481,2.87l-0.199,1.703l3.259,3.362l-0.078,3.232l-5.67,2.16l-3.397-4.59l0.726-5.515l-1.452-4.105L261.399,510.654z">
        <title>Guyana</title>
      </path>

      <path class="country" d="M268.384,516.715l1.763,1.616l2.731-1.694l2.49,0.078l-0.32,0.968l-1.046,2.179l-0.164,5.421l-4.97,2.022l0.242-3.476l-3.207-2.991l0.164-1.538L268.384,516.715z">
        <title>Surinam</title>
      </path>

      <path class="country" d="M213.986,529.43l-4.088,2.541l-0.294,3.771l-0.821,1.234l2.576,2.473l-1.115,1.219l0.259,3.113l4.607,1.098l6.976-8.256l-0.017-2.878l-3.345-0.216L213.986,529.43z">
        <title>Ecuador</title>
      </path>

      <path class="country" d="M209.518,541.246l-1.677,1.695l0.113,2.703l14.643,26.694l15.205,9.802l2.351-3.941l0.562-8.669l-1.228-5.402l-4.141-6.984l-2.463,0.786l-1.115,1.236l-4.918-5.636l1.228-6.647l5.705-3.717l-0.449-3.492l-5.809-0.226l-3.017-5.064l-1.677-0.562l0.113,3.044l-7.486,8.895l-5.593-1.349L209.518,541.246z">
        <title>Perú</title>
      </path>

      <a :href="getHref('bo')" class="country-link country-bo" :class="{ supported: isSupported('bo') }">
        <path
          class="country"
          :class="{ active: isSupported('bo') }"
          d="M238.631,561.361l7.114-3.104l2.351,0.226l1.565,6.534l10.839,3.604l1.79,5.523l4.469,0.562l1.902,4.729l-1.34,4.278l-7.27,0.562l-2.68,6.872l-5.705-0.112l-1.79-0.337l-3.293,3.197l-1.625-0.156l-5.593-12.957l1.547-2.316l0.545-9.163l-1.383-5.455L238.631,561.361z"
        >
          <title>Bolivia</title>
        </path>
      </a>

      <path class="country" d="M267.199,584.458l1.902,2.074l-0.225,4.392l5.48-0.338l4.141,5.299l-0.337,4.729l-2.681,4.054L270,604.893l-0.225-2.256l1.564-3.718l-5.368-3.38h-4.469l-3.354-3.604l2.438-6.968L267.199,584.458z">
        <title>Paraguay</title>
      </path>

      <a :href="getHref('br')" class="country-link country-br" :class="{ supported: isSupported('br') }">
        <path
          class="country"
          :class="{ active: isSupported('br') }"
          d="M286.631,618.464l5.402-10.391l0.198-8.73l10.079-6.501h5.645l4.435-7.512l0.804-14.418l-1.815-3.855l10.684-9.751l0.406-10.761l-14.514-7.105l-17.53-5.48l-8.264-0.812l2.221-4.669l-0.604-7.104l-1.808-0.596l-2.671,5.308l-1.4,1.754l-3.595-1.59l-12.093,4.261l-4.028-5.073l0.648-5.299l-3.804,3.872l-4.201-2.265l-0.424,0.597l0.009,1.841l3.622,1.945l-5.437,5.73l-3.432-0.034l-3.475-3.535l-3.933,0.121l-0.484,4.2l2.256,2.739l-2.663,8.532l-3.112,0.241l-4.953,3.13l-1.21,6.146l4.296,4.599l0.787-0.89l3.017-0.812l2.576,4.34l7.374-3.164l2.861,0.165l1.971,6.976l10.52,3.337l1.815,5.564l4.478,0.537l2.135,5.314l-1.443,4.729l1.884,2.474l-0.276,3.683l5.048-0.477l4.625,5.844l-0.363,4.105l2.74,2.316l-6.57,9.95L286.631,618.464z"
        >
          <title>Brasil</title>
        </path>
      </a>

      <a :href="getHref('uy')" class="country-link country-uy" :class="{ supported: isSupported('uy') }">
        <path
          class="country"
          :class="{ active: isSupported('uy') }"
          d="M274.633,612.481l-1.773,1.894l0.735,10.183l5.566,1.615l7.08-7.097L274.633,612.481z"
        >
          <title>Uruguay</title>
        </path>
      </a>

      <a :href="getHref('ar')" class="country-link country-ar" :class="{ supported: isSupported('ar') }">
        <g class="country" :class="{ active: isSupported('ar') }">
          <path d="M279.05,600.613l1.677,1.571l-6.371,9.467l-2.239,2.479l0.777,10.813l4.918,5.974l-4.132,7.209l-3.129,1.35h-3.579l1.003,5.627l-5.593,1.92l1.34,4.729l-3.354,10.701l4.141,3.38l-2.239,5.515l-3.804,5.975l2.014,4.165l-4.918,0.786l-4.028-4.951l-0.674-15.432l-6.258-26.209l1.893-9.163l-4.028-11.713l2.68-15.204l2.463-2.931l-0.605-2.222l3.164-2.888l7.054,0.483l3.942,4.21l4.555,0.078l4.668,2.853l-1.375,3.217l0.329,3.25l6.612-0.312L279.05,600.613z">
            <title>Argentina</title>
          </path>
          <path d="M264.745,687.564l0.225,4.951l3.803-0.337l3.242-2.144l-5.48-1.124L264.745,687.564z">
            <title>Argentina</title>
          </path>
          <path
            class="country"
            :class="{ active: isSupported('ar') }"
            d="M281.194,678.393l-2.273-0.25l-2.265,1.521l1.642,1.781L281.194,678.393z"
          >
            <title>Argentina</title>
          </path>
          <path
            class="country"
            :class="{ active: isSupported('ar') }"
            d="M283.459,677.252l-0.752,2.411l-2.144,1.901l0.13,0.631l3.655-1.4l1.513-1.901L283.459,677.252z"
          >
            <title>Argentina</title>
          </path>
        </g>
      </a>

      <a :href="getHref('cl')" class="country-link country-cl" :class="{ supported: isSupported('cl') }">
        <g class="country" :class="{ active: isSupported('cl') }">
          <path d="M261.391,683.51l-3.691,8.109l6.371,0.674l0.112-5.403L261.391,683.51z">
            <title>Chile</title>
          </path>
          <path d="M260.137,682.239l-2.775,3.068l-0.337,3.604l-5.368-3.043l-5.705-8.221l-1.677-2.932l2.351-3.043l-0.225-3.83l-2.68-1.124l-2.126-1.572l0.449-2.144l2.792-0.787l0.562-12.387l-4.356-2.48l-2.844-64.477l0.735-1.278l5.567,12.836l1.781,0.035l0.579,2.049l-2.369,2.868l-2.723,15.448l3.873,11.895l-1.79,9.007l6.31,26.485l0.666,15.49l4.521,5.229L260.137,682.239z">
            <title>Chile</title>
          </path>
          <path d="M241.717,649.833l-1.115,1.686l0.562,2.932l1.115,0.112l0.562-3.718L241.717,649.833z">
            <title>Chile</title>
          </path>
        </g>
      </a>
    </svg>

    <div class="legend">
      <a
        v-for="region in regions"
        :key="region.code"
        :href="`/docs/${region.prefix.replace(/^\//, '')}/`"
        class="legend-item"
        :class="`legend-${region.code}`"
      >
        <span class="legend-flag" v-html="getSvg(region)" />
        <span class="legend-name">{{ region.name }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
@reference "../style.css";

.map-container {
  @apply relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12;
}

.latam-map {
  @apply w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] h-auto;
}

.country {
  @apply fill-gray-200 dark:fill-gray-700 stroke-gray-300 dark:stroke-gray-600 transition-all duration-300;
  stroke-width: 0.3;
}

.country.active {
  @apply fill-gray-800 dark:fill-gray-200 stroke-gray-700 dark:stroke-gray-300;
}

.country-link {
  @apply cursor-default;
}

.country-link.supported {
  @apply cursor-pointer;
}

.country-link.supported:hover .country.active {
  fill: url(#hoverGradient);
  filter: url(#shadow);
  @apply stroke-indigo-600 dark:stroke-indigo-400;
  stroke-width: 0.5;
}

.legend {
  @apply flex flex-row flex-wrap lg:flex-col gap-2 lg:gap-2.5 justify-center;
}

.legend-item {
  @apply flex items-center gap-2.5 px-4 py-2.5 rounded-xl
    bg-gray-100/80 dark:bg-gray-800/80
    border border-transparent
    hover:border-indigo-500/50 dark:hover:border-indigo-400/50
    hover:bg-white dark:hover:bg-gray-900
    text-gray-700 dark:text-gray-300
    hover:text-gray-900 dark:hover:text-white
    transition-all duration-200 no-underline text-sm font-medium
    shadow-sm hover:shadow-md;
}

.legend-flag {
  @apply flex-shrink-0 transition-transform duration-200;
  display: inline-block;
}

.legend-flag :deep(svg) {
  @apply w-5 h-5 sm:w-6 sm:h-6;
}

.legend-item:hover .legend-flag {
  @apply scale-110;
}

.map-container:has(.legend-ar:hover) .country-ar .country.active {
  fill: url(#hoverGradient);
  filter: url(#shadow);
  @apply stroke-indigo-600 dark:stroke-indigo-400;
  stroke-width: 0.5;
}

.map-container:has(.legend-cl:hover) .country-cl .country.active {
  fill: url(#hoverGradient);
  filter: url(#shadow);
  @apply stroke-indigo-600 dark:stroke-indigo-400;
  stroke-width: 0.5;
}

.map-container:has(.legend-ve:hover) .country-ve .country.active {
  fill: url(#hoverGradient);
  filter: url(#shadow);
  @apply stroke-indigo-600 dark:stroke-indigo-400;
  stroke-width: 0.5;
}

.map-container:has(.legend-uy:hover) .country-uy .country.active {
  fill: url(#hoverGradient);
  filter: url(#shadow);
  @apply stroke-indigo-600 dark:stroke-indigo-400;
  stroke-width: 0.5;
}

.map-container:has(.legend-mx:hover) .country-mx .country.active {
  fill: url(#hoverGradient);
  filter: url(#shadow);
  @apply stroke-indigo-600 dark:stroke-indigo-400;
  stroke-width: 0.5;
}

.map-container:has(.legend-bo:hover) .country-bo .country.active {
  fill: url(#hoverGradient);
  filter: url(#shadow);
  @apply stroke-indigo-600 dark:stroke-indigo-400;
  stroke-width: 0.5;
}

.map-container:has(.legend-br:hover) .country-br .country.active {
  fill: url(#hoverGradient);
  filter: url(#shadow);
  @apply stroke-indigo-600 dark:stroke-indigo-400;
  stroke-width: 0.5;
}

.map-container:has(.legend-co:hover) .country-co .country.active {
  fill: url(#hoverGradient);
  filter: url(#shadow);
  @apply stroke-indigo-600 dark:stroke-indigo-400;
  stroke-width: 0.5;
}
</style>
