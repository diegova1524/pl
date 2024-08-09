<template>
    <div class="flex flex-col h-screen">
      <header class="bg-green-500 text-primary-foreground py-4 px-6">
        <h1 class="text-2xl font-bold">Compras</h1>
      </header>
      <main class="flex-1 overflow-auto bg-green-50">
        <div class="h-full">
          <!-- Tabs -->
          <div role="tablist" aria-orientation="horizontal" class="flex justify-center items-center gap-4 mt-4">
            <!-- Tab buttons -->
            <button type="button" role="tab" :class="{ 'active': activeTab === 'list' }" @click="changeTab('list')">Listado de compras</button>
            <button type="button" role="tab" :class="{ 'active': activeTab === 'details' }" @click="changeTab('details')">Detalles de orden</button>
          </div>
  
          <!-- Tab content: Listado de compras -->
          <div v-show="activeTab === 'list'" class="mt-4 p-6">
            <div class="flex flex-col mb-4">
              <!-- Search bar -->
              <input type="text" v-model="searchQuery" placeholder="Buscar por referencia" class="mb-4 p-2 border rounded-md">
              <div class="flex justify-between items-center">
                <div class="flex gap-2">
                  <!-- Estado filter buttons -->
                  <button @click="filterByStatus('')" :class="{ 'active-filter': activeFilter === '' }" class="filter-button">Listado completo</button>
                  <button @click="filterByStatus('Pendiente')" :class="{ 'active-filter': activeFilter === 'Pendiente' }" class="filter-button">Pendiente</button>
                  <button @click="filterByStatus('Aprobado')" :class="{ 'active-filter': activeFilter === 'Aprobado' }" class="filter-button">Aprobado</button>
                  <button @click="filterByStatus('Cancelado')" :class="{ 'active-filter': activeFilter === 'Cancelado' }" class="filter-button">Cancelado</button>
                </div>
                <!-- Nueva orden de compra button -->
                <button @click="showCreateForm" class="new-order-button">Nueva orden de compra</button>
              </div>
            </div>
            <!-- Orders list -->
            <div class="overflow-auto">
              <table class="w-full border-collapse">
                <thead>
                  <tr class="border-b">
                    <th class="table-header">ID</th>
                    <th class="table-header">Proveedor</th>
                    <th class="table-header">Empleado</th>
                    <th class="table-header">Referencia</th>
                    <th class="table-header">Fecha de Compra</th>
                    <th class="table-header">Total</th>
                    <th class="table-header">Estado</th>
                    <th class="table-header"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(order, index) in filteredOrders" :key="index" class="border-b hover:bg-gray-100 cursor-pointer" @click="selectOrder(order)">
                    <td class="text-center">{{ order.id }}</td>
                    <td class="text-center">{{ order.id_proveedor }}</td>
                    <td class="text-center">{{ order.id_empleado }}</td>
                    <td class="text-center">{{ order.referencia }}</td>
                    <td class="text-center">{{ order.fecha_compra }}</td>
                    <td class="text-center">{{ order.total }}</td>
                    <td class="text-center">
                      <span :class="{
                        'status-badge': true,
                        'bg-yellow-500 text-yellow-900': order.estado === 'Pendiente',
                        'bg-green-500 text-green-900': order.estado === 'Aprobado',
                        'bg-red-500 text-red-900': order.estado === 'Cancelado'
                      }">{{ order.estado }}</span>
                    </td>
                    <td class="text-center">
                      <button @click.stop="showEditForm(order)" class="edit-button">Editar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  
          <!-- Modal para Crear/Editar Orden -->
          <transition name="modal">
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="showForm">
              <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-medium">{{ editMode ? 'Editar Orden' : 'Crear Orden' }}</h3>
                  <button @click="closeForm" class="text-gray-500 hover:text-gray-800">&times;</button>
                </div>
                <form @submit.prevent="editMode ? updateOrder() : createOrder()" class="grid grid-cols-1 gap-4">
                  <div>
                    <label for="id" class="block text-sm font-medium text-gray-700">ID</label>
                    <input type="text" id="id" v-model="form.id" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" disabled>
                  </div>
                  <div>
                    <label for="id_proveedor" class="block text-sm font-medium text-gray-700">ID Proveedor</label>
                    <input type="text" id="id_proveedor" v-model="form.id_proveedor" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                  </div>
                  <div>
                    <label for="id_empleado" class="block text-sm font-medium text-gray-700">ID Empleado</label>
                    <input type="text" id="id_empleado" v-model="form.id_empleado" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                  </div>
                  <div>
                    <label for="referencia" class="block text-sm font-medium text-gray-700">Referencia</label>
                    <input type="text" id="referencia" v-model="form.referencia" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                  </div>
                  <div>
                    <label for="fecha_compra" class="block text-sm font-medium text-gray-700">Fecha de Compra</label>
                    <input type="date" id="fecha_compra" v-model="form.fecha_compra" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                  </div>
                  <div>
                    <label for="total" class="block text-sm font-medium text-gray-700">Total</label>
                    <input type="number" id="total" v-model="form.total" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                  </div>
                  <div>
                    <label for="estado" class="block text-sm font-medium text-gray-700">Estado</label>
                    <select id="estado" v-model="form.estado" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      <option value="Pendiente">Pendiente</option>
                      <option value="Aprobado">Aprobado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </div>
                  <div class="flex justify-end">
                    <button type="button" @click="closeForm" class="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Cancelar</button>
                    <button type="submit" class="ml-2 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">{{ editMode ? 'Actualizar' : 'Crear' }}</button>
                  </div>
                </form>
              </div>
            </div>
          </transition>
  
          <!-- Tab content: Detalles de orden -->
          <div v-show="activeTab === 'details'" class="mt-4 p-6">
            <div v-if="selectedOrder">
              <h2 class="text-lg font-medium mb-4">Detalles de Orden</h2>
              <p><strong>ID:</strong> {{ selectedOrder.id }}</p>
              <p><strong>ID Proveedor:</strong> {{ selectedOrder.id_proveedor }}</p>
              <p><strong>ID Empleado:</strong> {{ selectedOrder.id_empleado }}</p>
              <p><strong>Referencia:</strong> {{ selectedOrder.referencia }}</p>
              <p><strong>Fecha de Compra:</strong> {{ selectedOrder.fecha_compra }}</p>
              <p><strong>Total:</strong> {{ selectedOrder.total }}</p>
              <p><strong>Estado:</strong> {{ selectedOrder.estado }}</p>
            </div>
            <div v-else>
              <p>Selecciona una orden de la lista para ver los detalles.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, computed, onMounted } from 'vue';
  import type { Database } from '@/database.types';
  import type { Compra } from '~/interfaces/global';

  
  const client = useSupabaseClient<Database>();
  
  const orders = ref<Compra[]>([]);
  const activeTab = ref('list');
  const showForm = ref(false);
  const editMode = ref(false);
  const selectedOrder = ref<Compra | null>(null);
  const activeFilter = ref('');
  const searchQuery = ref('');
  
  const form = reactive<Compra>({
    id: 0,
    id_proveedor: 0,
    id_empleado: 0,
    referencia: '',
    fecha_compra: '',
    total: 0,
    estado: ''
  });
  
  const editForm = reactive<Compra>({
    id: 0,
    id_proveedor: 0,
    id_empleado: 0,
    referencia: '',
    fecha_compra: '',
    total: 0,
    estado: ''
  });
  
  const filteredOrders = computed(() => {
    return orders.value.filter(order => {
      return (
        (activeFilter.value === '' || order.estado === activeFilter.value) &&
        (searchQuery.value === '' || order.referencia.toLowerCase().includes(searchQuery.value.toLowerCase()))
      );
    });
  });
  
  onMounted(fetchOrders);
  
  async function fetchOrders() {
    try {
      const { data, error } = await client.from('compras').select('*');
      if (error) throw error;
      if (data) {
        orders.value = data as Compra[];
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }
  
  async function createOrder() {
    try {
      console.log('Creando orden con datos:', form);
      const { data, error } = await client.from('compras').insert([{
        id_proveedor: form.id_proveedor,
        id_empleado: form.id_empleado,
        referencia: form.referencia,
        fecha_compra: form.fecha_compra,
        total: form.total,
        estado: form.estado
      }]);
      if (error) throw error;
      if (data) {
        console.log('Orden creada:', data);
        orders.value.push(data[0] as Compra);
        closeForm();
      }
    } catch (error) {
      console.error('Error creando la orden:', error);
      alert('Error creando la orden. Por favor, revisa la consola para detalles.');
    }
  }
  
  async function updateOrder() {
    try {
      console.log('Actualizando orden con datos:', editForm);
      const { data, error } = await client.from('compras').update({
        id_proveedor: editForm.id_proveedor,
        id_empleado: editForm.id_empleado,
        referencia: editForm.referencia,
        fecha_compra: editForm.fecha_compra,
        total: editForm.total,
        estado: editForm.estado
      }).eq('id', editForm.id);
  
      if (error) throw error;
      if (data) {
        console.log('Orden actualizada:', data);
        const index = orders.value.findIndex(order => order.id === editForm.id);
        if (index !== -1) {
          orders.value[index] = data[0] as Compra;
        }
        closeForm();
      }
    } catch (error) {
      console.error('Error actualizando la orden:', error);
      alert('Error actualizando la orden. Por favor, revisa la consola para detalles.');
    }
  }
  
  function changeTab(tab: string) {
    activeTab.value = tab;
  }
  
  function filterByStatus(status: string) {
    activeFilter.value = status;
  }
  
  function showCreateForm() {
    resetForm();
    editMode.value = false;
    showForm.value = true;
  }
  
  function showEditForm(order: Compra) {
    Object.assign(editForm, order);
    editMode.value = true;
    showForm.value = true;
  }
  
  function closeForm() {
    showForm.value = false;
    resetForm();
  }
  
  function resetForm() {
    form.id_proveedor = 0;
    form.id_empleado = 0;
    form.referencia = '';
    form.fecha_compra = '';
    form.total = 0;
    form.estado = '';
    
    editForm.id_proveedor = 0;
    editForm.id_empleado = 0;
    editForm.referencia = '';
    editForm.fecha_compra = '';
    editForm.total = 0;
    editForm.estado = '';
  }
  
  function selectOrder(order: Compra) {
    selectedOrder.value = order;
    changeTab('details');
  }
  </script>
  
  
  <style>
  .active-filter {
    background-color: #48bb78;
    color: white;
  }
  .filter-button {
    padding: 8px 16px;
    border: 1px solid #48bb78;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .filter-button:hover {
    background-color: #48bb78;
    color: white;
  }
  .new-order-button {
    padding: 8px 16px;
    background-color: #48bb78;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .new-order-button:hover {
    background-color: #38a169;
  }
  .table-header {
    padding: 12px;
    border-bottom: 2px solid #48bb78;
    text-align: left;
  }
  .status-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
  }
  .edit-button {
    padding: 4px 8px;
    background-color: #48bb78;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .edit-button:hover {
    background-color: #38a169;
  }
  </style>
  