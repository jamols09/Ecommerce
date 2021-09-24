<script setup lang="ts">
const props = withDefaults(
  defineProps<{ debugst?: any; debugnd?: any; debugrd?: any }>(),
  {
    debugst: undefined,
    debugnd: undefined,
    debugrd: undefined,
  }
)
</script>
<template>
  <div
    v-show="debugst || debugnd || debugrd"
    class="demo-code-wrapper column is-12"
  >
    <div class="demo-state">
      <pre>{{ props.debugst }} {{ props.debugnd }} {{ props.debugrd }}</pre>
    </div>
  </div>
</template>
