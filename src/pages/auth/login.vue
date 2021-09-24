<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

import { isDark } from '/@src/state/darkModeState'
import useUserSession from '/@src/composable/useUserSession'
import useNotyf from '/@src/composable/useNotyf'
import sleep from '/@src/utils/sleep'

const isLoading = ref(false)
const router = useRouter()
const route = useRoute()
const notif = useNotyf()
const userSession = useUserSession()
const redirect = route.query.redirect as string

const handleLogin = async () => {
  if (!isLoading.value) {
    isLoading.value = true

    await sleep(2000)
    userSession.token = 'logged-in'
    notif.success('Welcome back, Erik Kovalsky')

    if (redirect) {
      router.push(redirect)
    } else {
      router.push({
        name: 'app',
      })
    }

    isLoading.value = false
  }
}

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
              (event: Event) => {
                const el = event.target as HTMLInputElement
                isDark = el.checked
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
