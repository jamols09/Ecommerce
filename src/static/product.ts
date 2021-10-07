import { reactive } from 'vue'
import {
  DimensionDropdown,
  WeightDropdown,
  GeneralDropdown,
  TagsDropdown,
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
export const branch = reactive<GeneralDropdown>({
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
    { value: 'parent1', label: 'Category Parent 1' },
    { value: 'parent2', label: 'Category Parent 2' },
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
