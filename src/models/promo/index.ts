//Treeselect
export type TreeOptions = {
  options: object[]
  value: object[]
}
//Promo discount type
export type PromoType = 'raw' | 'percent'

//Repeating options
export type PromoRepeatOptions = 'every_week' | 'every_month' | 'every_year'

export type StartEndDate = {
  start: Date
  end: Date
}
