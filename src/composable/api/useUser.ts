import { ref } from 'vue'
import useErrorNotification from './useErrorNotification'
import { useApi } from '/@src/composable/useApi'

const createResponse = ref()

export function useUser() {
  const api = useApi()

  /**
   * @param data object
   * @returns HTTP status or error message
   */
  const create = async (user: any): Promise<any> => {
    try {
      const { data } = await api.post('/v1/users', user)
      createResponse.value = data
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
  }

  // notyf.success(`Employee <b><u> ${inputs.firstname} </u></b> added.`)
  // notyf.error(`Something wong here.`)

  return {
    createResponse,
    fetch,
    create,
  } as const // as const is a typescript keyword to prevent from updating
}
