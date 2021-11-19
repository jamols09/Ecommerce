export interface IHeader {
  name: string
}
export interface IData {
  id: number
  is_discountable?: number
  name?: string
  sku?: string
  username?: string
  first_name?: string
  middle_name?: string | null
  last_name?: string | null
  birthdate?: string
  thumbnail?: string | null
  is_active?: number
  email?: string
  account_type?: string
  email_verified_at?: string
  created_at?: string
  code?: string | null
  city?: string | null
  barangay?: string
  address_line_1?: number
  telephone?: string
  mobile?: string
  parent: any
}
