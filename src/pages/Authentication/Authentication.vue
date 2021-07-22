<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <!-- <Login /> -->
        <Register />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import Login from "src/components/Authentication/Login.vue";
import Register from "src/components/Authentication/Register.vue";

export default defineComponent({
  components: {
    // Login,
    Register,
  },
  setup() {
    return {};
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
