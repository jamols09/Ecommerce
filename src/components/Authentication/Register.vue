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
      v-bind:class="
        $q.platform.is.mobile
          ? 'q-pa-sm q-px-md mobile'
          : 'q-pa-sm q-px-md desktop'
      "
      key="1"
    >
      <q-card-section>
        <img :src="icon" />
      </q-card-section>
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h5 ellipsis green-text text-bold">
            Create an account
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md" @submit="submit">
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
          <q-input
            type="password"
            v-model="form.confirm_password"
            label="Confirm Password"
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
              href=""
              target="_blank"
              title="Forgot Password"
              class="forgot-pass-field"
            >
              <b> Forgot Password? </b>
            </a>
          </div>
          <div>
            <q-btn
              label="Create Account"
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
            Already have an account?
            <a href="" title="Sign-in your account" @click.prevent="page">
              <b> Log-in </b></a
            >
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </transition-group>
  <modal-slot v-if="modal">
    <template v-slot:header>&nbsp;</template>
    <template v-slot:icon
      ><q-btn icon="close" flat round dense @click="close"
    /></template>
    <template v-slot:message>
      A verification link was sent to your email address. Please verify email to
      get started.
    </template>
    <template v-slot:button>
      <q-btn
        label="Re-send Link"
        size="14px"
        color="light-green-4"
        v-close-popup
        @click="resend"
      />
    </template>
  </modal-slot>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import ModalSlot from "src/components-global/ModalSlot.vue";
import icon from "src/assets/cart60x60.png";

export default defineComponent({
  components: {
    ModalSlot,
  },
  setup() {
    const $store = useStore();
    const modal = ref(false);
    const cooldown = ref(15);
    const form = reactive({
      email: "",
      password: "",
      confirm_password: "",
    });

    const page = () => {
      $store.dispatch("authentication/SET_PAGE_TYPE_ACTION", "login");
    };

    const submit = async () => {
      let data = await $store.dispatch(
        "authentication/SEND_REGISTRATION_FORM",
        form
      );
      modal.value = true;
    };

    const close = () => {
      modal.value = false;
    };

    const resend = () => {
      // alert("Resend");
      modal.value = false;
    };

    return {
      form,
      page,
      submit,
      resend,
      modal,
      close,
      icon,
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
/* Custom, iPhone Retina */
@media only screen and (min-width: 320px) {
  .desktop {
    width: 100%;
  }
}

/* Extra Small Devices, Phones */
@media only screen and (min-width: 480px) {
  .desktop {
    width: 80%;
  }
}

/* Small Devices, Tablets */
@media only screen and (min-width: 768px) {
  .desktop {
    width: 45%;
  }
}

/* Medium Devices, Desktops */
@media only screen and (min-width: 992px) {
  .desktop {
    width: 40%;
  }
}

/* Large Devices, Wide Screens */
@media only screen and (min-width: 1200px) {
  .desktop {
    width: 20%;
  }
}
</style>
