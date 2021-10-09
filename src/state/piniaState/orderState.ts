import { defineStore } from 'pinia'

interface Order {
  firstname: string
  middlename: string
  lastname: string
  country: string
  stateRegion: string
  province: string
  city: string
  addressLine1: string
  addressLine2: string
  postal: number
  mobile: string
  telephone: string
}

export const useOrderStore = defineStore('order', {
  state: () =>
    ({
      firstname: '',
      middlename: '',
      lastname: '',
      country: '',
      stateRegion: '',
      province: '',
      city: '',
      addressLine1: '',
      addressLine2: '',
      postal: 0,
      mobile: '',
      telephone: '',
    } as Order),

  getters: {
    GET_CUSTOMER_INFO: (state) => ({
      firstname: state.firstname,
      middlename: state.middlename,
      lastname: state.lastname,
      country: state.country,
      stateRegion: state.stateRegion,
      province: state.province,
      city: state.city,
      addressLine1: state.addressLine1,
      addressLine2: state.addressLine2,
      postal: 0,
      mobile: state.mobile,
      telephone: state.telephone,
    }),
  },

  actions: {
    FILL_CUSTOMER_INFO(data: any) {
      this.firstname
      this.middlename
      this.lastname
      this.country
      this.stateRegion
      this.province
      this.city
      this.addressLine1
      this.addressLine2
      this.postal
      this.mobile
      this.telephone
    },
  },
})
