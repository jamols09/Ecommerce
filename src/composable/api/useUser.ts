import { ref } from 'vue'
import { useApi } from '/@src/composable/useApi'
import useErrorNotification from './useErrorNotification'
import useNotyf from '../useNotyf'

const createResponse = ref()
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
      console.log(data)
      notif.success(`Account successfully added.`)
    } catch (err: any) {
      console.log(err)
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  return {
    createResponse,
    isLoading,
    create,
  } as const // as const is a typescript keyword to prevent from updating
}
