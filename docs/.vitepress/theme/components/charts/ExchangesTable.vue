<script setup>
import { onMounted, ref } from 'vue'
import { useApi } from '../../composables/useApi'

const api = useApi()
const exchanges = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    exchanges.value = await api.get('/exchanges')
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <p v-if="loading" class="text-sm text-gray-500 dark:text-gray-400">
      Cargando exchanges...
    </p>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="py-2 pr-4 text-left font-semibold text-gray-900 dark:text-white">
              Exchange
            </th>
            <th class="py-2 pr-4 text-left font-semibold text-gray-900 dark:text-white">
              ID
            </th>
            <th class="py-2 text-left font-semibold text-gray-900 dark:text-white">
              Logo
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="exchange in exchanges"
            :key="exchange.id"
            class="border-b border-gray-100 dark:border-gray-800"
          >
            <td class="py-2 pr-4 text-gray-900 dark:text-white">
              {{ exchange.nombre }}
            </td>
            <td class="py-2 pr-4 text-gray-600 dark:text-gray-400">
              {{ exchange.id }}
            </td>
            <td class="py-2">
              <img
                v-if="exchange.logo"
                :src="exchange.logo"
                :alt="exchange.nombre"
                class="h-8 w-8 rounded object-contain"
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
