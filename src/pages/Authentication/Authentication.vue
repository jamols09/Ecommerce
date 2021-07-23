<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <component :is="page" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, defineAsyncComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const $store = useStore();
    const login = defineAsyncComponent(() =>
      import("src/components/Authentication/Login.vue")
    );
    const register = defineAsyncComponent(() =>
      import("src/components/Authentication/Register.vue")
    );

    const page = computed(() => {
      return $store.getters["authentication/GET_PAGE_TYPE"] === ""
        ? login
        : $store.getters["authentication/GET_PAGE_TYPE"] === "register"
        ? register
        : login;
    });

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
