<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import sleep from '/@src/utils/sleep'

pageTitle.value = 'Create Inventory'

const router = useRouter()
const isLoadingInv = ref<boolean>(false)
const isLoadingVar = ref<boolean>(false)

const redirect = async (e: string) => {
  isLoadingInv.value = e === 'basic' ? true : false
  isLoadingVar.value = e === 'variation' ? true : false

  await sleep()
  console.log(router.getRoutes())
  router.push({
    name: `app-product-inventory-${e}-add`,
  })

  isLoadingInv.value = false
  isLoadingVar.value = false
}
</script>

<template>
  <div class="page-content-inner">
    <div class="inventory-options-page-wrapper option-set-2">
      <div class="wrapper-outer">
        <div class="set-1-wrapper">
          <div class="set-inner">
            <div class="content">
              <div class="logo columns is-centered">
                <div class="column">
                  <img
                    class="dark-image is-larger"
                    src="/@src/assets/illustrations/placeholders/promotion-dark.svg"
                    alt
                  />
                </div>
              </div>
              <div class="description columns is-centered">
                <div class="column has-text-centered">
                  <h6>Creates item to be sold.</h6>
                </div>
              </div>
              <div class="title columns is-centered">
                <div class="column has-text-centered">
                  <h4>Individual</h4>
                </div>
              </div>
              <div class="buttons columns is-centered">
                <div class="column has-text-centered">
                  <V-Button
                    color="info"
                    :loading="isLoadingInv"
                    raised
                    @click="redirect('basic')"
                    >Create</V-Button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="set-2-wrapper">
          <div class="set-inner">
            <div class="content">
              <div class="logo columns is-centered">
                <div class="column">
                  <img
                    class="dark-image is-larger"
                    src="/@src/assets/illustrations/placeholders/promotion-dark.svg"
                    alt
                  />
                </div>
              </div>
              <div class="description columns is-centered">
                <div class="column has-text-centered">
                  <h6>Creates an item with different specifications.</h6>
                </div>
              </div>
              <div class="title columns is-centered">
                <div class="column has-text-centered">
                  <h4>Variations</h4>
                </div>
              </div>
              <div class="buttons columns is-centered">
                <div class="column has-text-centered">
                  <V-Button
                    color="info"
                    :loading="isLoadingVar"
                    raised
                    @click="redirect('variation')"
                    >Create</V-Button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../../scss/abstracts/_variables.scss';
@import '../../../../scss/abstracts/_mixins.scss';
@import '../../../../scss/pages/generic/custom/_inventory-selection.scss';

.page-content-inner {
  margin-top: 10%;
}
</style>
