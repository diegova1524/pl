<script setup lang="ts">
import type { Database } from '@/database.types'

import type { Cliente } from '@/interfaces/global'
import type { FormError, FormSubmitEvent } from '#ui/types'

const client = useSupabaseClient<Database>()
const route = useRoute()

const tipoDocumentoOptions = ['DNI', 'RUC']

const id = route.params.id

const itemData = ref<Cliente>({
  id: null,
  nombres: '',
  apellidos: '',
  tipo_documento: '',
  nro_documento: '',
  celular: '',
})

const { data: clientesData } = useLazyAsyncData<Cliente | null>(
 `cliente-${id}`,
 async () => {
   const fields
      = 'id, nombres, apellidos, tipo_documento, nro_documento, celular'

   const { data } = await client.from('clientes').select(fields, { count: 'exact' }).eq('id', id).single()

   return data
 },
 {
   server: false,
 },
)

watch(clientesData, (nv) => {
  itemData.value = nv || {} as any
})

function validate(state: any): FormError[] {
  const errors = []
  if (!state.nombres)
    errors.push({ path: 'nombres', message: 'El nombre es requerido' })

  return errors
}

async function updateClient() {
  const { error } = await client.from('clientes').update({
    nombres: itemData.value.nombres,
    apellidos: itemData.value.apellidos,
    tipo_documento: itemData.value.tipo_documento,
    nro_documento: itemData.value.nro_documento,
    celular: itemData.value.celular,
  }).eq('id', id)
  if (error) {
    console.error('Error updating client:', error)
  }
}
</script>

<template>
  <UCard>
    <template #header>
      Cliente
      <UButton
        target="_blank"
        icon="i-heroicons-arrow-right-start-on-rectangle"
        color="gray"
        variant="ghost"
        to="usuarios/clientes"
      />
    </template>

    <UForm
      :validate="validate"
      :state="itemData"
      class="space-y-4"
    >
      <div class="flex gap-10">
        <UFormGroup label="Nombres" name="nombres" class="w-1/2">
          <UInput
            v-model="itemData.nombres"
            :padded="false"
            placeholder="Nombre del cliente"
            variant="none"
            class="w-full"
            @blur="updateClient"
          />
        </UFormGroup>
        <UFormGroup label="Apellidos" name="apellidos" class="w-1/2">
          <UInput
            v-model="itemData.apellidos"
            :padded="false"
            placeholder="Apellido del cliente"
            variant="none"
            class="w-full"
            @blur="updateClient"
          />
        </UFormGroup>
      </div>

      <div class="flex gap-10">
        <div class="w-1/2 mt-6">
          <USelect
            v-model="itemData.tipo_documento"
            :padded="false"
            placeholder="Tipo de Documento"
            :options="tipoDocumentoOptions"
            variant="none"
            class="w-full"
            @blur="updateClient"
          />
        </div>

        <UFormGroup label="Nro de Documento" name="nro_documento" class="w-1/2">
          <UInput
            v-model="itemData.nro_documento"
            placeholder="Nro de Documento"
            :padded="false"
            variant="none"
            class="w-full"
            @blur="updateClient"
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
          @blur="updateClient"
        />
      </UFormGroup>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
    <template #footer />
  </UCard>
  <pre>{{ clientesData }}</pre>
</template>

<style scoped></style>
