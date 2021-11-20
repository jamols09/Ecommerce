import { ref } from 'vue'
import { useApi } from '/@src/composable/useApi'
import useErrorNotification from './useErrorNotification'
import useNotyf from '../useNotyf'

const createResponse = ref()
const tableResponse = ref()
const statusResponse = ref()
const isLoading = ref(false)

export function useItem() {
  const api = useApi()

  /**
   * @description Generate item for list selected of branch
   * @param object
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

  /**
   * @description Get list of paginated items for selected branch
   * @param object
   * @returns Paginated item
   */
  const table = async (e?: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.get(`/v1/item`, { params: e })
      tableResponse.value = data
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @description Apply status change to column: is_discountable
   * @param object
   */
  const status = async (e?: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.post(`/v1/item/status`, e)
      tableResponse.value = data
      useNotyf().success(`Product successfully made ${e.state}.`)
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  return {
    tableResponse,
    createResponse,
    statusResponse,
    isLoading,
    create,
    table,
    status,
  }
}
