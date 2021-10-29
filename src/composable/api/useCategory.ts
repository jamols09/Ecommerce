import { ref } from 'vue'
import { useApi } from '/@src/composable/useApi'
import useErrorNotification from './useErrorNotification'
import useNotyf from '../useNotyf'

const dropdownResponse = ref()
const createResponse = ref()
const isLoading = ref(false)
const notif = useNotyf()

interface IRCategory {
  id: number
  name: string
}

export function useCategory() {
  const api = useApi()

  /**
   * @param object category
   * @returns HTTP status or error message
   */
  const create = async (category: any): Promise<any> => {
    try {
      const { data } = await api.post('/v1/category', category)
      createResponse.value = data
      notif.success(`Category <b>${data.body.name}</b> added.`)
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
  }

  /**
   * @returns Category or error message
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

  return {
    dropdownResponse,
    createResponse,
    isLoading,
    dropdown,
    create,
  } as const // as const is a typescript keyword to prevent from updating
}
