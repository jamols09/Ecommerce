<script setup lang="ts">
import { ref, markRaw, watch } from 'vue'
import { useRouter } from 'vue-router'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import useNotyf from '/@src/composable/useNotyf'
import BasicTabInfo from '/@src/components/children/product/basic/BasicTabInfo.vue'
import BasicTabPricing from '/@src/components/children/product/basic/BasicTabPricing.vue'
import BasicTabSpecification from '/@src/components/children/product/basic/BasicTabSpecification.vue'

pageTitle.value = 'Create Basic Item'

const router = useRouter()
const notyf = useNotyf()
const isLoading = ref(false)
const selectedTab = ref('BasicTabInfo')
const tabs = [
  {
    label: 'Info',
    value: 'BasicTabInfo',
    icon: 'octicon:info-16',
  },
  {
    label: 'Specifications',
    value: 'BasicTabSpecification',
    icon: 'mdi:form-select',
  },
  {
    label: 'Pricing',
    value: 'BasicTabPricing',
    icon: 'si-glyph:tag-price',
  },
]

const tab = ref(null)

const onChangeTab = (e: any) => {
  const lookup = {
    BasicTabInfo,
    BasicTabPricing,
    BasicTabSpecification,
  }
  tab.value = markRaw(lookup[e])
}
onChangeTab('BasicTabInfo')

const create = async () => {
  isLoading.value = true
  isLoading.value = false
  notyf.success('Item has been added to the list')
  router.push({
    name: 'app-product-inventory-list',
  })
}
</script>

<template>
  <div class="page-content-inner">
    <div class="form-layout is-stacked">
      <div class="form-outer">
        <div class="form-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>Basic Item</h3>
            </div>
          </div>
        </div>
        <div class="form-body">
          <div class="form-section is-grey">
            <div class="columns is-multiline">
              <!-- Tabs -->
              <div class="column is-full">
                <VTabs
                  :selected="selectedTab"
                  :tabs="tabs"
                  @clicked-tab=";(selectedTab = $event), onChangeTab($event)"
                >
                  <template #tab="{}">
                    <keep-alive>
                      <component :is="tab"></component>
                    </keep-alive>
                  </template>
                </VTabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
/* Separated treeselect due to conflict */
@import '../../../../scss/extensions/_treeselect.scss';
</style>
<style scoped lang="scss">
@import '../../../../scss/abstracts/_variables.scss';
@import '../../../../scss/abstracts/_mixins.scss';
@import '../../../../scss/pages/generic/_forms.scss';

.form-layout {
  max-width: unset;

  .form-body {
    .form-section {
      // min-height: 400px;
    }
  }
}
</style>
