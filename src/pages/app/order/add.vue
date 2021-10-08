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
                    <div v-if="activeValue === 'customer'">
                      <p>
                        Note: when adding manual order this will be treated as a
                        separate data.
                      </p>
                      <!-- Basic Details -->
                      <div class="fieldset-heading mb-5">
                        <h4
                          class="has-text-weight-semibold"
                          style="font-family: Montserrat, sans-serif"
                        >
                          Info
                        </h4>
                      </div>
                      <div class="columns is-multiline">
                        <!-- First Name -->
                        <div class="column is-6">
                          <VField>
                            <label>First Name *</label>
                            <VControl
                              icon="ic:baseline-drive-file-rename-outline"
                            >
                              <input
                                v-model="customer.firstName"
                                type="text"
                                class="input is-info-focus"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <!-- Middle Name -->
                        <div class="column is-6">
                          <VField>
                            <label>Middle Name</label>
                            <VControl
                              icon="ic:baseline-drive-file-rename-outline"
                            >
                              <input
                                v-model="customer.middleName"
                                type="text"
                                class="input is-info-focus"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <!-- Last Name -->
                        <div class="column is-6">
                          <VField>
                            <label>Last Name</label>
                            <VControl
                              icon="ic:baseline-drive-file-rename-outline"
                            >
                              <input
                                v-model="customer.lastName"
                                type="text"
                                class="input is-info-focus"
                              />
                            </VControl>
                          </VField>
                        </div>
                      </div>
                      <!-- Address Details -->
                      <div class="fieldset-heading mb-5">
                        <h4
                          class="has-text-weight-semibold"
                          style="font-family: Montserrat, sans-serif"
                        >
                          Location
                        </h4>
                      </div>
                      <div class="columns is-multiline">
                        <!-- Autofill -->
                        <div class="column is-12">
                          <VField>
                            <VControl
                              icon="ic:baseline-drive-file-rename-outline"
                            >
                              <input
                                v-model="autofill"
                                type="text"
                                class="input is-info-focus"
                                placeholder="Autofill address"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <!-- Country -->
                        <div class="column is-6">
                          <VField>
                            <label>Country *</label>
                            <VControl
                              icon="ic:baseline-drive-file-rename-outline"
                            >
                              <input
                                v-model="customer.country"
                                type="text"
                                class="input is-info-focus"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <!-- State/Region -->
                        <div class="column is-6">
                          <VField>
                            <label>State / Region *</label>
                            <VControl
                              icon="ic:baseline-drive-file-rename-outline"
                            >
                              <input
                                v-model="customer.stateRegion"
                                type="text"
                                class="input is-info-focus"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <!-- Province -->
                        <div class="column is-6">
                          <VField>
                            <label>Province *</label>
                            <VControl
                              icon="ic:baseline-drive-file-rename-outline"
                            >
                              <input
                                v-model="customer.province"
                                type="text"
                                class="input is-info-focus"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <!-- City -->
                        <div class="column is-6">
                          <VField>
                            <label>City *</label>
                            <VControl
                              icon="ic:baseline-drive-file-rename-outline"
                            >
                              <input
                                v-model="customer.city"
                                type="text"
                                class="input is-info-focus"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <!-- Address line 1 -->
                        <div class="column is-6">
                          <VField>
                            <label>Address Line 1 *</label>
                            <VControl
                              icon="ic:baseline-drive-file-rename-outline"
                            >
                              <input
                                v-model="customer.line1"
                                type="text"
                                class="input is-info-focus"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <!-- Address line 2 -->
                        <div class="column is-6">
                          <VField>
                            <label>Address Line 2</label>
                            <VControl
                              icon="ic:baseline-drive-file-rename-outline"
                            >
                              <input
                                v-model="customer.line2"
                                type="text"
                                class="input is-info-focus"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-6">
                          <VField>
                            <label>Postal</label>
                            <VControl
                              icon="ic:baseline-drive-file-rename-outline"
                            >
                              <input
                                v-model="customer.postal"
                                type="number"
                                class="input is-info-focus"
                              />
                            </VControl>
                          </VField>
                        </div>
                      </div>
                      <!-- Contact Details -->
                      <div class="fieldset-heading mb-5">
                        <h4
                          class="has-text-weight-semibold"
                          style="font-family: Montserrat, sans-serif"
                        >
                          Contact
                        </h4>
                      </div>
                      <div class="columns is-multiline">
                        <!-- Mobile -->
                        <div class="column is-6">
                          <VField>
                            <label> Mobile </label>
                            <VControl icon="ph:device-mobile">
                              <input
                                v-model="customer.mobile"
                                type="number"
                                class="input is-info-focus"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <!-- Telephone -->
                        <div class="column is-6">
                          <VField>
                            <label> Telephone </label>
                            <VControl icon="ion:ios-telephone-outline">
                              <input
                                v-model="customer.telephone"
                                type="text"
                                class="input is-info-focus"
                              />
                            </VControl>
                          </VField>
                        </div>
                      </div>
                    </div>
                    <div v-else-if="activeValue === 'product'">
                      <div class="columns is-multiline">
                        <div class="column is-12">
                          <VField>
                            <label> Name - Code </label>
                            <VControl>
                              <Treeselect
                                v-model="itemTree.value"
                                :options="itemTree.options"
                                :disable-branch-nodes="true"
                                placeholder="Choose item"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-12">
                          <VField>
                            <label></label>
                            <VControl>
                              <VButton
                                grey
                                class="mr-4"
                                :disabled="isAdd"
                                @click="onAddItem"
                              >
                                Add
                              </VButton>
                              <VButton
                                grey
                                class="mr-4"
                                :disabled="isGenerateComp"
                                :loading="isLoadingCalc"
                                @click="onGenerateComputation"
                              >
                                Generate
                              </VButton>
                            </VControl>
                          </VField>
                        </div>
                        <template
                          v-for="(item, index) in orderItem"
                          :key="item.id"
                        >
                          <div class="column is-6">
                            <VField>
                              <label>Name</label>
                              <VControl>
                                <input
                                  v-model="item.code"
                                  type="text"
                                  class="input is-info-focus"
                                  disabled
                                />
                              </VControl>
                            </VField>
                          </div>
                          <div class="column is-5">
                            <VField>
                              <label>Quantity</label>
                              <VControl>
                                <input
                                  v-model="item.quantity"
                                  type="number"
                                  class="input is-info-focus"
                                />
                              </VControl>
                            </VField>
                          </div>
                          <div class="column auto">
                            <VField>
                              <label>&nbsp;</label>
                              <VButtons>
                                <VIconButton
                                  color="danger"
                                  light
                                  raised
                                  circle
                                  icon="feather:x"
                                  @click="onRemoveItem(index)"
                                />
                              </VButtons>
                            </VField>
                          </div>
                        </template>
                        <div class="column is-12 table-container">
                          <table
                            class="table is-striped is-hoverable is-fullwidth"
                          ></table>
                        </div>
                      </div>
                    </div>
                    <div v-else-if="activeValue === 'computation'">
                      <div class="columns is-multiline">
                        <div class="column is-12">
                          <div class="invoice-body">
                            <div class="invoice-card">
                              <div class="invoice-section">
                                <div class="flex-table">
                                  <!--Table header-->
                                  <div class="flex-table-header">
                                    <span class="is-grow">Product</span>
                                    <span>Quantity</span>
                                    <span>Rate</span>
                                    <span>Subtotal</span>
                                  </div>
                                  <!--Table item-->
                                  <div class="flex-table-item">
                                    <div
                                      class="flex-table-cell is-grow"
                                      data-th="Product"
                                    >
                                      <tippy
                                        class="has-help-cursor"
                                        interactive
                                        placement="bottom-start"
                                      >
                                        <span class="dark-text">
                                          Website Redesign
                                        </span>
                                        <template #content>
                                          <UserPopoverContent
                                            :user="popovers.user13"
                                          />
                                        </template>
                                      </tippy>
                                    </div>

                                    <div
                                      class="flex-table-cell"
                                      data-th="Quantity"
                                    >
                                      <span class="light-text">54</span>
                                    </div>
                                    <div class="flex-table-cell" data-th="Rate">
                                      <span class="dark-inverted">$24</span>
                                    </div>
                                    <div
                                      class="flex-table-cell has-text-right"
                                      data-th="Subtotal"
                                    >
                                      <span class="dark-inverted">$1,296</span>
                                    </div>
                                  </div>

                                  <!--Table item-->
                                  <div class="flex-table-item">
                                    <div
                                      class="flex-table-cell is-grow"
                                      data-th=""
                                    >
                                      <span class="dark-text">Logo Design</span>
                                    </div>

                                    <div
                                      class="flex-table-cell"
                                      data-th="Quantity"
                                    >
                                      <span class="light-text">12</span>
                                    </div>
                                    <div class="flex-table-cell" data-th="Rate">
                                      <span class="dark-inverted">$24</span>
                                    </div>
                                    <div
                                      class="flex-table-cell has-text-right"
                                      data-th="Subtotal"
                                    >
                                      <span class="dark-inverted">$288</span>
                                    </div>
                                  </div>

                                  <!--Table item-->
                                  <div class="flex-table-item">
                                    <div
                                      class="flex-table-cell is-grow"
                                      data-th=""
                                    >
                                      <span class="dark-text"
                                        >Custom Illustrations</span
                                      >
                                    </div>

                                    <div
                                      class="flex-table-cell"
                                      data-th="Quantity"
                                    >
                                      <span class="light-text">7</span>
                                    </div>
                                    <div class="flex-table-cell" data-th="Rate">
                                      <span class="dark-inverted">$32</span>
                                    </div>
                                    <div
                                      class="flex-table-cell has-text-right"
                                      data-th="Subtotal"
                                    >
                                      <span class="dark-inverted">$224</span>
                                    </div>
                                  </div>
                                </div>

                                <div class="flex-table sub-table">
                                  <!--Table item-->
                                  <div class="flex-table-item">
                                    <div
                                      class="flex-table-cell is-grow is-vhidden"
                                      data-th=""
                                    >
                                      <span class="dark-text">
                                        Website Development
                                      </span>
                                    </div>

                                    <div
                                      class="flex-table-cell"
                                      data-th="Quantity"
                                    >
                                      <span class="light-text"></span>
                                    </div>
                                    <div class="flex-table-cell" data-th="">
                                      <span class="table-label">Subtotal</span>
                                    </div>
                                    <div
                                      class="flex-table-cell has-text-right"
                                      data-th=""
                                    >
                                      <span class="table-total dark-inverted">
                                        $1,808
                                      </span>
                                    </div>
                                  </div>
                                  <!--Table item-->
                                  <div class="flex-table-item">
                                    <div
                                      class="flex-table-cell is-grow is-vhidden"
                                      data-th=""
                                    >
                                      <span class="dark-text">
                                        Website Development
                                      </span>
                                    </div>

                                    <div
                                      class="flex-table-cell is-vhidden"
                                      data-th="Quantity"
                                    >
                                      <span class="light-text">2</span>
                                    </div>
                                    <div class="flex-table-cell" data-th="">
                                      <span class="table-label">Taxes</span>
                                    </div>
                                    <div
                                      class="flex-table-cell has-text-right"
                                      data-th=""
                                    >
                                      <span class="table-total dark-inverted">
                                        $273
                                      </span>
                                    </div>
                                  </div>
                                  <!--Table item-->
                                  <div class="flex-table-item">
                                    <div
                                      class="flex-table-cell is-grow is-vhidden"
                                      data-th=""
                                    >
                                      <span class="dark-text">
                                        Website Development
                                      </span>
                                    </div>
                                    <div
                                      class="
                                        flex-table-cell
                                        cell-end
                                        is-vhidden
                                      "
                                      data-th="Unit"
                                    >
                                      <span class="light-text">hrs</span>
                                    </div>

                                    <div class="flex-table-cell" data-th="">
                                      <span class="table-label">Total</span>
                                    </div>
                                    <div
                                      class="flex-table-cell has-text-right"
                                      data-th=""
                                    >
                                      <span
                                        class="
                                          table-total
                                          is-bigger
                                          dark-inverted
                                        "
                                        >$2,081</span
                                      >
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
