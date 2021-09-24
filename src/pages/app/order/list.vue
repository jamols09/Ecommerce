<script setup lang="ts">
import { ref } from 'vue'
import { pageTitle } from '/@src/state/sidebarLayoutState'
pageTitle.value = 'List Order'
</script>

<template>
  <div><DatatableV1 /></div>
</template>
