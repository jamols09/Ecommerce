<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { isDark } from '/@src/state/darkModeState'
import useUserSession from '/@src/composable/useUserSession'
import useNotyf from '/@src/composable/useNotyf'
import sleep from '/@src/utils/sleep'
import { useAuth } from '/@src/composable/api/useAuth'

const notyf = useNotyf()
const api = useAuth()
const isLoading = ref(false)
const router = useRouter()
const userSession = useUserSession()
const form = reactive({
  email: '',
  password: '',
})

const handleLogin = async () => {
  isLoading.value = true

  await api.signIn(form)
  await sleep(300)
  await api.getUser()

  if (
    api.signInResponse.value?.id !== undefined ||
    api.loggedInResponse.value?.id !== undefined
  ) {
    notyf.success(`Welcome <b>${api.signInResponse.value?.username}</b>`)
    isLoading.value = false
    router.push({ name: 'app' })
  } else {
    notyf.error('Invalid credentials')
  }

  isLoading.value = false
}

onMounted(() => {
  api.getCookie()
})

useHead({
  title: 'StoreYehey - Login',
})
</script>

<template>
  <div class="auth-wrapper-inner is-single">
    <!--Fake navigation-->
    <div class="auth-nav">
      <div class="left"></div>
      <div class="center">
        <RouterLink :to="{ name: 'index' }" class="header-item">
          <AnimatedLogo width="38px" height="38px" />
        </RouterLink>
      </div>
      <div class="right">
        <label class="dark-mode ml-auto">
          <input
            type="checkbox"
            :checked="!isDark"
            @change="
              (event) => {
                isDark = !event.target.checked
              }
            "
          />
          <span></span>
        </label>
      </div>
    </div>

    <!--Single Centered Form-->
    <div class="single-form-wrap">
      <div class="inner-wrap">
        <!--Form-->
        <div class="form-card">
          <form @submit.prevent="handleLogin">
            <div class="login-form">
              <!--Form Title-->
              <div class="auth-head">
                <h2>Welcome!</h2>
                <br />
                <p>Start managing your business now!</p>
              </div>

              <V-Field>
                <V-Control icon="feather:mail">
                  <input
                    v-model="form.email"
                    class="input"
                    type="email"
                    placeholder="Email"
                    autocomplete="off"
                  />
                </V-Control>
              </V-Field>
              <V-Field>
                <V-Control icon="feather:lock">
                  <input
                    v-model="form.password"
                    class="input"
                    type="password"
                    placeholder="Password"
                    autocomplete="off"
                  />
                </V-Control>
              </V-Field>
              <!-- Redirect -->
              <V-Field class="forgot-link">
                <small>
                  <RouterLink :to="{ name: 'auth-login' }">
                    <u>Forgot password?</u>
                  </RouterLink>
                </small>
              </V-Field>

              <!-- Submit -->
              <V-Field>
                <V-Control class="login">
                  <V-Button
                    :loading="isLoading"
                    type="submit"
                    color="primary"
                    bold
                    fullwidth
                    raised
                    >Sign In</V-Button
                  >
                </V-Control>
              </V-Field>
              <!-- Redirect -->
              <V-Field class="forgot-link">
                <small class="dark-inverted">
                  Don't have account yet?
                  <RouterLink :to="{ name: 'auth-signup' }">
                    <u>Sign-up here!</u>
                  </RouterLink>
                </small>
              </V-Field>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
