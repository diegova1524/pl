interface Location {
  departamento?: string
  provincia?: string
  distrito?: string
}
interface Departments {
  id?: string
  name?: string

}
interface Province {
  id?: string
  name?: string
  department_id?: string
}
interface Districts {
  id?: string
  name?: string
  province_id?: string
  department_id?: string
}

export function useLocation() {
  const location = ref<Location> ({})
  $fetch('/api/provinces/?dep=')
  return { location }
}
