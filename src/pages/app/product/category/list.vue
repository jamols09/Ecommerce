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
})

const pagination = ref({
  total: 0,
  current_page: 0,
  from: 0,
  to: 0,
  last_page_url: '',
  next_page_url: '',
  first_page_url: '',
  prev_page_url: '',
})

const rowCount = ref()
const type = ref()
const search = ref()
const page = ref(1)
const onSearch = (e: any) => {
  search.value = e
  calltable()
}

const onChangePage = (e: any) => {
  e > 0 ? (page.value += 1) : (page.value -= 1)
  calltable()
}

const calltable = async () => {
  await api.table({
    page: page.value ?? '1',
    row: rowCount.value ?? table.totalRows[0],
    query: search.value ?? '',
    type: type.value ?? table.searchType[0],
  })
  const { body } = api.tableResponse.value
  table.data = body.data
  //pagination
  pagination.value = body //Object.assign(pagination, body)
}

watchEffect(async () => {
  await api.table({
    page: (page.value = 1),
    row: rowCount.value ?? table.totalRows[0],
    query: '',
    type: type.value ?? table.searchType[0],
  })
  const { body } = api.tableResponse.value
  table.data = body.data
  //pagination
  pagination.value = body //reactive()Object.assign(pagination, body)
})
</script>

<template>
  <div>
    <CategoryTable
      :total-rows="table.totalRows.sort()"
      :headers="table.headers"
      :data="table.data"
      :search-type="table.searchType"
      :is-loading="api.isLoading.value"
      @rowCount="rowCount = $event"
      @type="type = $event"
      @search="onSearch"
    >
      <VBasicPagination
        :total="pagination.total"
        :current="pagination.current_page"
        :from="pagination.from"
        :to="pagination.to"
        :first-page-url="pagination.first_page_url"
        :last-page-url="pagination.last_page_url"
        :next-page-url="pagination.next_page_url"
        :prev-page-url="pagination.prev_page_url"
        :is-loading="api.isLoading.value"
        @next="onChangePage"
        @prev="onChangePage"
      />
    </CategoryTable>
  </div>
</template>
