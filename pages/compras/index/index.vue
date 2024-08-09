<template>
  <div>
    <AppCompras />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AppCompras from '@/components/app/AppCompras.vue';

export default defineComponent({
  name: 'Index',
  components: {
    AppCompras,
  },
});
</script>

<style scoped>
</style>