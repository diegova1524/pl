<template>
    <div>
      <GraficosChart />
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import GraficosChart from '@/components/app/GraficosChart.vue';  
  
  export default defineComponent({
    name: 'GraficoCompras',
    components: {
      GraficosChart,
    },
  });
  </script>
  
  <style scoped>
  </style>
  