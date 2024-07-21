<script setup lang="ts">
import type { Database } from '@/database.types'

const client = useSupabaseClient<Database>()
const router = useRouter()
const route = useRoute()

const appConfig = useAppConfig()

const links = computed(() => [
// inicio
  {
    id: 'inicio',
    label: 'Inicio',
    icon: 'i-heroicons-home',
    to: '/',

  },

  {
    id: 'ventas',
    label: 'Ventas',
    to: '/ventas',
    icon: 'i-heroicons-shopping-cart',
    defaultOpen: route.path.startsWith('/ventas'),
    children: [
      {
        label: 'Ventas',
        to: '/ventas',
        exact: true,
      },
      {
        label: 'Cotizaciones',
        to: '/ventas',
        exact: true,
      },
      {
        label: 'Pedidos',
        to: '/ventas',
        exact: true,
      },
    ],

  },

  {
    id: 'compras',
    label: 'Compras',
    icon: 'i-heroicons-shopping-bag',
    to: '/compras',
    defaultOpen: route.path.startsWith('/compras'),

    children: [
      {
        label: 'Compras',
        to: '/compras',
        exact: true,
      },
      {
        label: 'Ordenes de Compra',
        to: '/compras/ordenes',
        exact: true,
      },
      {
        label: 'Recepciones',
        to: '/compras/recepciones',
        exact: true,
      },
      {
        label: 'Devoluciones',
        to: '/compras/devoluciones',
        exact: true,
      },

    ],

  },

  {
    id: 'inventario',
    label: 'Inventario',
    icon: 'i-heroicons-archive-box',
    to: '/inventario',
    defaultOpen: route.path.startsWith('/inventario'),

    children: [
      {
        label: 'Inventario',
        to: '/inventario',
        exact: true,
      },
      {
        label: 'Productos',
        to: '/inventario/productos',
        exact: true,
      },
      {
        label: 'Categorías',
        to: '/inventario/categorias',
        exact: true,
      },

    ],
  },

  {
    id: 'personas',
    label: 'Personas',
    icon: 'i-heroicons-user-group',
    to: '/personas',
    defaultOpen: route.path.startsWith('/personas'),
    children: [
      {
        label: 'Usuarios',
        to: '/personas',
        exact: true,
      },
      {
        label: 'Clientes',
        to: '/personas/clientes',
        exact: true,
      },
      {
        label: 'Proveedores',
        to: '/personas/proveedores',
        exact: true,
      },
      {
        label: 'Empleados',
        to: '/personas/empleados',
        exact: true,

      },
    ],
  },
])

const notifications = [[{
  label: 'New mail',
  icon: 'i-heroicons-paper-airplane',
  to: '/inbox',
}, {
  label: 'New user',
  icon: 'i-heroicons-user-plus',
  to: '/users',
}]]

async function handleLogout() {
  const { error } = await client.auth.signOut()
  if (!error) {
    router.push('/login')
  }
  else {
    console.error('Error logging out:', error)
  }
}
const footerLinks = [{
  label: 'Invite people',
  icon: 'i-heroicons-plus',
}, {
  label: 'Help & Support',
  icon: 'i-heroicons-question-mark-circle',
}]

const defaultColors = ref(['green', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet'].map(color => ({ label: color, chip: color, click: () => appConfig.ui.primary = color })))
const colors = computed(() => defaultColors.value.map(color => ({ ...color, active: appConfig.ui.primary === color.label })))
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="260"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardNavbar
        class="!border-transparent"
        :ui="{ left: 'flex-1' }"
      >
        <template #left>
          <!-- <TeamsDropdown /> -->
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <!--   <UDashboardSearchButton /> -->
        </template>

        <UDashboardSidebarLinks :links="links" />

        <UDivider />

        <UDashboardSidebarLinks
          :links="[{ label: 'Colors', draggable: true, children: colors }]"
          @update:links="colors => defaultColors = colors"
        />

        <div class="flex-1" />

        <UDashboardSidebarLinks :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <!-- <UserDropdown /> -->
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <UDashboardPanel grow>
      <UDashboardNavbar title="Home">
        <template #left>
          Logo
        </template>
        <template #right>
          <UColorModeButton />

          <UTooltip
            text="Notifications"
            :shortcuts="['N']"
          >
            <UButton
              color="gray"
              variant="ghost"
              square
            >
              <UChip
                color="red"
                inset
              >
                <UIcon
                  name="i-heroicons-bell"
                  class="w-5 h-5"
                />
              </UChip>
            </UButton>
          </UTooltip>
        </template>
      </UDashboardNavbar>

      <UDashboardPanelContent>
        <NuxtPage />
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardLayout>
</template>
