import { ref } from 'vue'
import useNotyf from '../useNotyf'
import useErrorNotification from './useErrorNotification'
import { useApi } from '/@src/composable/useApi'

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
      const { data } = await api.get(
        `/v1/branch?page=${e.page}&row=${e.row}&type=${e.type}&q=${e.query}&col=${e.column}&order=${e.order}`
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
      const { data } = await api.post(`/v1/category/delete`, e)
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
    dropdownResponse,
    isLoading,
    dropdown,
    create,
    table,
    remove,
  } as const // as const is a typescript keyword to prevent from updating
}
