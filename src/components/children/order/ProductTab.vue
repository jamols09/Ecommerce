<script setup lang="ts">
import useNotyf from '/@src/composable/useNotyf'
import { computed, reactive, ref } from 'vue'
import { OrderItemsArray, OrderTabs } from '/@src/models/order'
import { products } from '/@src/static/product'
import sleep from '/@src/utils/sleep'

const notyf = useNotyf()

const orderItem = reactive<OrderItemsArray>([])
const isAdd = computed(() => products.value === null)
const isGenerateComp = computed(() => orderItem.length < 1)
const isLoadingCalc = ref(false)
const selected = ref<OrderTabs>('customer')
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
const onAddItem = () => {
  console.log(products.value)
  products.value !== null
    ? orderItem.push({ id: products.value, quantity: 1 })
    : false
}
</script>

<template>
  <div>
    <div class="columns">
      <div class="column is-12">
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
          <label></label>
          <VControl>
            <VButton grey class="mr-4" :disabled="isAdd" @click="onAddItem">
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
    </div>
    <template v-for="(item, index) in orderItem" :key="item.id">
      <div class="columns is-vcentered">
        <div class="column is-two-thirds">
          <VField>
            <VControl class="mt-auto pl-2">
              <h6>
                {{ index + 1 }}. <b>{{ item.id.label }}</b>
              </h6>
            </VControl>
          </VField>
        </div>
        <div class="column">
          <VField>
            <VControl>
              <input
                v-model="item.quantity"
                type="number"
                class="input is-info-focus"
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
  </div>
</template>
<style scoped lang="scss">
@media only screen and (max-width: 750px) {
  .label:not(:last-child) {
    display: none;
  }
}
</style>
