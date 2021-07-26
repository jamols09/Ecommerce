<template>
  <template v-for="(menuItem, index) in settingList" :key="index">
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon :name="menuItem.icon" :color="menuItem.color" />
      </q-item-section>
      <q-item-section class="text-grey">
        {{ menuItem.label }}
      </q-item-section>
    </q-item>
  </template>
</template>

<script>
const settingList = [
  {
    icon: "settings",
    label: "Account",
    color: "blue-grey",
  },
];

import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      settingList,
    };
  },
});
</script>
