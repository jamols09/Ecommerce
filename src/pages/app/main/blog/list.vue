<script setup lang="ts">
import { ref } from 'vue'
import { datatableV1 } from '/@src/data/layouts/datatable-v1'
import { datatableBlogList } from '/@src/custom-data/blog/datatable-list'
import { pageTitle } from '/@src/state/sidebarLayoutState'
pageTitle.value = 'List Blog'
</script>

<template>
  <div class="page-content-inner">
    <V-SimpleDatatables :options="datatableBlogList" />
  </div>
</template>
