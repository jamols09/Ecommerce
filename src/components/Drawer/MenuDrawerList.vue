<template>
  <template v-for="(menuItem, index) in menuList" :key="index">
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon :name="menuItem.icon" :color="menuItem.color" />
      </q-item-section>
      <q-item-section class="text-black">
        {{ menuItem.label }}
      </q-item-section>
    </q-item>
  </template>
</template>

<script>
const menuList = [
  {
    icon: "home",
    label: "Dashboard",
    color: "blue-grey",
  },
  {
    icon: "attach_money",
    label: "Orders",
    color: "blue-grey",
  },
  {
    icon: "inventory_2",
    label: "Products",
    color: "blue-grey",
  },
  {
    icon: "person",
    label: "Customers",
    color: "blue-grey",
  },
  {
    icon: "account_box",
    label: "Employee",
    color: "blue-grey",
  },
  {
    icon: "pie_chart",
    label: "Statistics",
    color: "blue-grey",
  },
  {
    icon: "local_offer",
    label: "Promos",
    color: "blue-grey",
  },
  {
    icon: "local_shipping",
    label: "Shipping",
    color: "blue-grey",
  },
];

import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      menuList,
    };
  },
});
</script>
