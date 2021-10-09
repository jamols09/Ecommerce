import { defineStore } from 'pinia'

interface Order {
  firstName: string
  middleName: string
  lastName: string
  country: string
  stateRegion: string
  province: string
  city: string
  barangay: string
  line1: string
  line2: string
  postal: number
  mobile: string
  telephone: string
}

export const useOrderStore = defineStore('order', {
  state: () =>
    ({
      firstName: '',
      middleName: '',
      lastName: '',
      country: '',
      stateRegion: '',
      province: '',
      city: '',
      barangay: '',
      line1: '',
      line2: '',
      postal: 0,
      mobile: '',
      telephone: '',
    } as Order),

  getters: {
    GET_CUSTOMER_INFO: (state) => ({
      firstname: state.firstName,
      middlename: state.middleName,
      lastname: state.lastName,
      country: state.country,
      stateRegion: state.stateRegion,
      province: state.province,
      barangay: state.barangay,
      city: state.city,
      line1: state.line1,
      line2: state.line2,
      postal: 0,
      mobile: state.mobile,
      telephone: state.telephone,
    }),
  },

  actions: {
    FILL_CUSTOMER_INFO(data: any) {
      ;(this.firstName = data.firstName),
        (this.middleName = data.middleName),
        (this.lastName = data.lastName),
        (this.country = data.country),
        (this.stateRegion = data.stateRegion),
        (this.province = data.province),
        (this.city = data.city),
        (this.barangay = data.barangay),
        (this.line1 = data.line1),
        (this.line2 = data.line2),
        (this.postal = data.postal),
        (this.mobile = data.mobile),
        (this.telephone = data.telephone)
    },
  },
})
