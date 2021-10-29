import { ref } from 'vue'
import useNotyf from '../useNotyf'
import useErrorNotification from './useErrorNotification'
import { useApi } from '/@src/composable/useApi'

const createResponse = ref([])
const notif = useNotyf()

export function useBranch() {
  const api = useApi()

  /**
   * @param object branch
   * @returns HTTP status or error message
   */
  const create = async (branch: any): Promise<any> => {
    try {
      const { data } = await api.post('/v1/branch', branch)
      createResponse.value = data
      notif.success(`Branch <b>${branch.name}</b> successfully added.`)
    } catch (err: any) {
      console.log(err)
      useErrorNotification.error(err.response.data)
    }
  }

  return {
    createResponse,
    create,
  } as const // as const is a typescript keyword to prevent from updating
}
