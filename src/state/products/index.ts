import { defineStore } from 'pinia'

interface Product {
  sku: string
  name: string
  department: string
  description: string
  images: Array<string>

  options: Array<string>
  branches: Array<string>
  quantity: number
  quantityWarn: number
  tags: Array<string>
  colors: Array<string>
  sizes: Array<string>
  materials: Array<string>
  weightUnit: string
  weightAmount: number
  dimensionUnit: string
  dimensionLength: number
  dimensionHeight: number
  dimensionWidth: number

  price: number
}

export const useProductStore = defineStore('product', {
  state: () =>
    ({
      sku: '',
      name: '',
      department: '',
      description: '',
      images: [],
      branches: [],

      options: [],
      quantity: 0,
      quantityWarn: 0,
      tags: [],
      colors: [],
      sizes: [],
      materials: [],
      weightUnit: '',
      weightAmount: 0,
      dimensionUnit: '',
      dimensionLength: 0,
      dimensionHeight: 0,
      dimensionWidth: 0,

      price: 0,
    } as Product),

  getters: {
    GET_TAB_INFO: (state) => ({
      sku: state.sku,
      name: state.name,
      department: state.department,
      description: state.description,
      images: state.images,
    }),

    GET_TAB_SPECS: (state) => ({
      options: state.options,
      branches: state.branches,
      quantity: state.quantity,
      quantityWarn: state.quantityWarn,
      tags: state.tags,
      colors: state.colors,
      sizes: state.sizes,
      materials: state.materials,
      weightUnit: state.weightUnit,
      weightAmount: state.weightAmount,
      dimensionUnit: state.dimensionUnit,
      dimensionLength: state.dimensionLength,
      dimensionHeight: state.dimensionHeight,
      dimensionWidth: state.dimensionWidth,
    }),

    GET_TAB_PRICE: (state) => ({
      options: state.options,
      price: state.price,
    }),
  },

  actions: {
    FILL_TAB_INFO(data: any) {
      ;(this.sku = data.sku),
        (this.name = data.name),
        (this.department = data.department),
        (this.description = data.description),
        (this.images = data.images)
    },

    FILL_TAB_SPECS(data: any) {
      ;(this.options = data.options),
        (this.branches = data.branches),
        (this.quantity = data.quantity),
        (this.quantityWarn = data.quantityWarn),
        (this.tags = data.tags),
        (this.colors = data.colors),
        (this.sizes = data.sizes),
        (this.materials = data.materials),
        (this.weightUnit = data.weightUnit),
        (this.weightAmount = data.weightAmount),
        (this.dimensionUnit = data.dimensionUnit),
        (this.dimensionHeight = data.dimensionHeight),
        (this.dimensionLength = data.dimensionLength),
        (this.dimensionWidth = data.dimensionLength)
    },

    FILL_TAB_PRICE(data: any) {
      this.price = data.price
      this.options = data.options
    },
  },
})
