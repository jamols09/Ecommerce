/***************************
 * ORDER TYPES DECLARATION *
 ***************************/

export type OrderTabs = 'customer' | 'item' | 'computation'

interface Options {
  id?: string | number
  label: string
  value?: string | number
}
interface ProductOrdered {
  value: string
  label: string
}
export interface CustomerInfo {
  firstName: string
  middleName?: string
  lastName?: string
  country: string
  stateRegion: string
  province: string
  city: string
  barangay: string
  line1: string
  line2?: string
  mobile: string
  telephone?: string
  postal?: string | null
}
export interface OrderItems {
  id: ProductOrdered
  label?: string
  quantity: number
}
export interface ProductDropdown {
  options: Array<Options>
  value: null | ProductOrdered
}
export type OrderItemsArray = OrderItems[]
