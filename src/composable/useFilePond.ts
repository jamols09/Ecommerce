import { reactive } from 'vue'
import { ImageData } from '../models/people'

const imageData = reactive<ImageData>({
  name: '',
  file: null,
})

export const onAddFile = (error: any, fileInfo: any) => {
  if (error) {
    console.error(error)
    return
  }
  const _file = fileInfo.file as File
  if (_file) {
    imageData.file = _file
  }
}
export const onRemoveFile = (error: any, fileInfo: any) => {
  if (error) {
    console.error(error)
    return
  }
  imageData.file = null
}
export const onAddFileProgress = (file: any, progress: any) => {
  console.log(file, progress)
}
