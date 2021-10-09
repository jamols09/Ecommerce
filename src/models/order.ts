/***************************
 * ORDER TYPES DECLARATION *
 ***************************/

export type OrderTabs = 'customer' | 'item' | 'computation'

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
  code: string
  quantity: number
}

export type OrderItemsArray = OrderItems[]
