import { STATEMENT_OR_BLOCK_KEYS } from '@babel/types'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    name: '',
    sku: '',
    department: '',
    description: '',
  }),
  getters: {
    getTabInfo: (state) => ({
      name: state.name,
      sku: state.sku,
      department: state.department,
      description: state.description,
    }),
  },
  actions: {
    fillTabInfo(data: any) {
      ;(this.name = data.name),
        (this.sku = data.sku),
        (this.department = data.department),
        (this.description = data.description)
    },
  },
  //   // optional getters
  //   getters: {
  //     doubleCount() {
  //       return this.counter * 2
  //     },
  //     // use getters in other getters
  //     doubleCountPlusOne() {
  //       return this.doubleCount * 2 + 1
  //     },
  //   },
  //   // optional actions
  //   actions: {
  //     reset() {
  //       // `this` is the store instance
  //       this.counter = 0
  //     },
  //   },
})
