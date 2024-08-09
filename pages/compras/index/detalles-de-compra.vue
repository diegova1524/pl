<template>
  <div class="p-6 bg-green-200 min-h-screen">
    <h1 class="text-2xl font-bold mb-4 bg-green-500 text-white p-2 rounded">Detalles de Compras</h1>

    <NuxtCard class="p-4">
      <table class="min-w-full bg-green-200 border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">ID</th>
            <th class="py-2 px-4 border-b">Referencia</th>
            <th class="py-2 px-4 border-b">Total</th>
            <th class="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id" class="hover:bg-green-100">
            <td class="py-2 px-4 border-b">{{ order.id }}</td>
            <td class="py-2 px-4 border-b">{{ order.referencia }}</td>
            <td class="py-2 px-4 border-b">{{ currency(order.total) }}</td>
            <td class="py-2 px-4 border-b">
              <button @click="viewDetails(order)" class="bg-blue-500 text-white py-1 px-4 rounded">Ver Detalles</button>
            </td>
          </tr>
        </tbody>
      </table>
    </NuxtCard>

    <!-- Detalles de la Compra -->
    <div v-if="selectedOrder" class="mt-4 p-6">
      <h2 class="text-xl font-bold mb-4">Detalles de la Compra #{{ selectedOrder.id }}</h2>
      <NuxtCard class="p-4">
        <div class="grid grid-cols-1 gap-4">
          <div>
            <span class="font-medium">ID:</span> {{ selectedOrder.id }}
          </div>
          <div>
            <span class="font-medium">ID Compra:</span> {{ selectedOrder.id_compra }}
          </div>
          <div>
            <span class="font-medium">ID Proveedor:</span> {{ selectedOrder.id_proveedor }}
          </div>
          <div>
            <span class="font-medium">ID Empleado:</span> {{ selectedOrder.id_empleado }}
          </div>
          <div>
            <span class="font-medium">ID Producto:</span> {{ selectedOrder.id_producto }}
          </div>
          <div>
            <span class="font-medium">Cantidad:</span> {{ selectedOrder.cantidad }}
          </div>
          <div>
            <span class="font-medium">Precio:</span> {{ currency(selectedOrder.precio) }}
          </div>
          <div>
            <span class="font-medium">Total:</span> {{ currency(selectedOrder.total) }}
          </div>
          <div>
            <span class="font-medium">Referencia:</span> {{ selectedOrder.referencia }}
          </div>
        </div>
      </NuxtCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Database } from '@/database.types';
import type { DetalleCompra } from '~/interfaces/global';

const client = useSupabaseClient<Database>();

const orders = ref<DetalleCompra[]>([]);
const selectedOrder = ref<DetalleCompra | null>(null);

const viewDetails = (order: DetalleCompra) => {
  selectedOrder.value = order;
};

const currency = (value: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'PEN'
  }).format(value);
};

const fetchOrders = async () => {
  try {
    const { data, error } = await client
      .from('compras')
      .select('*');

    if (error) throw error;

    if (data) {
      orders.value = data.map((item: any) => ({
        id: item.id || 0,
        id_compra: item.id_compra || 0,
        id_proveedor: item.id_proveedor || 0,
        id_empleado: item.id_empleado || 0,
        id_producto: item.id_producto || 0,
        cantidad: item.cantidad || 0,
        precio: item.precio || 0,
        total: item.total || 0,
        referencia: item.referencia || ''
      })) as DetalleCompra[];
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

onMounted(async () => {
  await fetchOrders();
});
</script>


<style scoped>
.details-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.details-card .font-medium {
  font-weight: 500;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #e0f7ea;
}

th, td {
  text-align: left;
}

th {
  background-color: #f8f8f8;
}

tr:hover {
  background-color: #e6f7e6;
}

.bg-green-500 {
  background-color: #48bb78;
}

.bg-green-200 {
  background-color: #e1efe6;
}

.bg-green-100 {
  background-color: #e6f7e6;
}

.text-green-500 {
  color: #48bb78;
}

.text-green-200 {
  color: #c6f6d5;
}
</style>