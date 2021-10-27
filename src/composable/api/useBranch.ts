import { ref } from 'vue'
import { useApi } from '/@src/composable/useApi'

const result = ref([])

export function useBranch() {
  const api = useApi()

  /**
   * @param data object
   * @returns HTTP status or error message
   */
  const create = async (branch: any): Promise<any> => {
    try {
      const { data } = await api.post('/v1/branch', branch)
      result.value = data
    } catch (err: any) {
      result.value = err
    }
  }

  return {
    result,
    create,
  } as const // as const is a typescript keyword to prevent from updating
}
