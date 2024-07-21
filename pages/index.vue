<script setup lang="ts">
// Modulos de la aplicación

const modules = [
  {
    title: 'Compras',
    description:
      'Este módulo permite gestionar las compras. Registrar proveedores, productos y realizar compras.',
    to: '/compras',
    icon: 'i-simple-icons-shopee',
  },
  {
    title: 'Inventario',
    description:
      'Gestiona el inventario de productos. Entradas, salidas y ajustes.',
    to: '/inventario',
    icon: 'i-simple-icons-tailwindcss',
  },
  {
    title: 'Ventas',
    description:
      'Gestiona las ventas de productos. Realiza cotizaciones, ventas y facturación.',
    to: '/ventas',
    icon: 'i-simple-icons-shopify',
  },
  {
    title: 'Gestión de Usuario',
    description:
      'Gestiona los usuarios del sistema. Permite registrar, editar y eliminar usuarios. También asignar roles y permisos.',
    to: '/personas',
    icon: 'i-heroicons-users',
  },
]
</script>

<template>
  <UPageGrid class="mt-5">
    <UPageCard
      v-for="(module, index) in modules"
      :key="index"
      :to="module.to"
      :icon="module.icon"
      :title="module.title"
    >
      <template #description>
        <span class="line-clamp-2">{{ module.description }}</span>
      </template>
    </UPageCard>
  </UPageGrid>
</template>
