import { ref, computed } from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import { AccountType } from '../models/users'

const notyf = useNotyf()
const accountType = ref<AccountType>(0) //should be changed value should be based on api call
console.log(accountType.value)
const imageFileArr = ref<Array<File>>([])

export default function usePreviewImages() {
  const images = ref<Array<string>>([])

  const uploadImages = (e: Event) => {
    const target = <HTMLInputElement>e.target
    let files = target.files

    if (!files || !files[0]) return

    const account = computed(() =>
      accountType.value === 0 && files && files.length > 1
        ? 0
        : accountType.value === 1 && files && files.length > 3
        ? 1
        : accountType.value === 2 && files && files.length > 8
        ? 2
        : undefined
    )
    console.log('account', account.value)
    const number = computed(() =>
      accountType.value === 0
        ? 1
        : accountType.value === 1
        ? 3
        : accountType.value === 2
        ? 8
        : undefined
    )
    if (typeof account.value === 'number') {
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
