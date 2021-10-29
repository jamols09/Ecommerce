import { ref } from 'vue'
import { useApi } from '/@src/composable/useApi'
import useErrorNotification from './useErrorNotification'
import useNotyf from '../useNotyf'

const fetchResponse = ref()
const createResponse = ref()
const notif = useNotyf()

export function useCategory() {
  const api = useApi()

  /**
   * @param object category
   * @returns HTTP status or error message
   */
  const create = async (category: any) => {
    try {
      const { data } = await api.post('/v1/category', category)
      createResponse.value = data
      notif.success(`Category <b>${data.body.name}</b> added.`)
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
  }

  const fetch = async () => {
    try {
      const { data } = await api.get('/v1/category')
      fetchResponse.value = data
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
  }

  return {
    fetchResponse,
    createResponse,
    fetch,
    create,
  } as const // as const is a typescript keyword to prevent from updating
}
