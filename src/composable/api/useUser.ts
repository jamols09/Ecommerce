import { ref } from 'vue'
import { useApi } from '/@src/composable/useApi'

const result = ref([])

export function useUser() {
  const api = useApi()
  /**
   * @param data object
   * @returns HTTP status or error message
   */
  const create = async (user: any): Promise<any> => {
    const { data } = await api.post('/v1/employees', user)
    result.value = data
  }

  // notyf.success(`Employee <b><u> ${inputs.firstname} </u></b> added.`)
  // notyf.error(`Something wong here.`)

  return {
    result,
    fetch,
    create,
  } as const // as const is a typescript keyword to prevent from updating
}
