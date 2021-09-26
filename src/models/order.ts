// Create Order Tabs
export type OrderTabs = 'customer' | 'item' | 'computation'

// Customer info
export interface CustomerInfo {
  firstName: string
  middleName?: string
  lastName?: string
  country: string
  stateRegion: string
  province: string
  city: string
  line1: string
  line2?: string
  mobile?: string
  telephone?: string
  postal?: number | null
}

// Item Attr
export interface OrderItems {
  code: string
  quantity: number
}
export type OrderItemsArray = OrderItems[]
