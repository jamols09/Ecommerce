<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { pageTitle, sidebarTheme } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Maps'
</script>

<template>
  <MapsDashboard reversed />
</template>
