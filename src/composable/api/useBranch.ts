import { ref } from 'vue'
import useNotyf from '../useNotyf'
import useErrorNotification from './useErrorNotification'
import { useApi } from '/@src/composable/useApi'

const statusResponse = ref()
const tableResponse = ref()
const createResponse = ref()
const dropdownResponse = ref()
const removeResponse = ref()
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
  const create = async (e: any): Promise<any> => {
    try {
      const { data } = await api.post('/v1/branch', e)
      createResponse.value = data
      notif.success(`Branch <b>${e.name}</b> successfully added.`)
    } catch (err: any) {
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
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @param object branch
   * @returns Paginated branch
   */
  const table = async (e?: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.get(`/v1/branch`, { params: e })
      tableResponse.value = data
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @param array id
   * @returns Paginated branch
   */
  const remove = async (e?: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.post(`/v1/branch/delete`, e)
      removeResponse.value = data
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @param array id
   * @returns Paginated branch
   */
  const status = async (e?: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.post(`/v1/branch/status`, e)
      statusResponse.value = data
      notif.success(`Account(s) successfully ${e?.status}d.`)
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  return {
    removeResponse,
    tableResponse,
    createResponse,
    dropdownResponse,
    isLoading,
    dropdown,
    create,
    table,
    remove,
    status,
  } as const // as const is a typescript keyword to prevent from updating
}
