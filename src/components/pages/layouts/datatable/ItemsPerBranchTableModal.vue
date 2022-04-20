<script setup lang="ts">
import { number } from '@intlify/core-base'
import 'simple-datatables/src/style.css'
import { computed, onMounted, reactive, ref, watchEffect } from 'vue'
import { useBranch } from '/@src/composable/api/useBranch'
import { IHeader } from '/@src/models/table'

interface ITableProps {
  id: number
}

const props = withDefaults(defineProps<ITableProps>(), {
  id: 0,
})

const api = useBranch()

interface ITable {
  searchType: Array<string>
  totalRows: Array<number>
  headers: Array<{ name: string }>
  data: Array<{
    name: string
    sku: string
    details: Array<any>
  }>
  order: string
  column: string
}

const table: ITable = reactive({
  searchType: ['Name', 'Code'],
  totalRows: [10, 15, 30, 50],
  headers: [
    { name: 'Status' },
    { name: 'Name' },
    { name: 'Sku' },
    { name: 'Quantity' },
    { name: 'Warn' },
    { name: 'Price' },
    { name: 'Action' },
  ],
  data: [],
  order: '',
  column: '',
})

const pagination = ref({
  links: {
    first: '',
    last: '',
    prev: '',
    next: '',
  },
  meta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    links: [{ url: '', label: '', active: false }],
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  },
})

const rowCount = ref()
const type = ref()
const search = ref()
const page = ref(1)
const reset = ref(false)

const onSearch = (e: any) => {
  search.value = e
  onCallTable(props.id)
}

const onCallTable = async (id: number) => {
  const query = (type.value ?? table.searchType[0])
    .replace(/ /g, '_')
    .toLocaleLowerCase()

  const sort = (table.order + table.column ?? '' + table.column)
    .replace(/ /g, '_')
    .toLocaleLowerCase()

  // await api.table({
  //   row: rowCount.value ?? table.totalRows[0],
  //   [`filter[${query}]`]: search.value,
  //   page: page.value ?? '1',
  //   sort: sort,
  // })

  // const { data } = api.itemsOfBranchTableResponse.value
  // table.data = data
  // pagination.value = api.itemsOfBranchTableResponse.value

  await api.itemsOfBranchTable(id)
  const { data } = api.itemsOfBranchTableResponse.value
  console.log('DATA', data)
  table.data = data
}

const onHeaderEmit = (header: IHeader, index: number) => {}
// const data = computed(() => api.itemsOfBranchTableResponse.value)
// const isLoadState = computed(() => api.isModalLoading.value)
const isLoadState = computed(() => api.isModalLoading.value)
watchEffect(async () => {
  if (props.id > 0) {
    // await api.itemsOfBranchTable(props.id)
    onCallTable(props.id)
    console.log(props.id)
  }
})

onMounted(() => {
  // onCallTable()
})
</script>

