<template>
  <div ref="chart" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

type EChartsUpdateAxisPointerEvent = {
  type: string;
  componentType: string;
  seriesType?: string;
  seriesIndex?: number;
  seriesName?: string;
  name?: string;
  dataIndex?: number;
  dataIndexInside?: number;
  data?: any;
  axesInfo?: Array<{
    axisDim: string;
    axisIndex: number;
    axisType: string;
    axisId: string;
    value: string;
  }>;
};

const chart = ref<HTMLElement | null>(null);

const staticStatusData = [
  { status: 'Pendiente', count: 10 },
  { status: 'Aprobado', count: 20 },
  { status: 'Cancelado', count: 5 },
];

onMounted(() => {
  if (chart.value !== null) {
    const chartInstance = echarts.init(chart.value as HTMLElement);

    const option = {
      title: {
        text: 'Estado de las Órdenes de Compra'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Pendiente', 'Aprobado', 'Cancelado']
      },
      grid: [
        { top: '55%', left: '3%', right: '4%', bottom: '3%', containLabel: true },
        { top: '3%', left: 'center', width: '50%', height: '45%' }
      ],
      xAxis: [
        {
          type: 'category',
          gridIndex: 0,
          data: ['Órdenes de Compra']
        }
      ],
      yAxis: [
        {
          type: 'value',
          gridIndex: 0
        }
      ],
      series: [
        {
          name: 'Pendiente',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          data: [staticStatusData.find(item => item.status === 'Pendiente')?.count || 0]
        },
        {
          name: 'Aprobado',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          data: [staticStatusData.find(item => item.status === 'Aprobado')?.count || 0]
        },
        {
          name: 'Cancelado',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          data: [staticStatusData.find(item => item.status === 'Cancelado')?.count || 0]
        },
        {
          type: 'pie',
          id: 'pie',
          radius: '30%',
          center: ['50%', '25%'],
          emphasis: {
            focus: 'self'
          },
          label: {
            formatter: '{b}: {@Pendiente} ({d}%)'
          },
          encode: {
            itemName: 'Estado',
            value: 'Pendiente',
            tooltip: 'Pendiente'
          },
          data: staticStatusData.map(item => ({
            name: item.status,
            value: item.count
          }))
        }
      ]
    };

    chartInstance.setOption(option);

    chartInstance.on('updateAxisPointer', function (event: any) {
      const xAxisInfo = event.axesInfo?.[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        chartInstance.setOption({
          series: {
            id: 'pie',
            label: {
              formatter: '{b}: {@[' + dimension + ']} ({d}%)'
            },
            encode: {
              value: dimension,
              tooltip: dimension
            }
          }
        });
      }
    });
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
  border: 2px solid rgb(126, 194, 126);
  padding: 10px;
  box-sizing: border-box;
}
</style>
