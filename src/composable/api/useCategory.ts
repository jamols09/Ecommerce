import { ref } from 'vue'
import { useApi } from '/@src/composable/useApi'

const fetchResponse = ref([])
const createResponse = ref([])

export function useCategory() {
  const api = useApi()

  /**
   * @param data object
   * @returns HTTP status or error message
   */
  const create = async (category: any): Promise<any> => {
    try {
      const { data } = await api.post('/v1/category', category)
      createResponse.value = data
    } catch (err: any) {
      createResponse.value = err
    }
  }

  const fetch = async (): Promise<any> => {
    try {
      const { data } = await api.get('/v1/category')
      fetchResponse.value = data
    } catch (err: any) {
      fetchResponse.value = err
    }
  }

  // notyf.success(`Employee <b><u> ${inputs.firstname} </u></b> added.`)
  // notyf.error(`Something wong here.`)

  return {
    fetchResponse,
    createResponse,
    fetch,
    create,
  } as const // as const is a typescript keyword to prevent from updating
}
