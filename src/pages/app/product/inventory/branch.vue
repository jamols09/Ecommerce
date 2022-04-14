<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useBranch } from '/@src/composable/api/useBranch'
import { pageTitle } from '/@src/state/sidebarLayoutState'
pageTitle.value = 'Items of Branches'

const api = useBranch()
const table = reactive({
  searchType: ['Name'],
  totalRows: [10, 15, 30, 50],
  headers: [
    { name: 'Active' },
    { name: 'Name' },
    // { name: 'Warn' },
    { name: 'Quantity' },
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
const branchDropdown = ref()
const branchId = ref()
const rows = table.totalRows.sort((a: number, b: number) => a - b)

const onSearch = (e: any) => {
  search.value = e
  // onCallTable()
}

const onChangePage = (e?: any) => {
  if (e.hasOwnProperty('select')) {
    page.value = e.select
  } else {
    e > 0 ? (page.value += 1) : (page.value -= 1)
  }
  reset.value = !reset.value
  // onCallTable()
}

const onRemove = async (e?: any) => {
  // await api.remove({ id: e })
  page.value = 1
  // onCallTable()
}

const onSort = (e?: any) => {
  table.order = table.order === '' ? '-' : ''
  table.column = e?.toLocaleLowerCase().replace(/ /g, '_')
}

const onCallTable = async () => {
  const query = (type.value ?? table.searchType[0])
    .replace(/ /g, '_')
    .toLocaleLowerCase()

  const sort = (table.order + table.column ?? '' + table.column)
    .replace(/ /g, '_')
    .toLocaleLowerCase()

  await api.itemsOfBranchTable(branchId.value, {
    row: rowCount.value ?? table.totalRows[0],
    [`filter[${query}]`]: search.value,
    page: page.value ?? '1',
    sort: sort,
  })

  const { data } = api.itemsOfBranchTableResponse.value
  table.data = data
  pagination.value = api.itemsOfBranchTableResponse.value
}

const onCallBranch = async () => {
  await api.dropdown()
  branchDropdown.value = api.dropdownResponse.value
}

const onSetStatus = (data: { id: number; is_active: number }) => {
  api.updateItemOfBranch(data.id, { is_active: data.is_active })
  onCallTable()
}

const onEmittedValues = (data: { id: number; row: number }) => {
  branchId.value = data.id
  rowCount.value = data.row
  onCallTable()
}

onMounted(() => {
  onCallBranch()
})
</script>

<template>
  <div>
    <ItemPerBranchTable
      :total-rows="rows"
      :branch="branchDropdown"
      :headers="table.headers"
      :data="table.data"
      :search-type="table.searchType"
      :is-loading="api.isLoading.value"
      :reset-checked="reset"
      @remove="onRemove($event)"
      @type="type = $event"
      @search="onSearch"
      @sort="onSort"
      @dropdown-values="onEmittedValues($event)"
      @status="onSetStatus($event)"
    >
      <VBasicPagination
        :is-loading="api.isLoading.value"
        :pagination="pagination"
        @change="onChangePage"
        @set-link="onChangePage({ select: $event })"
      />
    </ItemPerBranchTable>
  </div>
</template>
