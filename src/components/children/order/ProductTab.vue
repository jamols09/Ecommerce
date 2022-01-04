<script setup lang="ts">
import useNotyf from '/@src/composable/useNotyf'
import { computed, ref } from 'vue'
import { products, branch } from '/@src/static/product'
import { useOrderStore } from '/@src/state/piniaState/orderState'
import { useBranch } from '/@src/composable/api/useBranch'
import sleep from '/@src/utils/sleep'
import { useItem } from '/@src/composable/api/useItem'

const branchApi = useBranch()
const itemApi = useItem()
const notyf = useNotyf()
const order = useOrderStore()
const orderItem = computed(() => order.GET_ITEMS_ORDER)
const isAdd = computed(() => products.value === null || branch.value === null)
const isGenerateComp = computed(() => orderItem.value.length < 1)
const isLoadingCalc = ref(false)
const productDropdown = ref(null)
const productPlaceholder = ref('')

const onGenerateComputation = async () => {
  isLoadingCalc.value = true
  await sleep()
  isLoadingCalc.value = false
  notyf.success('Items computation generated.')
}
const onAddItem = () => {
  products.value !== null
    ? order.FILL_ITEMS_ORDER({
        ...products.value,
        quantity: 1,
        bvalue: branch.value!.value,
        blabel: branch.value!.label,
      })
    : false
}

const onRemoveItem = async (e: number) => {
  order.REMOVE_ITEM_ORDER(e)
}

const onGetBranch = async () => {
  products.value = null
  productDropdown.value = null
  await branchApi.dropdown()
}

const onGetProductByBranch = async (e: any) => {
  if (e) {
    productPlaceholder.value = ''
    await itemApi.dropdown(e)
    productDropdown.value = itemApi.dropdownResponse.value
  } else {
    console.error('Please select a branch.')
    productPlaceholder.value = 'Please select a branch'
  }
}
</script>

<template>
  <div>
    <div class="columns">
      <div class="column is-6">
        <VField>
          <label> Branch </label>
          <VControl>
            <Multiselect
              v-model="branch.value"
              :options="branchApi.dropdownResponse.value"
              :searchable="true"
              :loading="branchApi.isLoading.value"
              track-by="label"
              :placeholder="productPlaceholder"
              @open="onGetBranch"
            />
          </VControl>
        </VField>
      </div>
      <div class="column is-6">
        <VField>
          <label> Product </label>
          <VControl>
            <!-- Get items by selected branch -->
            <Multiselect
              v-model="products.value"
              :options="productDropdown"
              :searchable="true"
              :object="true"
              :loading="itemApi.isLoading.value"
              track-by="label"
              :placeholder="productPlaceholder"
              @open="onGetProductByBranch(branch.value)"
            />
          </VControl>
        </VField>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <VField>
          <VControl>
            <VButton grey class="mr-4" :disabled="isAdd" @click="onAddItem">
              Add
            </VButton>
          </VControl>
        </VField>
      </div>
    </div>
    <template v-for="(oitem, index) in orderItem" :key="oitem.index">
      <div class="columns is-vcentered">
        <div class="column is-two-thirds">
          <VField>
            <VControl class="mt-auto pl-2">
              <h6>
                {{ index + 1 }}. {{ oitem.blabel }}
                <b> - {{ oitem.label }}</b>
              </h6>
            </VControl>
          </VField>
        </div>
        <div class="column">
          <VField>
            <VControl>
              <input
                v-model="oitem.quantity"
                type="number"
                class="input is-info-focus"
                @blur="
                  () => {
                    if (oitem.quantity < 0) {
                      oitem.quantity = oitem.quantity * -1
                    }
                  }
                "
              />
            </VControl>
          </VField>
        </div>
        <div class="column">
          <VField>
            <VControl class="m-auto">
              <VAction @click="onRemoveItem(index)"> Remove </VAction>
            </VControl>
          </VField>
        </div>
      </div>
    </template>

    <div class="columns">
      <div class="column mt-5 is-12 has-text-centered">
        <VField>
          <VControl>
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
    </div>
  </div>
</template>
<style scoped lang="scss">
@media only screen and (max-width: 750px) {
  .label:not(:last-child) {
    display: none;
  }
}
</style>
