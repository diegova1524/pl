export default defineEventHandler(async (e) => {
  const { numero } = getQuery(e)

  const { reniecToken } = useRuntimeConfig(e)

  const url = `https://api.apis.net.pe/v2/sunat/ruc/?numero=${numero}`

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${reniecToken}`,
    },
  })

  return res
})
