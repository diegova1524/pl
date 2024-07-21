<script setup lang="ts">
import type { Database } from '@/database.types'

const client = useSupabaseClient<Database>()
const route = useRoute()
const links = [
  [
    {
      label: 'Usuarios',
      icon: 'i-heroicons-user-circle',
      to: '/personas',
      exact: true,
    },
    {
      label: 'Clientes',
      icon: 'i-heroicons-user-group',
      to: '/personas/clientes',
      exact: true,
    },
    {
      label: 'Empleados',
      icon: 'i-heroicons-bell',
      to: '/personas/empleados',
      exact: true,
    },
    {
      label: 'Proveedores',
      icon: 'i-heroicons-bell',
      to: '/personas/proveedores',
      exact: true,
    },
  ],

]

function openCreateItem() {
  switch (route.path) {
    case '/personas/clientes':
      createNewClient()
      break

    default:
      break
  }
}

async function createNewClient() {
  const { data, error } = await client.from('clientes')
    .insert({
      nombres: 'Nuevo',
      apellidos: '',
      tipo_documento: 'DNI',
      nro_documento: '',
      celular: '',
    })
    .select('id').single()

  if (error) {
    console.error('Error al crear nuevo cliente: ', error)
    return
  }

  if (data && data.id) {
    navigateTo(`/personas/clientes/${data.id}`)
  }
}
</script>

<template>
  <UDashboardToolbar v-if="route.params.id === undefined" class="py-0 px-1.5 overflow-x-auto">
    <template #left>
      <UHorizontalNavigation :links="links" />
    </template>

    <template #right>
      <UButton
        icon="i-heroicons-plus"
        size="md"
        class="ml-1.5 rounded-full"
        @click="openCreateItem"
      />
    </template>
  </UDashboardToolbar>

  <NuxtPage />
</template>

<style scoped></style>
