<template>
  <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
    <UHorizontalNavigation :links="links" />
  </UDashboardToolbar>

  <NuxtPage />
</template>

<script setup lang="ts">
const links = [
  [
    {
      label: "Compras",
      icon: "i-heroicons-user-circle",
      to: "/compras",
      exact: true,
    },
    {
      label: "Proveedores",
      icon: "i-heroicons-user-group",
      to: "/compras/proveedores",
      exact: true,
    },
    {
      label: "Productos",
      icon: "i-heroicons-bell",
      to: "/compras/productos",
      exact: true,
    },
  ],
  [
    {
      label: "Documentation",
      icon: "i-heroicons-book-open",
      to: "https://ui.nuxt.com/pro",
      target: "_blank",
    },
    {
      label: "Buy now",
      icon: "i-heroicons-ticket",
      to: "https://ui.nuxt.com/pro/pricing",
      target: "_blank",
    },
  ],
];
</script>

<style scoped></style>
