<template>
  <UCard>
    <template #header>
      <Placeholder class="h-8" />
      Clientes {{ $route.params }}
    </template>

    <Placeholder class="h-32" />
    <UForm
      :validate="validate"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <div class="flex gap-10">
        <UFormGroup label="Nombres" name="nombres" class="w-1/2">
          <UInput
            :padded="false"
            placeholder="Nombre del cliente"
            variant="none"
            class="w-full"
            v-model="itemData.nombres"
          />
        </UFormGroup>
        <UFormGroup label="Apellidos" name="apellidos" class="w-1/2">
          <UInput
            :padded="false"
            placeholder="Apellido del cliente"
            variant="none"
            class="w-full"
            v-model="itemData.apellidos"
          />
        </UFormGroup>
      </div>

      <div class="flex gap-10">
        <div class="w-1/2 mt-6">
          <USelect
            :padded="false"
            placeholder="Tipo de Documento"
            :options="tipoDocumentoOptions"
            variant="none"
            class="w-full"
            v-model="itemData.tipo_documento"
          />
        </div>

        <UFormGroup label="Nro de Documento" name="nro_documento" class="w-1/2">
          <UInput
            placeholder="Nro de Documento"
            v-model="itemData.nro_documento"
            :padded="false"
            variant="none"
            class="w-full"
          />
        </UFormGroup>
      </div>
      <UFormGroup label="Celular" name="celular" class="w-1/2">
        <UInput
          v-model="itemData.celular"
          :padded="false"
          variant="none"
          class="w-full"
          placeholder="90.."
        />
      </UFormGroup>

      <UButton type="submit"> Submit </UButton>
    </UForm>
    <template #footer>
      <Placeholder class="h-8" />
    </template>
  </UCard>
  <pre>{{ clientesData }}</pre>
</template>

<script setup lang="ts">
import type { Database } from "@/database.types";

import type { Cliente } from "@/interfaces/global";

const client = useSupabaseClient<Database>();

const tipoDocumentoOptions = ["DNI", "RUC"];

const itemData = ref<Cliente>({
  nombres: "",
  apellidos: "",
  tipo_documento: "",
  nro_documento: "",
  celular: "",
});

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

const { data: clientesData, refresh } = useAsyncData<Cliente>(
  "cliente",
  async () => {
    const fields =
      "id, nombres, apellidos, tipo_documento, nro_documento, celular";

    const { data, count } = await client.from("").single();

    return data || {};
  }
);
import type { FormError, FormSubmitEvent } from "#ui/types";

const state = reactive({
  nombres: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.nombres) errors.push({ path: "nombres", message: "Required" });
  if (!state.apellidos) errors.push({ path: "apellidos", message: "Required" });
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data);
}
</script>

<style scoped></style>
