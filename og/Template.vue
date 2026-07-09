<script setup>
const props = defineProps({
  dolares: Array,
  col1: Array,
  col2: Array,
  fechaActualizacion: String,
})
</script>

<template>
  <div
    class="w-full h-full flex flex-col items-center justify-center px-2rem py-2rem bg-gray-200 text-1.4rem"
  >
    <div class="flex flex-col justify-center items-center mb-8">
      <div class="flex flex-row items-center mb-3">
        <span class="mr-2">
          Datos obtenidos de
        </span>
        <span class="px-1.5 py-1 bg-indigo-700 hover:bg-indigo-600 text-white rounded">
          DolarApi.com
        </span>
      </div>

      <span>{{ fechaActualizacion }}</span>
    </div>

    <div v-if="dolares" class="flex flex-row items-center">
      <div class="w-1/2 flex flex-col px-4">
        <div
          v-for="dolar in col1"
          :key="dolar.casa"
          class="flex flex-row items-center p-4 bg-white rounded border border border-gray-300 mb-4"
        >
          <span>{{ dolar.nombre.toUpperCase() }}</span>

          <span class="flex-1" />

          <div class="w-28 flex flex-col items-center">
            <span class="text-sm text-gray-500 uppercase">Compra</span>
            <span>${{ dolar.compra }}</span>
          </div>

          <div class="w-28 flex flex-col items-center">
            <span class="text-sm text-gray-500 uppercase">Venta</span>
            <span>${{ dolar.venta }}</span>
          </div>
        </div>
      </div>

      <div class="w-1/2 flex flex-col px-4">
        <div
          v-for="dolar in col2"
          :key="dolar.casa"
          class="flex flex-row items-center p-4 bg-white rounded border border border-gray-300 mb-4"
        >
          <span>{{ dolar.nombre.toUpperCase() }}</span>

          <span class="flex-1" />

          <div class="w-28 flex flex-col items-center">
            <span class="text-sm text-gray-500 uppercase">Compra</span>
            <span>${{ dolar.compra }}</span>
          </div>

          <div class="w-28 flex flex-col items-center">
            <span class="text-sm text-gray-500 uppercase">Venta</span>
            <span>${{ dolar.venta }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