<template>
  <table class="table is-striped is-fullwidth">
    <thead>
      <tr>
        <!-- <th scope="col" data-sortable="false">
          <VControl>
            <label class="checkbox is-primary is-outlined is-circle">
              <input
                id="head-checkbox"
                v-model="checkAll"
                :value="true"
                type="checkbox"
                @click="onCheckAll"
              />
              <span></span>
            </label>
          </VControl>
        </th> -->
        <template v-for="(header, index) in table.headers" :key="index">
          <th scope="col" @click="onHeaderEmit(header, index)">
            <div
              :class="{
                'dark-inverted is-flex is-justify-content-flex-end':
                  header.name === 'Action',
              }"
            >
              {{ header.name }}
            </div>
          </th>
        </template>
      </tr>
    </thead>
    <tbody v-if="table.data && table.data.length > 0 && isLoadState === false">
      <tr v-for="(row, index) in table.data" :key="index">
        <td>
          <span class="light-text">
            <VTag
              :color="row.details[0].is_active ? 'green' : 'danger'"
              :label="row.details[0].is_active ? 'Active' : 'Inactive'"
              rounded
            />
          </span>
        </td>
        <td>
          <span class="light-text">{{ row.name }}</span>
        </td>
        <td>
          <span class="light-text">{{ row.sku }}</span>
        </td>
        <td>
          <span class="light-text">{{ row.details[0].quantity }}</span>
        </td>
        <td>
          <span class="light-text">{{ row.details[0].quantity_warn }}</span>
        </td>
        <td>
          <span class="light-text">{{ row.details[0].price }}</span>
        </td>
        <td class="is-end">
          <div class="is-flex is-justify-content-flex-end">
            <GraphDropdown />
          </div>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="12">
          <VLoader
            size="large"
            class="project-preview-wrapper"
            :active="isLoadState"
            :lighter="true"
          >
            <VPlaceholderSection
              title="No data to show"
              subtitle="There is currently no data to show in this list."
            >
              <template #image>
                <img
                  class="light-image"
                  src="/@src/assets/illustrations/placeholders/search-4.svg"
                  alt=""
                />
                <img
                  class="dark-image"
                  src="/@src/assets/illustrations/placeholders/search-4-dark.svg"
                  alt=""
                />
              </template>
            </VPlaceholderSection>
          </VLoader>
        </td>
      </tr>
    </tbody>

    <!-- <tbody>
      <tr>
        <td>Tina</td>
        <td>Bergmann</td>
        <td>Head of Sales</td>
        <td class="is-end">
          <div class="is-flex is-justify-content-flex-end">
            <FlexTableDropdown />
          </div>
        </td>
      </tr>
      <tr>
        <td>John</td>
        <td>Wistmus</td>
        <td>Senior Executive</td>
        <td class="is-end">
          <div class="is-flex is-justify-content-flex-end">
            <FlexTableDropdown />
          </div>
        </td>
      </tr>
      <tr>
        <td>John</td>
        <td>Wistmus</td>
        <td>Senior Executive</td>
        <td class="is-end">
          <div class="is-flex is-justify-content-flex-end">
            <FlexTableDropdown />
          </div>
        </td>
      </tr>
      <tr>
        <td>John</td>
        <td>Wistmus</td>
        <td>Senior Executive</td>
        <td class="is-end">
          <div class="is-flex is-justify-content-flex-end">
            <FlexTableDropdown />
          </div>
        </td>
      </tr>
      <tr>
        <td>John</td>
        <td>Wistmus</td>
        <td>Senior Executive</td>
        <td class="is-end">
          <div class="is-flex is-justify-content-flex-end">
            <FlexTableDropdown />
          </div>
        </td>
      </tr>
      <tr>
        <td>John</td>
        <td>Wistmus</td>
        <td>Senior Executive</td>
        <td class="is-end">
          <div class="is-flex is-justify-content-flex-end">
            <FlexTableDropdown />
          </div>
        </td>
      </tr>
      <tr>
        <td>John</td>
        <td>Wistmus</td>
        <td>Senior Executive</td>
        <td class="is-end">
          <div class="is-flex is-justify-content-flex-end">
            <FlexTableDropdown />
          </div>
        </td>
      </tr>
      <tr>
        <td>Sam</td>
        <td>Watson</td>
        <td>Software Engineer</td>
        <td class="is-end">
          <div class="is-flex is-justify-content-flex-end">
            <FlexTableDropdown />
          </div>
        </td>
      </tr>
      <tr>
        <td>Jolaine</td>
        <td>Joestar</td>
        <td>HR Manager</td>
        <td class="is-end">
          <div class="is-flex is-justify-content-flex-end">
            <FlexTableDropdown />
          </div>
        </td>
      </tr>
      <tr>
        <td>Anders</td>
        <td>Jensen</td>
        <td>Accountant</td>
        <td class="is-end">
          <div class="is-flex is-justify-content-flex-end">
            <FlexTableDropdown />
          </div>
        </td>
      </tr>
    </tbody> -->
  </table>
</template>
