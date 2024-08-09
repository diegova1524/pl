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
      label: "Detalles de Compra",
      icon: "i-heroicons-clipboard-check",
      to: "/compras/detalles-de-compra",
      exact: true,
    },
    {
      label: "Graficos de Compras",
      icon: "i-heroicons-clipboard-check",
      to: "/compras/grafico-compras",
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
