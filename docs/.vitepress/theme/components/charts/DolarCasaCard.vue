<script setup>
import { useRoute } from 'vitepress'
import { onMounted, ref } from 'vue'
import { useApi } from '../../composables/useApi'

const route = useRoute()
const api = useApi()

const data = ref(null)
const loading = ref(true)

function getCasa() {
  const match = route.path.match(/get-dolar-([^/.]+)/)
  return match?.[1] ?? 'blue'
}

async function fetchDolar() {
  loading.value = true

  try {
    data.value = await api.get(`/dolares/${getCasa()}`)
  }
  finally {
    loading.value = false
  }
}

onMounted(fetchDolar)
</script>

<template>
  <div v-if="loading" class="text-sm text-gray-500 dark:text-gray-400">
    Cargando cotización...
  </div>

  <div
    v-else-if="data"
    class="flex flex-col items-center justify-center"
  >
    <div class="w-full max-w-md flex flex-col items-center justify-center p-4 rounded border border-gray-200 dark:border-gray-700">
      <span class="text-2xl font-bold text-gray-900 dark:text-white">
        Dólar {{ data.nombre }}
      </span>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
        <div class="flex flex-col items-center justify-center w-full h-full p-4">
          <span class="text-gray-600 dark:text-gray-400">Compra</span>
          <span class="text-lg font-bold text-gray-900 dark:text-white">
            ${{ data.compra }}
          </span>
        </div>
        <div class="flex flex-col items-center justify-center w-full h-full p-4">
          <span class="text-gray-600 dark:text-gray-400">Venta</span>
          <span class="text-lg font-bold text-gray-900 dark:text-white">
            ${{ data.venta }}
          </span>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center w-full h-full p-4">
        <span class="text-gray-600 dark:text-gray-400">Fecha de actualización</span>
        <span class="text-lg font-bold text-gray-900 dark:text-white">
          {{ new Date(data.fechaActualizacion).toLocaleString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23',
          }) }}
        </span>
      </div>
    </div>
  </div>
</template>
