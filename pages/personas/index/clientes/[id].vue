<script setup lang="ts">
import type { Database } from '@/database.types'

import type { Cliente } from '@/interfaces/global'
import type { FormError, FormSubmitEvent } from '#ui/types'

const client = useSupabaseClient<Database>()
const route = useRoute()
const router = useRouter()

const reniec = useReniec()

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

async function deleteClient() {
  const { error } = await client.from('clientes').delete().eq('id', id)

  if (error) {
    console.error('Error al eliminar cliente', error)
  }
  else {
    navigateTo('/personas/clientes')
  }
}

// RENIEC
async function getInfo() {
  const d = await reniec.getInfo(itemData.value.nro_documento || '', itemData.value.tipo_documento?.toLowerCase())
  if (d) {
    itemData.value.nombres = d.nombres
    itemData.value.apellidos = `${d.apellidoPaterno} ${d.apellidoMaterno} `
  }

  updateClient()
}

async function back() {
  if (itemData.value.nombres === 'Nuevo') {
    await deleteClient()
  }
  router.back()
}
</script>

<template>
  <UCard class="mt-4">
    <template #header>
      <div class="flex justify-between items-center w-full">
        <div class="flex gap-5">
          <UButton
            :padded="false"
            color="gray"
            variant="link"
            icon="i-heroicons-chevron-left"
            @click="back()"
          />
          <h1>
            Informacion
          </h1>
        </div>

        <UButton
          target="_blank"
          icon="i-heroicons-trash"
          color="gray"
          variant="ghost"
          @click="deleteClient"
        />
      </div>
    </template>

    <UForm
      :validate="validate"
      :state="itemData"
      class="space-y-4"
    >
      <div class="flex gap-10">
        <div class="w-1/2 mt-3">
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
            placeholder="Buscar en RENIEC"
            :padded="false"
            variant="none"
            class="w-full"
            @blur="() => {
              getInfo()
            }"
          />
        </UFormGroup>
      </div>
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
    </UForm>
    <template #footer>
      <h1>Direcciones</h1>
      <UDivider class="my-5 " />

      <UForm
        :validate="validate"
        :state="itemData"
        class="space-y-4"
      >
        <div class="flex gap-10">
          <div class="w-1/2 mt-3">
            <USelect
              v-model="itemData.tipo_documento"
              :padded="false"
              placeholder="Departamento"
              :options="tipoDocumentoOptions"
              variant="none"
              class="w-full"
              @blur="updateClient"
            />
          </div>
          <div class="w-1/2 mt-3">
            <USelect
              v-model="itemData.tipo_documento"
              :padded="false"
              placeholder="Provincia"
              :options="tipoDocumentoOptions"
              variant="none"
              class="w-full"
              @blur="updateClient"
            />
          </div>
        </div>
        <div class="flex gap-10">
          <div class="w-1/2 mt-3">
            <USelect
              v-model="itemData.tipo_documento"
              :padded="false"
              placeholder="Distrito"
              :options="tipoDocumentoOptions"
              variant="none"
              class="w-full"
              @blur="updateClient"
            />
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
        </div>
      </UForm>
    </template>
  </ucard>
</template>

<style scoped></style>
