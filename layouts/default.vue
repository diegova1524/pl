<template>
  <UHeader :links="links">
    <template #logo>
      <Logo class="w-auto h-6" />
    </template>

    <template #right>
      <UColorModeButton />

      <UButton
        to="https://github.com/nuxt/ui"
        target="_blank"
        icon="i-simple-icons-github"
        color="gray"
        variant="ghost"
      />
    </template>

    <template #panel> </template>
  </UHeader>

  <div class="container mx-auto px-8 sm:px-0">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const links = [
  {
    label: "Módulos",
    icon: "i-heroicons-book-open",
    to: "/",
  },
];
</script>

<style scoped></style>
