<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useUser } from '/@src/composable/api/useUser'
import { pageTitle } from '/@src/state/sidebarLayoutState'
pageTitle.value = 'List of Employee'

const api = useUser()
const table = reactive({
  searchType: ['Username', 'Created At'],
  totalRows: [10, 15, 30, 50],
  headers: [
    { name: '', sortable: false },
    { name: 'Active', sortable: false },
    { name: 'Username', sortable: true },
    { name: 'First Name', sortable: true },
    { name: 'Middle Name', sortable: false },
    { name: 'Last Name', sortable: false },
    { name: 'Email', sortable: false },
    { name: 'Created At', sortable: false },
    { name: 'Action', sortable: false },
  ],
  data: [],
  order: '',
  column: '',
})

const pagination = ref({
  total: 0,
  current_page: 0,
  from: 0,
  to: 0,
  next_page_url: '',
  prev_page_url: '',
  links: [],
})

const rowCount = ref()
const type = ref()
const search = ref()
const page = ref(1)
const reset = ref(false)
const onSearch = (e: any) => {
  search.value = e
  onCallTable()
}

const onChangePage = (e?: any) => {
  if (e.hasOwnProperty('select')) {
    page.value = e.select
  } else {
    e > 0 ? (page.value += 1) : (page.value -= 1)
  }
  reset.value = !reset.value
  onCallTable()
}

const onRemove = async (e?: any) => {
  await api.remove({ id: e })
  page.value = 1
  onCallTable()
}

const onSort = (e: string) => {
  table.order = table.order === '' ? '-' : ''
  table.column = e?.toLocaleLowerCase().replace(/ /g, '_')
  onCallTable()
}

const onSetStatus = async (e: any, a?: string) => {
  await api.status({ id: e, status: a })
  page.value = 1
  onCallTable()
}

const onCallTable = async () => {
  const query = (type.value ?? table.searchType[0])
    .replace(/ /g, '_')
    .toLocaleLowerCase()

  const sort = (table.order + table.column ?? '' + table.column)
    .replace(/ /g, '_')
    .toLocaleLowerCase()

  await api.table({
    row: rowCount.value ?? table.totalRows[0],
    [`filter[${query}]`]: search.value,
    [`filter[account]`]: 'admin',
    page: page.value ?? '1',
    sort: sort,
  })
  const { body } = api.tableResponse.value
  table.data = body.data
  pagination.value = body //reactive() Object.assign(pagination, body)
}
onMounted(() => onCallTable())
</script>

<template>
  <div>
    <EmployeeTable
      :total-rows="
        table.totalRows.sort(function (a, b) {
          return a - b
        })
      "
      :headers="table.headers"
      :data="table.data"
      :search-type="table.searchType"
      :is-loading="api.isLoading.value"
      :reset-checked="reset"
      @activate="onSetStatus($event, 'activate')"
      @remove="onRemove($event)"
      @deactivate="onSetStatus($event, 'deactivate')"
      @rowCount="rowCount = $event"
      @type="type = $event"
      @search="onSearch"
      @sort="onSort"
    >
      <VBasicPagination
        :is-loading="api.isLoading.value"
        :pagination="pagination"
        @change="onChangePage"
        @set-link="onChangePage({ select: $event })"
      />
    </EmployeeTable>
  </div>
</template>
