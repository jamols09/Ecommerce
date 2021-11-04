import { ref } from 'vue'
import { useApi } from '/@src/composable/useApi'
import useErrorNotification from './useErrorNotification'
import useNotyf from '../useNotyf'

const removeResponse = ref()
const createResponse = ref()
const tableResponse = ref()
const notif = useNotyf()
const isLoading = ref(false)

export function useUser() {
  const api = useApi()

  /**
   * @param object user
   * @returns HTTP status or error message
   */
  const create = async (user: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.post('/v1/users', user)
      createResponse.value = data
      notif.success(`Account successfully added.`)
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  const table = async (e?: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.get(
        `/v1/users?page=${e.page}&row=${e.row}&type=${e.type}&q=${e.query}&col=${e.column}&order=${e.order}&u=a`
      )
      tableResponse.value = data
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @param array id
   * @returns Paginated category
   */
  const remove = async (e?: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.post(`/v1/users/delete`, e)
      removeResponse.value = data
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  return {
    removeResponse,
    tableResponse,
    createResponse,
    isLoading,
    table,
    create,
    remove,
  } as const // as const is a typescript keyword to prevent from updating
}
