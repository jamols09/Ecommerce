import { ref } from 'vue'
import { useApi } from '/@src/composable/useApi'
import useErrorNotification from './useErrorNotification'
import useNotyf from '../useNotyf'

const createResponse = ref()
const isLoading = ref(false)

export function useItem() {
  const api = useApi()

  /**
   * @param object item
   * @returns HTTP status or error message
   */
  const create = async (e: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.post('/v1/item', e)
      createResponse.value = data
      useNotyf().success(`Product <b>${data.body}</b> added.`)
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  return {
    createResponse,
    isLoading,
    create,
  }
}
