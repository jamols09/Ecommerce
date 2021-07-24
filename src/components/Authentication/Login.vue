<template>
  <!-- <div
          id="particles-js"
          :class="$q.dark.isActive ? 'dark_gradient' : 'normal_gradient'"
        ></div> -->
  <q-btn
    color="white"
    class="absolute-top-right"
    flat
    round
    @click="$q.dark.toggle()"
    :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
  />
  <q-card
    class="login-form q-pa-sm q-pr-xl q-pl-xl"
    v-bind:style="$q.platform.is.mobile ? { width: '80%' } : { width: '20%' }"
  >
    <!-- <q-img src="/statics/images/pharmacy.jpg"></q-img> -->

    <q-card-section>
      <q-avatar size="74px">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>
    </q-card-section>
    <q-card-section>
      <div class="row no-wrap items-center">
        <div class="col text-h4 ellipsis green-text text-bold">Log in</div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-form class="q-gutter-lg">
        <q-input
          type="email"
          v-model="form.email"
          label="Email"
          lazy-rules
          outlined
        >
          <template v-slot:prepend>
            <q-icon name="mail_outline" color="light-green-4" />
          </template>
        </q-input>

        <q-input
          type="password"
          v-model="form.password"
          label="Password"
          lazy-rules
          outlined
        >
          <template v-slot:prepend>
            <q-icon name="lock_outline" color="light-green-4" />
          </template>
        </q-input>
        <div>
          <a
            href="#"
            target="_blank"
            title="Forgot Password"
            class="forgot-pass-field"
          >
            <b> Forgot Password? </b>
          </a>
        </div>
        <div>
          <q-btn
            label="Login"
            type="button"
            color="light-green-5"
            unelevated
            @click="submit"
          />

          <a
            style="font-size: 30px"
            class="float-right"
            href="https://github.com/sponsors/mayank091193"
            target="_blank"
            title="Donate"
            ><i class="fas fa-heart" style="color: #eb5daa"></i
          ></a>
        </div>
        <div>
          Don't have an account yet?
          <a href="" title="Create new account" @click.prevent="page">
            <b> Sign-up here! </b></a
          >
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const $store = useStore();
    const form = reactive({
      email: "",
      password: "",
    });

    const page = () => {
      $store.dispatch("authentication/SET_PAGE_TYPE_ACTION", "register");
    };

    const submit = () => {
      $store.dispatch("authentication/SEND_LOGIN_FORM", form);
    };

    return {
      form,
      page,
      submit,
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
