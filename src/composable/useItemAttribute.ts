import { ref, computed, reactive } from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import type { AccountType } from '../models/user/'
import type { FieldsData } from '../models/product/'

const notyf = useNotyf()
const accountType = ref<AccountType>('advance')

export default function useItemAttribute() {
  const dynamicField = reactive<FieldsData[]>([
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
      accountType.value === 'regular' && dynamicField.length >= 1
        ? 'regular'
        : accountType.value === 'advance' && dynamicField.length >= 3
        ? 'advance'
        : undefined
    )
    const number = computed(() =>
      accountType.value === 'regular'
        ? 1
        : accountType.value === 'advance'
        ? 3
        : undefined
    )
    if (account.value) {
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
