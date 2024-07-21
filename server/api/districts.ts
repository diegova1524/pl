import districts from '~/data/districts.json'

export default defineEventHandler((e) => {
  const { prov } = getQuery(e)

  if (prov) {
    return districts.filter(d => d.province_id === prov)
  }
  return districts
})
