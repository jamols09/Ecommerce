import { defineStore } from 'pinia'

interface Product {
  sku: string
  name: string
  department_id: string
  description: string
  images: Array<string>
  brand: string

  options: Array<string>
  branches: Array<string>
  quantity: number
  quantity_warn: number
  tags: Array<string>
  colors: Array<string>
  sizes: Array<string>
  materials: Array<string>
  weight_unit: string
  weight_amount: number
  dimension_unit: string
  length: number
  height: number
  width: number

  price: number
}

export const useProductStore = defineStore('product', {
  state: () =>
    ({
      sku: '',
      name: '',
      department_id: '',
      description: '',
      images: [],
      branches: [],
      brand: '',

      options: [],
      quantity: 0,
      quantity_warn: 0,
      tags: [],
      colors: [],
      sizes: [],
      materials: [],
      weight_unit: '',
      weight_amount: 0,
      dimension_unit: '',
      length: 0,
      height: 0,
      width: 0,

      price: 0,
    } as Product),

  getters: {
    GET_TAB_INFO: (state) => ({
      sku: state.sku,
      name: state.name,
      department_id: state.department_id,
      description: state.description,
      images: state.images,
      brand: state.brand,
    }),

    GET_TAB_SPECS: (state) => ({
      options: state.options,
      branches: state.branches,
      quantity: state.quantity,
      quantity_warn: state.quantity_warn,
      tags: state.tags,
      colors: state.colors,
      sizes: state.sizes,
      materials: state.materials,
      weight_unit: state.weight_unit,
      weight_amount: state.weight_amount,
      dimension_unit: state.dimension_unit,
      length: state.length,
      height: state.height,
      width: state.width,
    }),

    GET_TAB_PRICE: (state) => ({
      options: state.options,
      price: state.price,
    }),

    IS_MISSING_FIELDS: (state) => {
      return (
        (state.images.length > 0 &&
          state.department_id.length > 0 &&
          state.name.length > 0 &&
          state.description.length > 0 &&
          state.branches.length > 0) ??
        'false'
      )
    },
  },

  actions: {
    FILL_TAB_INFO(data: any) {
      ;(this.sku = data.sku),
        (this.name = data.name),
        (this.department_id = data.department_id),
        (this.description = data.description),
        (this.images = data.images),
        (this.brand = data.brand)
    },

    FILL_TAB_SPECS(data: any) {
      ;(this.options = data.options),
        (this.branches = data.branches),
        (this.quantity = data.quantity),
        (this.quantity_warn = data.quantity_warn),
        (this.tags = data.tags),
        (this.colors = data.colors),
        (this.sizes = data.sizes),
        (this.materials = data.materials),
        (this.weight_unit = data.weight_unit),
        (this.weight_amount = data.weight_amount),
        (this.dimension_unit = data.dimension_unit),
        (this.height = data.height),
        (this.length = data.length),
        (this.width = data.width)
    },

    FILL_TAB_PRICE(data: any) {
      this.price = data.price
      this.options = data.options
    },
  },
})
