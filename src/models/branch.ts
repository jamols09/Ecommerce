/****************************
 * BRANCH TYPES DECLARATION *
 ****************************/

export interface GeoLocation {
  longitude: number | null
  latitude: number | null
}

export interface Branch {
  name: string
  code: string
  country: string
  regionState: string
  city: string
  addressLine1: string
  addressLine2?: string | null
  postal: number | null
  telephone: string | null
  mobile: string | null
  geolocation: GeoLocation
}
