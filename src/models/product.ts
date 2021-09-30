/****************************************
 * INVENTORY & CATEGORY TYPES DECLARATION *
 ****************************************/

export type InventoryTabs = 'info' | 'specs' | 'pricing'
export type ProductOptions = 'active' | 'displayQuantity' | 'discountable'
export type WeightUnit = 'kg' | 'g' | null
export type DimensionUnit = 'inch' | 'cm' | null
export type DynamicFieldsAray = Array<DynamicField>
export type ProductOptionsArray = Array<ProductOptions>

interface DynamicField {
  attribute: string
  value: Array<String>
  input: string
}
interface Weight {
  unit: WeightUnit
  amount: number
}
interface Dimension {
  unit: DimensionUnit
  length: number
  width: number
  height: number
}
interface Branch {
  _id: number
  quantity: number
}
export interface Options {
  id?: string | number
  label: string
  value?: string | number
  children?: Array<Object>
}
export interface TagsDropdown {
  options: Array<Options>
  value: null | Array<String>
}
export interface GeneralDropdown {
  options: Array<Options>
  value: null | Array<String> | Array<Number>
}
export interface DimensionDropdown {
  options: Array<Options>
  value: DimensionUnit
}
export interface WeightDropdown {
  options: Array<Options>
  value: WeightUnit
}
export interface Product {
  active: boolean
  discountable: boolean
  displayQuantity: boolean
  quantity: number
  quantityWarn: number
  price: number
  name: string
  sku: string
  codeName: string
  description: string | null
  weight: Weight
  dimension: Dimension
  category?: string
  tag?: Array<String>
  branch: Array<Branch>
}
