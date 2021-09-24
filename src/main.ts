/**
 * This is your client vue app entrypoint
 * Its loaded because it is referenced in the vite
 * entrypoint file (index.html located at the root of this project)
 *
 * External css/js files will be loaded as dependencies.
 * You may want to check the vite configuration.
 * Some plugins will register virtual components or lazyload other for us.
 *
 * @see /index.html
 * @see /vite.config.ts
 */

import { createApp } from './app'

import VueCustomTooltip, {
  TooltipOptions,
} from '@adamdehaven/vue-custom-tooltip'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
/**
 * We create our app and mount it when it is ready
 *
 * @see /@src/app.ts for more detailed informations
 */
createApp({
  async enhanceApp(app) {
    // Lazy load aditional components
    const VCalendar = (await import('v-calendar')).default
    const VueMultiselect = (await import('@vueform/multiselect')).default
    const VueSlider = (await import('@vueform/slider')).default
    const VueTippy = (await import('vue-tippy')).default

    /**
     * Put here the newly added plugins
     */
    const Treeselect = (await import('vue3-treeselect')).default
    const VueCKEditor = (await import('@ckeditor/ckeditor5-vue')).default

    const hasNestedRouterLink = (
      await import('./directives/has-nested-router-link')
    ).default
    const background = (await import('./directives/background')).default
    const tooltip = (await import('./directives/tooltip')).default

    app.use(VCalendar)
    app.use(VueTippy, {
      defaultProps: {
        theme: 'light',
      },
    })
    app.use(VueCustomTooltip, {
      name: 'VueTooltip',
      color: '#fff',
      background: '#039be5',
      borderRadius: 4,
      fontWeight: 500,
    })
    app.use(VueCKEditor)

    app.component('Carousel', Carousel) //carousel
    app.component('Slide', Slide) //carousel
    app.component('Pagination', Pagination) //carousel
    app.component('Navigation', Navigation) //carousel
    app.component('Treeselect', Treeselect)
    app.component(VueMultiselect.name, VueMultiselect)
    app.component(VueSlider.name, VueSlider)

    app.directive('has-nested-router-link', hasNestedRouterLink)
    app.directive('background', background)
    app.directive('tooltip', tooltip)
  },
}).then((app) => app.mount('#app'))