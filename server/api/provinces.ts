import provinces from '@/data/provinces.json'

export default defineEventHandler((e) => {
  const { dep } = getQuery(e)

  if (dep) {
    return provinces.filter(p => p.department_id === dep)
  }

  return provinces
})
