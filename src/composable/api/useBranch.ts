import { ref } from 'vue'
import useNotyf from '../useNotyf'
import useErrorNotification from './useErrorNotification'
import { useApi } from '/@src/composable/useApi'
import useNotificationType from './useNotificationType'

const notifType = useNotificationType.notifType
const statusResponse = ref()
const tableResponse = ref()
const createResponse = ref()
const dropdownResponse = ref()
const removeResponse = ref()
const detailsResponse = ref()
const isLoading = ref(false)

interface IRBranchDropdown {
  id: number
  name: string
}

export function useBranch() {
  const api = useApi()

  /**
   * @description Generate branch
   * @param object
   * @returns HTTP status or error message
   */
  const create = async (e: any): Promise<any> => {
    try {
      const { data } = await api.post('/v1/branch', e)
      createResponse.value = data
      notifType(`Branch <b>${e.name}</b> successfully added.`, 'success')
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
  }

  /**
   * @description Gets all of branch for dropdown
   * @returns Branch list
   */
  const dropdown = async (): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.get(`/v1/branch/dropdown`)
      dropdownResponse.value = data.result.map((e: IRBranchDropdown) => {
        return { value: e.id, label: e.name }
      })
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @description Gets a list of paginated branch for table
   * @param object
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
   * @description Soft deletes list of branches; will not fail if branch contains an item
   * @param array
   * @returns branch
   */
  const remove = async (e?: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.post(`/v1/branch/delete`, e)
      removeResponse.value = data
      notifType(`Branch(es) successfully removed.`, 'warning')
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @description Set branch status to active or inactive
   * @param array
   * @returns status
   */
  const status = async (e?: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.post(`/v1/branch/status`, e)
      statusResponse.value = data
      notifType(`Branch(es) successfully ${e?.status}d.`, 'success')
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @description Get branch details by id
   * @param number id
   * @returns Branch model
   */
  const details = async (e: any): Promise<any> => {
    isLoading.value = true
    try {
      const { data } = await api.get(`/v1/branch/${e}`)
      detailsResponse.value = data
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
    isLoading.value = false
  }

  /**
   * @description Update branch details by id
   * @param object branch
   */
  const update = async (
    e: any,
    i: number | string | string[]
  ): Promise<any> => {
    try {
      await api.patch(`/v1/branch/${i}`, e)
      notifType(`Branch successfully updated.`, 'success')
    } catch (err: any) {
      useErrorNotification.error(err.response.data)
    }
  }

  return {
    removeResponse,
    tableResponse,
    createResponse,
    dropdownResponse,
    detailsResponse,
    isLoading,
    dropdown,
    create,
    table,
    remove,
    status,
    details,
    update,
  } as const // as const is a typescript keyword to prevent from updating
}
