<script setup lang="ts">
import { computed } from 'vue'

interface IPagination {
  total: number
  current_page: number
  from: number
  to: number
  next_page_url: string
  prev_page_url: string
  links: any
}
;``
interface IPaginationProps {
  isLoading: boolean
  pagination: IPagination
}
const props = withDefaults(defineProps<IPaginationProps>(), {
  isLoading: false,
})
const linksList = computed(() => {
  if (props.pagination.links.length > 1) {
    return props.pagination.links.slice(1, -1)
  } else {
    return props.pagination.links
  }
})
const isLoadState = computed(() => props.isLoading)
const emit = defineEmits(['next', 'prev', 'setLink'])
</script>

<template>
  <div class="dataTable-info">
    Showing {{ props.pagination.from }} to {{ props.pagination.to }} of
    {{ props.pagination.total }} result
  </div>
  <nav
    class="flex-pagination pagination is-rounded"
    role="navigation"
    aria-label="pagination"
    data-filter-hide
  >
    <!-- Previous Btn -->
    <a
      v-if="props.pagination.next_page_url"
      class="pagination-previous has-chevron"
      @click="isLoadState === false ? emit('prev', -1) : false"
    >
      <i
        aria-hidden="true"
        class="iconify"
        data-icon="feather:chevron-left"
      ></i>
    </a>
    <!-- Next Btn -->
    <a
      v-if="props.pagination.prev_page_url"
      :disable="isLoadState"
      class="pagination-next has-chevron"
      @click="isLoadState === false ? emit('prev', 1) : false"
    >
      <i
        aria-hidden="true"
        class="iconify"
        data-icon="feather:chevron-right"
      ></i>
    </a>
    <!-- Pages -->
    <ul class="pagination-list">
      <li v-for="page in linksList" :key="page.label">
        <a
          class="pagination-link"
          :aria-current="
            pagination.current_page === +page.label ? 'page' : undefined
          "
          :class="[pagination.current_page === +page.label && 'is-current']"
          @click="
            isLoadState === false && pagination.current_page !== +page.label
              ? emit('setLink', +page.label)
              : false
          "
        >
          {{ page.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>
