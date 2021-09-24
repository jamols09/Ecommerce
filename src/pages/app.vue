<route lang="yaml">
meta:
  requiresAuth: true
</route>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

useHead({
  title: 'StoreYahey',
})

const nowrapRoutes: Array<string> = ['/app/delivery/map']
const route = useRoute()
</script>

<template>
  <AppLayout :nowrap="nowrapRoutes.includes(route.fullPath)" close-on-change>
    <!-- Content Wrapper -->
    <RouterView v-slot="{ Component }">
      <transition name="fade-fast" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </RouterView>
  </AppLayout>
</template>
