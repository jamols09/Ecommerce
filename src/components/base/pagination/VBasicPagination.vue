<script setup lang="ts">
import { computed, ref } from 'vue'

interface IPaginationProps {
  total: number
  current: number
  from: number
  to: number
  firstPageUrl: string | null
  lastPageUrl: string | null
  nextPageUrl: string | null
  prevPageUrl: string | null
  isLoading: boolean
}
const props = withDefaults(defineProps<IPaginationProps>(), {
  current: 0,
  from: 0,
  to: 0,
  total: 0,
  isLoading: false,
})
const isLoadState = computed(() => props.isLoading)
const emit = defineEmits(['next', 'prev'])
</script>

<template>
  <div class="dataTable-info">
    Showing {{ props.from }} to {{ props.to }} of {{ props.total }} result
  </div>
  <nav
    class="flex-pagination pagination is-rounded"
    role="navigation"
    aria-label="pagination"
    data-filter-hide
  >
    <!-- Previous Btn -->
    <a
      v-if="props.prevPageUrl"
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
      v-if="props.nextPageUrl"
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
    <ul class="pagination-list"></ul>
  </nav>
</template>
