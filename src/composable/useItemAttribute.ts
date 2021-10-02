import { ref, computed, reactive } from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import type { AccountType } from '../models/users'
import type { DynamicFieldsAray } from '../models/product'

const notyf = useNotyf()
const accountType = ref<AccountType>(0)

export default function useItemAttribute() {
  const dynamicField = reactive<DynamicFieldsAray>([
    {
      attribute: '',
      value: [],
      input: '',
    },
  ])

  const removeAttribute = (e: number) => {
    dynamicField.splice(e, 1)
  }
  const capitalText = (e: number) => {
    dynamicField[e].attribute = dynamicField[e].attribute.toUpperCase()
  }
  const addTag = (fieldIndex: number) => {
    if (
      !dynamicField[fieldIndex].value.includes(
        dynamicField[fieldIndex].input.toUpperCase()
      ) &&
      dynamicField[fieldIndex].input.trim() !== ''
    )
      dynamicField[fieldIndex].value.push(
        dynamicField[fieldIndex].input.toUpperCase()
      )
    dynamicField[fieldIndex].input = ''
  }

  const removeTag = (fieldIndex: number, tagIndex: number) => {
    dynamicField[fieldIndex].value.splice(tagIndex, 1)
  }

  const addAttribute = () => {
    const account = computed(() =>
      accountType.value === 1 && dynamicField.length >= 1
        ? 1
        : accountType.value === 2 && dynamicField.length >= 3
        ? 2
        : undefined
    )
    const number = computed(() =>
      accountType.value === 1 ? 1 : accountType.value === 2 ? 3 : undefined
    )
    if (typeof account.value === 'number') {
      notyf.error(
        `${account.value} accounts can only add ${number.value} attribute per product`
      )
    } else {
      dynamicField.push({ attribute: '', value: [], input: '' })
    }
  }

  return {
    dynamicField,
    addAttribute,
    removeAttribute,
    addTag,
    removeTag,
    capitalText,
  }
}
