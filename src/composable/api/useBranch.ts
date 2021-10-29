import { ref } from 'vue'
import useNotyf from '../useNotyf'
import useErrorNotification from './useErrorNotification'
import { useApi } from '/@src/composable/useApi'

const createResponse = ref()
const dropdownResponse = ref()
const isLoading = ref(false)
const notif = useNotyf()

interface IRBranch {
  id: number
  name: string
}

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

  /**
   * @returns Branch or error message
   */
  const dropdown = async (): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.get(`/v1/branch/dropdown`)
      dropdownResponse.value = data.body.map((e: IRBranch) => {
        return { value: e.id, label: e.name }
      })
    } catch (err: any) {
      console.log(err)
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  return {
    createResponse,
    dropdownResponse,
    isLoading,
    dropdown,
    create,
  } as const // as const is a typescript keyword to prevent from updating
}
