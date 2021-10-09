<script setup lang="ts">
import { popovers } from '/@src/data/users/userPopovers'
import { ref, reactive, computed } from 'vue'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import type {
  OrderTabs,
  CustomerInfo,
  OrderItemsArray,
} from '/@src/models/order'
import sleep from '/@src/utils/sleep'
import useNotyf from '/@src/composable/useNotyf'

pageTitle.value = 'Create Order'

const notyf = useNotyf()
const autofill = ref('')
const selected = ref<OrderTabs>('customer')
const customer = reactive<CustomerInfo>({
  firstName: '',
  middleName: '',
  lastName: '',
  country: '',
  stateRegion: '',
  province: '',
  city: '',
  line1: '',
  line2: '',
  mobile: '',
  telephone: '',
  postal: null,
})
//should do axios call
const itemTree = reactive({
  options: [
    {
      id: 'team-i',
      label: 'Team I ',
      children: [
        { id: 'person-a', label: 'Person A ' },
        { id: 'person-b', label: 'Person B ' },
      ],
    },
    {
      id: 'team-ii',
      label: 'Team II ',
      children: [
        { id: 'person-c', label: 'Person C ' },
        { id: 'person-d', label: 'Person D ' },
      ],
    },
    { id: 'person-e', label: 'Person E ' },
  ],
  value: null,
})

const isLoadingCalc = ref(false)
const orderItem = reactive<OrderItemsArray>([])
const isAdd = computed(() => itemTree.value === null)
const isGenerateComp = computed(() => orderItem.length < 1)
const onAddItem = () => {
  itemTree.value !== null
    ? orderItem.push({ code: itemTree.value, quantity: 1 })
    : false
}
const onRemoveItem = async (e: number) => {
  orderItem.splice(e, 1)
}
const onGenerateComputation = async () => {
  isLoadingCalc.value = true
  await sleep()
  isLoadingCalc.value = false
  notyf.success('Items computation generated.')
  selected.value = 'computation'
}
</script>

<template>
  <div class="page-content-inner">
    <div class="form-layout is-stacked">
      <div class="form-outer">
        <div class="form-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>Order</h3>
            </div>
          </div>
        </div>
        <div class="form-body">
          <div class="form-section is-grey">
            <div class="columns is-multiline">
              <div class="column is-full">
                <VTabs
                  :selected="selected"
                  :tabs="[
                    {
                      label: 'Customer',
                      value: 'customer',
                      icon: 'fas fa-users',
                    },
                    {
                      label: 'Product',
                      value: 'product',
                      icon: 'feather:box',
                    },
                    {
                      label: 'Computation',
                      value: 'computation',
                      icon: 'si-glyph:money-coin',
                    },
                  ]"
                  @clicked-tab="selected = $event"
                >
                  <template #tab="{ activeValue }">
                    <CustomerTab v-if="activeValue === 'customer'" />
                    <ProductTab v-else-if="activeValue === 'product'" />
                    <Computation v-else-if="activeValue === 'computation'" />
                  </template>
                </VTabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Fixed Save Buttons-->
    <div class="fixed-buttons is-active">
      <div class="fixed-buttons-inner">
        <button class="is-info is-elevated button VButton">Save</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
/* Separated treeselect due to conflict */
@import '../../../scss/extensions/_treeselect.scss';
</style>
<style scoped lang="scss">
@import '../../../scss/abstracts/_variables.scss';
@import '../../../scss/abstracts/_mixins.scss';
@import '../../../scss/pages/generic/_forms.scss';

/* ==========================================================================
1. Invoice Normal mode
========================================================================== */
.flex-table {
  &.sub-table {
    .flex-table-item {
      padding-top: 0;
      padding-bottom: 0;
      margin-bottom: 0;
      min-height: 40px;
      border: none;

      .table-label {
        font-family: var(--font);
        text-transform: uppercase;
        font-size: 0.8rem;
        color: var(--light-text);
      }

      .table-total {
        font-family: var(--font);
        color: var(--dark-text);
        font-weight: 500;

        &.is-bigger {
          font-size: 1.2rem;
          font-weight: 600;
        }
      }
    }
  }

  .flex-table-header {
    span {
      &:not(:first-child) {
        justify-content: flex-end;
      }
    }
  }

  .flex-table-item {
    .flex-table-cell {
      &:not(:first-child) {
        justify-content: flex-end;
      }
    }
  }
}

/* ==========================================================================
2. Invoice Dark mode
========================================================================== */
.is-dark {
  .flex-table {
    .flex-table-item {
      background: var(--dark-sidebar-light-4);
    }
    &.sub-table {
      .flex-table-item {
        background: var(--dark-sidebar-light-4);
      }
    }
  }
}
</style>
