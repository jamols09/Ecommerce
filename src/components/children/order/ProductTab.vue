<script setup lang="ts">
import useNotyf from '/@src/composable/useNotyf'
import { computed, reactive, ref } from 'vue'
import { CustomerInfo, OrderItemsArray, OrderTabs } from '/@src/models/order'
import sleep from '/@src/utils/sleep'

const notyf = useNotyf()

const orderItem = reactive<OrderItemsArray>([])
const isAdd = computed(() => itemTree.value === null)
const isGenerateComp = computed(() => orderItem.length < 1)
const isLoadingCalc = ref(false)
const selected = ref<OrderTabs>('customer')
const onRemoveItem = async (e: number) => {
  orderItem.splice(e, 1)
}
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
const onGenerateComputation = async () => {
  isLoadingCalc.value = true
  await sleep()
  isLoadingCalc.value = false
  notyf.success('Items computation generated.')
  selected.value = 'computation'
}
const onAddItem = () => {
  itemTree.value !== null
    ? orderItem.push({ code: itemTree.value, quantity: 1 })
    : false
}
</script>

<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <VField>
        <label> Name - Code </label>
        <VControl>
          <!-- <Treeselect
            v-model="itemTree.value"
            :options="itemTree.options"
            :disable-branch-nodes="true"
            placeholder="Choose item"
          /> -->
        </VControl>
      </VField>
    </div>
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
    <template v-for="(item, index) in orderItem" :key="item.id">
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
      <table class="table is-striped is-hoverable is-fullwidth"></table>
    </div>
  </div>
</template>
