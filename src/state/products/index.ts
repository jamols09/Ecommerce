import { defineStore } from 'pinia'

interface Product {
  name: string
  sku: string
  department: string
  description: string
  images: Array<string>
}

export const useProductStore = defineStore('product', {
  state: () =>
    ({
      name: '',
      sku: '',
      department: '',
      description: '',
      images: [],
    } as Product),

  getters: {
    getTabInfo: (state) => ({
      name: state.name,
      sku: state.sku,
      department: state.department,
      description: state.description,
      images: state.images,
    }),
  },

  actions: {
    fillTabInfo(data: any) {
      ;(this.name = data.name),
        (this.sku = data.sku),
        (this.department = data.department),
        (this.description = data.description),
        (this.images = data.images)
    },
  },
})
