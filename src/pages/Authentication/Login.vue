<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
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
          v-bind:style="
            $q.platform.is.mobile ? { width: '80%' } : { width: '30%' }
          "
        >
          <!-- <q-img src="/statics/images/pharmacy.jpg"></q-img> -->
          <!-- <q-avatar
            size="74px"
            class="absolute"
            style="top: 30%; left: 25px; transform: translateY(-50%)"
          >
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar> -->
          <q-card-section>
            <div class="row no-wrap items-center">
              <div class="col text-h4 ellipsis green-text text-bold">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-lg">
              <q-input v-model="username" label="Email" lazy-rules outlined />

              <q-input
                type="password"
                v-model="password"
                label="Password"
                lazy-rules
                outlined
              />
              <div>
                <a
                  href=""
                  target="_blank"
                  title="Forgot Password"
                  class="forgot-pass-field"
                >
                  Forgot Password?
                </a>
              </div>
              <div>
                <q-btn
                  label="Login"
                  type="button"
                  color="light-green-5"
                  unelevated
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
              <div>Don't have an account yet? <a href="">Sign-up here!</a></div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  setup() {
    const $q = useQuasar();
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
