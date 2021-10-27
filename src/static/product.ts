import { reactive } from 'vue'
import { ProductDropdown } from '../models/order'
import {
  DimensionDropdown,
  WeightDropdown,
  GeneralDropdown,
  TagsDropdown,
  BranchDropdown,
} from '../models/product'

export const dimension = reactive<DimensionDropdown>({
  options: [
    { value: 'inch', label: 'Inch' },
    { value: 'cm', label: 'Centimeter' },
  ],
  value: null,
})
export const weight = reactive<WeightDropdown>({
  options: [
    { value: 'g', label: 'Gram' },
    { value: 'kg', label: 'Kilogram' },
  ],
  value: 'g',
})
export const department = reactive<GeneralDropdown>({
  options: [
    { value: 'food', label: 'Food' },
    { value: 'other', label: 'Other' },
    { value: 'clothe', label: 'Clothe' },
    { value: 'accessories', label: 'Accessory' },
    { value: 'hardware', label: 'Hardware' },
  ],
  value: null,
})
export const branch = reactive<BranchDropdown>({
  options: [
    { value: '12340', label: 'Davao Branch' },
    { value: '1241', label: 'Cebu Branch' },
    { value: '12141', label: 'La3ng Branch' },
    { value: '133', label: 'Nabs Branch' },
    { value: '33141', label: 'L1nang Branch' },
    { value: '13', label: 'Na1s Branch' },
    { value: '-1', label: 'All' },
  ],
  value: null,
})
export const category = reactive<GeneralDropdown>({
  options: [
    {
      id: 'a',
      label: 'a',
      children: [
        { id: 'aa', label: 'aa' },
        { id: 'ab', label: 'ab' },
      ],
    },
    { id: 'b', label: 'b' },
    { id: 'c', label: 'c' },
  ],
  value: null,
})
export const tag = reactive<TagsDropdown>({
  options: [],
  value: [],
})
export const color = reactive<GeneralDropdown>({
  options: [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'gray', label: 'Gray' },
    { value: 'pink', label: 'Pink' },
    { value: 'green', label: 'Green' },
    { value: 'brown', label: 'Brown' },
    { value: 'white', label: 'White' },
    { value: 'black', label: 'Black' },
    { value: 'orange', label: 'Orange' },
    { value: 'purple', label: 'Purple' },
    { value: 'yellow', label: 'Yellow' },
  ],
  value: [],
})
export const parent = reactive<GeneralDropdown>({
  options: [
    { value: '1', label: 'Category Parent 1' },
    { value: '2', label: 'Category Parent 2' },
  ],
  value: null,
})
export const size = reactive<GeneralDropdown>({
  options: [],
  value: null,
})
export const material = reactive<GeneralDropdown>({
  options: [],
  value: null,
})
export const products = reactive<ProductDropdown>({
  options: [
    { value: '11a23', label: 'Item 1' },
    { value: '1a2w3', label: 'Item 2' },
    { value: '13', label: 'Item 3' },
    { value: '1a213', label: 'Item 4' },
    { value: '1233', label: 'Item 5' },
    { value: '13123', label: 'Item 6' },
    { value: '1adf23', label: 'Item 7' },
    { value: '1a3123', label: 'Item 8' },
    { value: '1a21323', label: 'Item 9' },
    { value: '1a32q3', label: 'Item 11' },
    { value: '1edb23', label: 'Item 12' },
  ],
  value: null,
})
