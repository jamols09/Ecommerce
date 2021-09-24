import { ref, computed } from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import { AccountType } from '../models/user/user'

const notyf = useNotyf()
const accountType = ref<AccountType>('regular') //should be changed value should be based on api call
const imageFileArr = ref<File[]>([])

export default function usePreviewImages() {
  const images = ref<string[]>([])

  const uploadImages = (e: Event) => {
    const target = <HTMLInputElement>e.target
    let files = target.files

    if (!files || !files[0]) return

    const account = computed(() =>
      accountType.value === 'basic' && files && files.length > 1
        ? 'basic'
        : accountType.value === 'regular' && files && files.length > 3
        ? 'regular'
        : accountType.value === 'advance' && files && files.length > 8
        ? 'advance'
        : undefined
    )
    const number = computed(() =>
      accountType.value === 'basic'
        ? 1
        : accountType.value === 'regular'
        ? 3
        : accountType.value === 'advance'
        ? 8
        : undefined
    )
    if (account.value) {
      notyf.error(
        `${account.value} accounts can only upload ${number.value} image per product`
      )
      files = null
    } else {
      images.value.length = 0
      imageFileArr.value = Array.from(files) //convert FileList to array
      imageFileArr.value.forEach((e) =>
        images.value.push(URL.createObjectURL(e))
      )
    }
  }

  return {
    images,
    uploadImages,
  }
}
