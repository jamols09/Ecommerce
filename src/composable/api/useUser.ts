import { ref } from 'vue'
import { useApi } from '/@src/composable/useApi'
import useErrorNotification from './useErrorNotification'
import useNotyf from '../useNotyf'

const detailsResponse = ref()
const removeResponse = ref()
const statusResponse = ref()
const createResponse = ref()
const tableResponse = ref()
const notif = useNotyf()
const isLoading = ref(false)

export function useUser() {
  const api = useApi()

  /**
   * @description Generate account for admin or client
   * @param object user
   * @returns HTTP status or error message
   */
  const create = async (user: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.post('/v1/users', user)
      createResponse.value = data
      notif.success(`Account successfully added.`)
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @description Get list of paginated users for table
   * @param object
   */
  const table = async (e?: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.get(`/v1/users`, { params: e })
      tableResponse.value = data
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @description Set account to active or inactive
   * @param array id
   * @returns Paginated category
   */
  const status = async (e?: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.post(`/v1/users/status`, e)
      statusResponse.value = data
      notif.success(`Account(s) successfully ${e?.status}d.`)
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @description Removes list of selected users
   * @param object
   */
  const remove = async (e?: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.post(`/v1/users/delete`, e)
      removeResponse.value = data
      notif.warning(`Account(s) removed.`)
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   *
   * @description Get user details by id
   * @param number
   * @returns Category model
   */
  const details = async (e: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.get(`/v1/users/${e}`)
      detailsResponse.value = data
    } catch (err: any) {
      console.error(err)
    }
    isLoading.value = false
  }

  /**
   *
   * @description Update user details
   * @param object details
   * @param number id
   */
  const update = async (
    e: any,
    i: number | string | string[]
  ): Promise<any> => {
    isLoading.value = true
    try {
      await api.patch(`/v1/users/${i}`, e)
    } catch (err: any) {
      console.error(err)
    }
    isLoading.value = false
  }

  return {
    detailsResponse,
    removeResponse,
    statusResponse,
    tableResponse,
    createResponse,
    isLoading,
    table,
    create,
    status,
    remove,
    details,
    update,
  } as const // as const is a typescript keyword to prevent from updating
}
