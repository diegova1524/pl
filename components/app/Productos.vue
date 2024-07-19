<template>
  <UTable :columns="columns" :rows="productosData || []">
    <template #imagen-data="{ row }">
      <div class="flex flex-wrap gap-2">
        <img :src="row.imagen" width="60" />
      </div>
    </template>

    <template #actions-data="{ row }">
      <div class="flex justify-center gap-3">
        <UButton color="primary">x</UButton>
        <UButton color="red">x</UButton>
      </div>
    </template>
  </UTable>

  <div v-for="p in productosData" :key="p.id">
    <p>{{ p.nombre }}</p>
  </div>
</template>

<script setup lang="ts">
//import { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/database.types";

import type { Producto } from "@/interfaces/global";

const client = useSupabaseClient<Database>();

const pagination = ref<any>({
  descending: false,
  page: 1,
  rowsNumber: 0,
  rowsPerPage: 8,
  skip: 0,
  sortBy: null,
  total: 0,
});

const searchText = ref("");

const { data: categoriasData } = useLazyAsyncData<any>(
  "categorias",
  async () => {
    const { data } = await client.from("categorias").select("id, nombre");
    return data;
  },
  {
    server: false,
  }
);

const { data: productosData, refresh } = useAsyncData<Producto[]>(
  "productos",
  async () => {
    const fields =
      "id, id_categoria, nombre, descripcion, imagen, precio_venta, unidades_disponibles, categoria:categorias(id, nombre):categoria";

    const rowsPerPage = pagination.value.rowsPerPage || 1000000;
    const { data, count } = searchText.value
      ? await client
          .from("productos")
          .select(fields, {
            count: "exact",
          })
          .textSearch("nombre", searchText.value)
          .order("id", {
            ascending: false,
          })
          .range(pagination.value.skip, pagination.value.skip + rowsPerPage - 1)
      : await client
          .from("productos")
          .select(fields, {
            count: "exact",
          })
          .order("id", {
            ascending: false,
          })
          .range(pagination.value.skip, pagination.value.skip + rowsPerPage - 1)
          .returns<Producto[]>();

    pagination.value.rowsNumber = count || 0;
    pagination.value.total = totalPage(count || 0, rowsPerPage);

    return data || [];
  }
);

const columns: any[] = [
  {
    key: "imagen",
    label: "Imagen",
  },
  {
    key: "nombre",
    label: "Nombre",
  },
  {
    key: "categoria.nombre",
    label: "Categoría",
  },

  {
    key: "unidades_disponibles",
    label: "Stock",
  },
  {
    key: "precio_venta",
    label: "Precio",
  },
  {
    key: "actions",
    label: "Acciones",
    class: "text-center",
  },
];
</script>
