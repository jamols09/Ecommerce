import { reactive } from 'vue'

/**
 * Config's directory is plugin's default value
 * is declared to be used accross components.
 * Plugin's config should not be redeclared.
 */

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
