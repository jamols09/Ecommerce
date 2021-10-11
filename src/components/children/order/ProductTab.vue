<script setup lang="ts">
import useNotyf from '/@src/composable/useNotyf'
import { computed, onMounted, reactive, ref, toRefs } from 'vue'
import { OrderItemsArray, OrderTabs } from '/@src/models/order'
import { products, branch } from '/@src/static/product'
import { useOrderStore } from '/@src/state/piniaState/orderState'
import sleep from '/@src/utils/sleep'

const notyf = useNotyf()
const order = useOrderStore()
const orderItem = computed(() => order.GET_ITEMS_ORDER)
const isAdd = computed(() => products.value === null || branch.value === null)
const isGenerateComp = computed(() => orderItem.value.length < 1)
const isLoadingCalc = ref(false)

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
  orderItem.value.splice(e, 1)
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
              :options="branch.options"
              :searchable="true"
              :object="true"
              track-by="label"
            />
          </VControl>
        </VField>
      </div>
      <div class="column is-6">
        <VField>
          <label> Product </label>
          <VControl>
            <Multiselect
              v-model="products.value"
              :options="products.options"
              :searchable="true"
              :object="true"
              track-by="label"
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
