<script setup lang="ts">
import { ref } from 'vue'

interface IPaginationProps {
  total: number
  current: number
  from: number
  to: number
  firstPageUrl: string | null
  lastPageUrl: string | null
  nextPageUrl: string | null
  prevPageUrl: string | null
}
const props = withDefaults(defineProps<IPaginationProps>(), {
  current: 0,
  from: 0,
  to: 0,
  total: 0,
})

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
    <!-- 
      <li class="active"><a href="#" data-page="1">1</a></li>
      <li class=""><a href="#" data-page="2">2</a></li>
      <li class="pager"><a href="#" data-page="2">›</a></li> 
    -->

    <!-- Previous Btn -->
    <a
      v-if="props.prevPageUrl"
      class="pagination-previous has-chevron"
      @click="emit('prev', -1)"
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
      class="pagination-next has-chevron"
      @click="emit('next', 1)"
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
