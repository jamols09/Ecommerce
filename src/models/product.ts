/****************************************
 * INVENTORY & CATEGORY TYPES DECLARATION *
 ****************************************/

export type InventoryTabs = 'info' | 'specs' | 'pricing'
export type ProductOptions = 'active' | 'displayQuantity' | 'discountable'
export type CategoryOptions = {
  id: number | string
  label: string
}

export interface FieldsData {
  attribute: string
  value: string[]
  input: string
}
export interface VariantCategory {
  options: object[]
  value: string | null
}
export interface Product {
  active: boolean
  discountable: boolean
  displayQuantity: boolean
  name: string
  sku: string
  quantity: number
  quantityWarn: number
  price: number
  description: string | null
  category?: string
  tag?: Array<string>
}
export interface Category {
  options: CategoryOptions[]
  value: string | number | null
}
export type ProductOptionsArray = ProductOptions[]
