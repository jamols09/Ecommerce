<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <Login />
        <Register />
        <component :is="page" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, computed, onMounted } from "vue";
import Login from "src/components/Authentication/Login.vue";
import Register from "src/components/Authentication/Register.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Login,
    Register,
    // Login: () => import("src/components/Authentication/Login.vue"),
    // Register: () => import("src/components/Authentication/Register.vue"),
  },
  setup() {
    const $store = useStore();
    const page = computed(() => {
      console.log($store.getters["GET_PAGE_TYPE"]);
      return $store.getters["GET_PAGE_TYPE"];
    });
    // onMounted(() => {
    //   console.log($store.getters["GET_PAGE_TYPE"]);
    // })

    return {
      page,
    };
  },
});
</script>

<style scoped>
a {
  color: #b7cb79;
}
.green-text {
  color: rgb(146 157 99);
}
</style>
