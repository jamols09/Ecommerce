<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import useNotyf from '/@src/composable/useNotyf'

import { isDark } from '/@src/state/darkModeState'
import sleep from '/@src/utils/sleep'

const router = useRouter()
const notif = useNotyf()
const isLoading = ref(false)

const handleSignup = async () => {
  if (!isLoading.value) {
    isLoading.value = true
    sleep(2000)
    notif.success('Welcome, Erik Kovalsky')
    router.push({ name: 'sidebar-dashboards' })
    isLoading.value = false
  }
}

useHead({
  title: 'StoreYehey - Sign up',
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
          <form @submit.prevent="handleSignup">
            <!--Form Title-->
            <div class="auth-head">
              <h2>Want to manage your store easily?</h2>
              <br />
              <p>Start by creating new account</p>
            </div>

            <div class="login-form">
              <!-- Input -->
              <V-Field>
                <V-Control icon="feather:mail">
                  <input
                    class="input"
                    type="text"
                    placeholder="Email Address"
                    autocomplete="off"
                  />
                </V-Control>
              </V-Field>
              <!-- Input -->
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
              <!-- Input -->
              <V-Field>
                <V-Control icon="feather:lock">
                  <input
                    class="input"
                    type="password"
                    placeholder="Repeat Password"
                  />
                </V-Control>
              </V-Field>

              <!-- Submit -->
              <V-Field>
                <V-Control class="login">
                  <V-Button color="primary" bold fullwidth raised>
                    Sign Up
                  </V-Button>
                </V-Control>
              </V-Field>
              <!-- Redirect -->
              <V-Field class="forgot-link">
                <small>
                  Already have an account?
                  <RouterLink :to="{ name: 'auth-login' }">
                    <u>Login here!</u>
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
