<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Create Customer'

const route = useRoute()
const isActive = ref([])
const isVerified = ref([])
const firstname = ref('')
const middlename = ref('')
const lastname = ref('')
const birthdate = ref('')

const headerName = computed((): string => {
  const name = route.fullPath.split('/').slice(-2, -1)[0] // get 2nd to the last index -2, -1
  return name.charAt(0).toUpperCase() + name.slice(1)
})
</script>

<template>
  <div class="page-content-inner">
    <div class="form-layout is-stacked">
      <div class="form-outer">
        <div class="form-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>{{ headerName }}</h3>
            </div>
          </div>
        </div>
        <div class="form-body">
          <div v-show="false" class="form-section">
            <!-- Address -->
            <div class="fieldset-heading mb-5">
              <h4
                class="has-text-weight-semibold"
                style="font-family: Montserrat, sans-serif"
              >
                Address
              </h4>
            </div>
            <div class="columns is-multiline">
              <!-- Address Table -->
              <div class="column is-12">
                <table class="table is-striped is-fullwidth">
                  <thead>
                    <tr>
                      <th scope="col">Current</th>
                      <th scope="col">Country</th>
                      <th scope="col">Region / State</th>
                      <th scope="col">City</th>
                      <th scope="col">Street</th>
                      <th>Building Flr. etc</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="has-text-centered">&#10003;</td>
                      <td>Philippines</td>
                      <td>Davao del Sur</td>
                      <td>Davao City</td>
                      <td>748 Watusi St.</td>
                      <td>5th Flr</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Philippines</td>
                      <td>Davao del Sur</td>
                      <td>Davao City</td>
                      <td>748 Watusi St.</td>
                      <td>5th Flr</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="form-section is-grey">
            <!-- 
              <div class="demo-code-wrapper">
                <div class="demo-state">
                  <pre> {{isActive}} </pre>
                </div>
              </div>
            -->
            <!-- Is Active -->
            <div class="columns is-multiline">
              <div class="column is-12">
                <V-Field>
                  <V-Control>
                    <V-Checkbox
                      v-model="isActive"
                      value="active"
                      label="Active"
                      color="info"
                    />
                    <V-Checkbox
                      v-model="isVerified"
                      value="isVerified"
                      label="Verified"
                      color="info"
                      :disabled="true"
                      checked
                    />
                    <VueTooltip
                      label="Determine when account is verified."
                      abbreviation
                      :multiline="true"
                      size="is-small"
                      class="light-text mr-3"
                      position="is-bottom"
                    >
                      <b>?</b>
                    </VueTooltip>
                  </V-Control>
                </V-Field>
              </div>
            </div>
            <!-- Basic Details -->
            <div class="fieldset-heading mb-5">
              <h4
                class="has-text-weight-semibold"
                style="font-family: Montserrat, sans-serif"
              >
                Basic details
              </h4>
            </div>
            <div class="columns is-multiline">
              <!-- First name -->
              <div class="column is-4">
                <V-Field>
                  <label>First Name</label>
                  <V-Control icon="feather:user">
                    <input
                      v-model="firstname"
                      type="text"
                      class="input is-info-focus"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Middle name -->
              <div class="column is-4">
                <V-Field>
                  <label>Middle Name</label>
                  <V-Control icon="feather:user">
                    <input
                      v-model="middlename"
                      type="text"
                      class="input is-info-focus"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Last name -->
              <div class="column is-4">
                <V-Field>
                  <label>Last Name</label>
                  <V-Control icon="feather:user">
                    <input
                      v-model="lastname"
                      type="text"
                      class="input is-info-focus"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Birthdate -->
              <div class="column is-6">
                <v-date-picker v-model="birthdate" color="info" trim-weeks>
                  <template #default="{ inputValue, inputEvents }">
                    <V-Field>
                      <label>Birthdate</label>
                      <V-Control icon="feather:calendar">
                        <input
                          class="input is-info-focus"
                          :value="inputValue"
                          v-on="inputEvents"
                        />
                      </V-Control>
                    </V-Field>
                  </template>
                </v-date-picker>
              </div>
            </div>
            <!-- Account Details -->
            <div class="fieldset-heading mb-5">
              <h4
                class="has-text-weight-semibold"
                style="font-family: Montserrat, sans-serif"
              >
                Account details
              </h4>
            </div>
            <div class="columns is-multiline">
              <!-- Username -->
              <div class="column is-6">
                <V-Field>
                  <label>Username</label>
                  <V-Control icon="feather:user">
                    <input type="text" class="input is-info-focus" />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Email -->
              <div class="column is-6">
                <V-Field>
                  <label>Email</label>
                  <V-Control icon="feather:at-sign">
                    <input type="text" class="input is-info-focus" />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Password -->
              <div class="column is-6">
                <V-Field>
                  <label>Password</label>
                  <V-Control icon="feather:lock">
                    <input type="password" class="input is-info-focus" />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Confirm Password -->
              <div class="column is-6">
                <V-Field>
                  <label>Confirm Password</label>
                  <V-Control icon="feather:lock">
                    <input type="password" class="input is-info-focus" />
                  </V-Control>
                </V-Field>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Fixed Save Buttons-->
    <div class="fixed-buttons is-active">
      <div class="fixed-buttons-inner">
        <button class="is-info is-elevated button v-button">Save</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../../scss/abstracts/_variables.scss';
@import '../../../../scss/abstracts/_mixins.scss';
@import '../../../../scss/pages/generic/_forms.scss';

@media only screen and (min-width: 767px) {
  .v-calendar-combo {
    margin: 0 !important;

    .column {
      padding-top: 0 !important;
      padding-bottom: 0 !important;

      &:first-child {
        padding-left: 0 !important;
      }
      &:last-child {
        padding-right: 0 !important;
      }
    }
  }
}
</style>
