<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import { useCategory } from '/@src/composable/api/useCategory'
import { pageTitle } from '/@src/state/sidebarLayoutState'
pageTitle.value = 'List Category'

const api = useCategory()
const table = reactive({
  searchType: ['Name', 'Created At'],
  totalRows: [10, 15, 30, 50],
  headers: [
    { name: 'Name', sortable: true },
    { name: 'Parent', sortable: true },
    { name: 'Created At', sortable: false },
    { name: 'Action', sortable: false },
  ],
  data: [],
  order: 'asc',
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
const onSearch = (e: any) => {
  search.value = e
  calltable()
}

const onChangePage = (e?: any) => {
  if (e.hasOwnProperty('select')) {
    page.value = e.select
  } else {
    e > 0 ? (page.value += 1) : (page.value -= 1)
  }
  calltable()
}

const onSort = (e?: any) => {
  table.order = table.order === 'asc' ? 'desc' : 'asc'
  table.column = encodeURIComponent(e)
  calltable()
}

const onRemove = async (e: any) => {
  await api.remove({ id: e })
  page.value = 1
  calltable()
}

const calltable = async () => {
  await api.table({
    page: page.value ?? '1',
    row: rowCount.value ?? table.totalRows[0],
    query: search.value ?? '',
    type: type.value ?? table.searchType[0],
    column: table.column ?? '',
    order: table.order ?? '',
  })
  const { body } = api.tableResponse.value
  table.data = body.data
  pagination.value = body //reactive() Object.assign(pagination, body)
}

watchEffect(async () => {
  await api.table({
    page: (page.value = 1),
    row: rowCount.value ?? table.totalRows[0],
    query: '',
    type: table.searchType[0],
    column: '',
    order: '',
  })
  const { body } = api.tableResponse.value
  table.data = body.data
  pagination.value = body //reactive() Object.assign(pagination, body)
})
</script>

<template>
  <div>
    <CategoryTable
      :total-rows="
        table.totalRows.sort(function (a, b) {
          return a - b
        })
      "
      :headers="table.headers"
      :data="table.data"
      :search-type="table.searchType"
      :is-loading="api.isLoading.value"
      :reset-checked="false"
      @remove="onRemove"
      @rowCount="rowCount = $event"
      @type="type = $event"
      @search="onSearch"
      @sort="onSort"
    >
      <VBasicPagination
        :is-loading="api.isLoading.value"
        :pagination="pagination"
        @next="onChangePage"
        @prev="onChangePage"
        @set-link="onChangePage({ select: $event })"
      />
    </CategoryTable>
  </div>
</template>
