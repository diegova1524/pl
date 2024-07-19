<template>
  <UButton
    icon="i-heroicons-pencil-square"
    size="md"
    color="violet"
    variant="solid"
    label="Nuevo"
    class="mt-5"
    :trailing="false"
    to="/usuarios/clientes/nuevoCliente"
  />
  Clientes
  <ULandingGrid class="mt-5">
    <ULandingCard
      v-for="c in clientesData"
      :key="c.id"
      class="col-span-6 row-span-2"
      :title="`${c.nombres} ${c.apellidos}`"
      :description="`Documento: ${c.tipo_documento} - ${c.nro_documento}`"
      icon="i-heroicons-photo"
      color="purple"
      orientation="horizontal"
    >
      <img
        src="https://picsum.photos/640/360?grayscale"
        class="w-full rounded-md"
      />
    </ULandingCard>
  </ULandingGrid>

  <pre>{{ clientesData }}</pre>
</template>

<script setup lang="ts">
import type { Database } from "@/database.types";

import type { Cliente } from "@/interfaces/global";

const client = useSupabaseClient<Database>();

const tipoDocumentoOptions = ["DNI", "RUC"];

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

const { data: clientesData, refresh } = useAsyncData<Cliente[]>(
  "clientes",
  async () => {
    const fields =
      "id, nombres, apellidos, tipo_documento, nro_documento, celular";

    const rowsPerPage = pagination.value.rowsPerPage || 1000000;
    const { data, count } = searchText.value
      ? await client
          .from("clientes")
          .select(fields, {
            count: "exact",
          })
          .textSearch("nombres", searchText.value)
          .order("id", {
            ascending: false,
          })
          .range(pagination.value.skip, pagination.value.skip + rowsPerPage - 1)
      : await client
          .from("clientes")
          .select(fields, {
            count: "exact",
          })
          .order("id", {
            ascending: false,
          })
          .range(
            pagination.value.skip,
            pagination.value.skip + rowsPerPage - 1
          );

    pagination.value.rowsNumber = count || 0;
    pagination.value.total = totalPage(count || 0, rowsPerPage);

    return data || [];
  }
);

function name() {
  //

  //id

  navigateTo(`/usuarios/clientes/id`);
}
</script>

<style scoped></style>
