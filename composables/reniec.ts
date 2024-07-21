export function useReniec() {
  async function getInfo(doc: string, type = 'dni'): Promise<any> {
    const url = `/api/external/${type}/?numero=${doc}`
    const data = await $fetch(url)
    return data
  }

  return {
    getInfo,
  }
}
