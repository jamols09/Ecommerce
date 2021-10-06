<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import useNotyf from '/@src/composable/useNotyf'
import type {
  InventoryTabs,
  Product,
  ProductOptionsArray,
} from '/@src/models/product'

pageTitle.value = 'Create Basic Item'

const router = useRouter()
const notyf = useNotyf()
const isLoading = ref(false)
const selectedTab = ref<InventoryTabs>('info')
const productOptions = ref<ProductOptionsArray>([])

const product = reactive<Product>({
  image: [],
  sku: '',
  name: null,
  department: null,
  description: 'Insert short description here.',
  active: false,
  discountable: false,
  displayQuantity: false,
  quantity: 0,
  quantityWarn: 0,
  price: 0,
  tag: [],
  gender: null,
  weight: {
    unit: null,
    amount: 0,
  },
  dimension: {
    unit: null,
    length: 0,
    width: 0,
    height: 0,
  },
})

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
                  :tabs="[
                    { label: 'Info', value: 'info', icon: 'octicon:info-16' },
                    {
                      label: 'Specifications',
                      value: 'specs',
                      icon: 'mdi:form-select',
                    },
                    {
                      label: 'Pricing',
                      value: 'pricing',
                      icon: 'si-glyph:tag-price',
                    },
                  ]"
                  @clicked-tab="selectedTab = $event"
                >
                  <template #tab="{ activeValue }">
                    <!-- Tab 1 -->
                    <div v-if="activeValue === 'info'">
                      <BasicTabInfo />
                    </div>

                    <!-- Tab 2 -->
                    <div v-else-if="activeValue === 'specs'">
                      <BasicTabSpecification />
                    </div>
                    <!-- Tab 3 -->
                    <div v-else-if="activeValue === 'pricing'">
                      <BasicTabPricing />
                    </div>
                  </template>
                </VTabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Fixed Save Buttons-->
    <!-- <div class="fixed-buttons is-active">
      <div class="fixed-buttons-inner">
        <button class="is-info is-elevated button v-button" @click="infoFunc">
          Save
        </button>
      </div>
    </div> -->
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
      min-height: 400px;
    }
  }
}
</style>
