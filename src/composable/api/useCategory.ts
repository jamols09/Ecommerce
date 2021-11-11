import { ref } from 'vue'
import { useApi } from '/@src/composable/useApi'
import useErrorNotification from './useErrorNotification'
import useNotyf from '../useNotyf'

const tableResponse = ref()
const dropdownResponse = ref()
const createResponse = ref()
const isLoading = ref(false)
const removeResponse = ref()

interface IRCategory {
  id: number
  name: string
}

export function useCategory() {
  const api = useApi()

  /**
   * @description Generate category
   * @param object name, parent_id
   * @returns HTTP status or error message
   */
  const create = async (category: any): Promise<any> => {
    try {
      const { data } = await api.post('/v1/category', category)
      createResponse.value = data
      useNotyf().success(`Category <b>${data.body}</b> added.`)
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
  }

  /**
   * @description Gets all of category for dropdown
   * @returns Category list
   */
  const dropdown = async (): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.get('/v1/category/dropdown')
      dropdownResponse.value = data.body.map((e: IRCategory) => {
        return { value: e.id, label: e.name }
      })
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @description Get list of paginated category
   * @param object
   * @returns Paginated category
   */
  const table = async (e?: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.get(`/v1/category`, { params: e })
      tableResponse.value = data
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @description Soft deletes selected category
   * @param array id
   * @returns name
   */
  const remove = async (e?: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.post(`/v1/category/delete`, e)
      removeResponse.value = data
      useNotyf().warning(`Category removed.`)
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  return {
    removeResponse,
    tableResponse,
    dropdownResponse,
    createResponse,
    isLoading,
    dropdown,
    create,
    table,
    remove,
  } as const // as const is a typescript keyword to prevent from updating
}
