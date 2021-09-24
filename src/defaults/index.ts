import { reactive } from 'vue'

//Carousel
export const carouselConfig = reactive({
  itemsToShow: 1,
  snapAlign: 'start',
})

//CkEditor
export const ckEditorConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'insertTable',
      '|',
      'imageUpload',
      '|',
      'undo',
      'redo',
    ],
  },
  fontFamily: {
    options: ['"Montserrat", sans-serif', '"Roboto", sans-serif'],
  },
}
