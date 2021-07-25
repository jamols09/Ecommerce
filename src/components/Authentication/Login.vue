<template>
  <!-- <div
          id="particles-js"
          :class="$q.dark.isActive ? 'dark_gradient' : 'normal_gradient'"
        ></div> -->
  <transition-group appear enter-active-class="animated zoomIn" :duration="500">
    <q-btn
      color="white"
      class="absolute-top-right"
      flat
      round
      @click="$q.dark.toggle()"
      :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
      key="0"
    />
    <q-card
      class="login-form q-pa-sm q-pr-xl q-pl-xl"
      v-bind:class="$q.platform.is.mobile ? 'col-xs-12 col-sm-12 col-md-6' : 'col-xs-12' "
      key="1"
    >
      <q-card-section>
        <!-- <q-avatar size="74px"> -->
          <img :src="icon" />
        <!-- </q-avatar> -->
      </q-card-section>
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h5 ellipsis green-text text-bold">Log in</div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-lg" @submit="submit">
          <q-input
            type="email"
            v-model="form.email"
            label="Email"
            lazy-rules="ondemand"
            outlined
            :rules="[(val) => !!val || '* Required']"
          >
            <template v-slot:prepend>
              <q-icon name="mail_outline" color="light-green-4" />
            </template>
          </q-input>

          <q-input
            type="password"
            v-model="form.password"
            label="Password"
            lazy-rules="ondemand"
            outlined
            :rules="[(val) => !!val || '* Required']"
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
              type="submit"
              color="light-green-5"
              unelevated
              class="q-pa-sm"
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
  </transition-group>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import icon from "src/assets/cart60x60.png";

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
      icon
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
