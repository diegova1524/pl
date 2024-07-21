import districts from '~/data/districts.json'
import departments from '~/data/departments.json'
import provinces from '~/data/provinces.json'

export default defineEventHandler((e) => {
  const { dis } = getQuery(e)

  if (!dis) {
    return null
  }

  const district = districts.find(d => d.id === dis)

  return {
    ...district,
    province: provinces.find(p => p.id === district?.province_id),
    department: departments.find(d => d.id === district?.department_id),
  }
})
