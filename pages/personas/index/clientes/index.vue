<script setup lang="ts">
import type { Database } from '@/database.types'

import type { Cliente, Pagination } from '@/interfaces/global'

const client = useSupabaseClient<Database>()

const pagination = ref<Pagination>({
  descending: false,
  page: 1,
  rowsNumber: 0,
  rowsPerPage: 8,
  skip: 0,
  sortBy: null,
  total: 0,
})

const searchText = ref('')

const { data: clientesData } = useAsyncData<Cliente[]>(
  'clientes',
  async () => {
    const fields
      = 'id, nombres, apellidos, tipo_documento, nro_documento, celular'

    const rowsPerPage = pagination.value.rowsPerPage || 1000000
    const { data, count } = searchText.value
      ? await client
        .from('clientes')
        .select(fields, {
          count: 'exact',
        })
        .textSearch('nombres', searchText.value)
        .order('id', {
          ascending: false,
        })
        .range(pagination.value.skip, pagination.value.skip + rowsPerPage - 1)
      : await client
        .from('clientes')
        .select(fields, {
          count: 'exact',
        })
        .order('id', {
          ascending: false,
        })
        .range(
          pagination.value.skip,
          pagination.value.skip + rowsPerPage - 1,
        )

    pagination.value.rowsNumber = count || 0
    pagination.value.total = totalPage(count || 0, rowsPerPage)

    return data || []
  },
)

const modules = [{
  title: 'VueUse',
  description: 'Collection of essential Vue Composition Utilities for Vue 2 and 3.',
  to: 'https://github.com/vueuse/vueuse',
  icon: 'i-simple-icons-nuxtdotjs',
}, {
  title: 'ESLint',
  description: 'ESLint module for Nuxt.',
  to: 'https://github.com/nuxt-community/eslint-module',
  icon: 'i-simple-icons-eslint',
}, {
  title: 'Tailwind CSS',
  description: 'Add Tailwind CSS to your Nuxt application in seconds with PurgeCSS included for minimal CSS.',
  to: 'https://github.com/nuxt-modules/tailwindcss',
  icon: 'i-simple-icons-tailwindcss',
}]
</script>

<template>
  <UPageGrid class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mt-5">
    <UPageCard
      v-for="c, index in clientesData"
      :key="index"
      :title="`${c.nombres} ${c.apellidos}`"
      icon="i-heroicons-photo"
      v-bind="c"
      :to="`/personas/clientes/${c.id}`"
    >
      <template #description>
        <span class="line-clamp-2">{{ c.tipo_documento }}</span>
        <span class="line-clamp-2">{{ c.nro_documento }}</span>
      </template>
    </UPageCard>
  </UPageGrid>
</template>

<style scoped></style>
