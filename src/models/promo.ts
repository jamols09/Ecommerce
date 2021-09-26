import type { Ref } from 'vue'

/***************************
 * PROMO TYPES DECLARATION *
 ***************************/

export type PromoType = 'raw' | 'percent'
export type PromoRepeatOptions = 'every_week' | 'every_month' | 'every_year'
export type PromoOptions = 'active' | 'unlimited' | 'specific'

export type TreeOptions = {
  options: object[]
  value: object[]
}
export type StartEndDate = {
  start: Date
  end: Date
}
export interface DateTimeFrame {
  start: Date
  end: Date
}
export interface PromoRecurring {
  active: boolean
  unlimited: boolean
  specific: boolean
  name: string
  description?: string
  type: PromoType
  amount: number
  quantity: number
  requiredAmount?: number
  repeat: PromoRepeatOptions
  date: DateTimeFrame
}
export type PromoOptionsArray = PromoOptions[]
