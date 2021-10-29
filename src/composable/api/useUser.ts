import { ref } from 'vue'
import { useApi } from '/@src/composable/useApi'
import useErrorNotification from './useErrorNotification'

const createResponse = ref()

export function useUser() {
  const api = useApi()

  /**
   * @param object user
   * @returns HTTP status or error message
   */
  const create = async (user: any): Promise<any> => {
    try {
      const { data } = await api.post('/v1/users', user)
      createResponse.value = data
    } catch (err: any) {
      console.log(err)
      useErrorNotification.error(err.response.data)
    }
  }

  return {
    createResponse,
    fetch,
    create,
  } as const // as const is a typescript keyword to prevent from updating
}
