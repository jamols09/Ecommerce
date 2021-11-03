<script setup lang="ts">
import { computed, ref } from 'vue'

interface IPageLinks {
  url: string
  label: string
  active: boolean
}

interface IPaginationProps {
  total: number
  current: number
  from: number
  to: number
  nextPageUrl: string | null
  prevPageUrl: string | null
  isLoading: boolean
  links: Array<IPageLinks>
}
const props = withDefaults(defineProps<IPaginationProps>(), {
  current: 0,
  from: 0,
  to: 0,
  total: 0,
  isLoading: false,
})
const linksList = computed(() => {
  if (props.links.length > 1) {
    return props.links.slice(1, -1)
  } else {
    return props.links
  }
})
const isLoadState = computed(() => props.isLoading)
const emit = defineEmits(['next', 'prev', 'setLink'])
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
    <ul class="pagination-list">
      <li v-for="page in linksList" :key="page.label">
        <a
          class="pagination-link"
          :aria-current="current === +page.label ? 'page' : undefined"
          :class="[current === +page.label && 'is-current']"
          @click="
            isLoadState === false && current !== +page.label
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
