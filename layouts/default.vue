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
      <UButton
        @click="handleLogout"
        target="_blank"
        icon="i-heroicons-arrow-right-start-on-rectangle"
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
import type { Database } from "@/database.types";

const client = useSupabaseClient<Database>();
const router = useRouter();

const links = [
  {
    label: "Módulos",
    icon: "i-heroicons-book-open",
    to: "/",
  },
];

const handleLogout = async () => {
  const { error } = await client.auth.signOut();
  if (!error) {
    router.push("/login");
  } else {
    console.error("Error logging out:", error);
  }
};
</script>

<style scoped></style>
