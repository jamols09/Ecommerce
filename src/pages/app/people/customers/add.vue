<script setup lang="ts">
import { Form as ValidationForm, Field as ValidationField } from 'vee-validate'
import { ref } from 'vue'
import { StatusArray } from '/@src/models/people'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { CustomerForm } from '/@src/schema/CustomerSchema'
import { useUser } from '/@src/composable/api/useUser'

pageTitle.value = 'Create Customer'

const api = useUser()
const statusOptions = ref<StatusArray>([])
const birthdate = ref(new Date())

const onSubmit = async (inputs: typeof CustomerForm) => {
  inputs.account_type = 'CLIENT'
  inputs.is_active = statusOptions.value.length > 0 ? true : false
  inputs.birthdate =
    inputs.birthdate.toISOString().split('T')[0] + ' ' + '00:00:00'
  await api.create(inputs)
}
</script>

<template>
  <ValidationForm
    v-slot="{ errors }"
    :validation-schema="CustomerForm"
    @submit="onSubmit"
  >
    <div class="page-content-inner">
      <div class="form-layout is-stacked">
        <div class="form-outer">
          <div class="form-header">
            <div class="form-header-inner">
              <div class="left">
                <h3>Customers</h3>
              </div>
            </div>
          </div>
          <div class="form-body">
            <div class="form-section is-grey">
              <!-- Is Active -->
              <div class="columns is-multiline">
                <div class="column is-12">
                  <V-Field>
                    <V-Control>
                      <V-Checkbox
                        v-model="statusOptions"
                        value="active"
                        label="Active"
                        color="info"
                      />
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
                  <ValidationField
                    v-slot="{ field }"
                    :validate-on-input="false"
                    name="first_name"
                  >
                    <V-Field>
                      <label>First Name</label>
                      <V-Control icon="feather:user">
                        <input
                          v-bind="field"
                          type="text"
                          class="input is-info-focus"
                        />
                        <p v-if="errors.first_name" class="help is-danger">
                          <b>{{ errors.first_name }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
                  </ValidationField>
                </div>
                <!-- Middle name -->
                <div class="column is-4">
                  <ValidationField
                    v-slot="{ field }"
                    :validate-on-input="false"
                    name="middle_name"
                  >
                    <V-Field>
                      <label>Middle Name</label>
                      <V-Control icon="feather:user">
                        <input
                          v-bind="field"
                          type="text"
                          class="input is-info-focus"
                        />
                        <p v-if="errors.middle_name" class="help is-danger">
                          <b>{{ errors.middle_name }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
                  </ValidationField>
                </div>
                <!-- Last name -->
                <div class="column is-4">
                  <ValidationField
                    v-slot="{ field }"
                    :validate-on-input="false"
                    name="last_name"
                  >
                    <V-Field>
                      <label>Last Name</label>
                      <V-Control icon="feather:user">
                        <input
                          v-bind="field"
                          type="text"
                          class="input is-info-focus"
                        />
                        <p v-if="errors.last_name" class="help is-danger">
                          <b>{{ errors.last_name }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
                  </ValidationField>
                </div>
                <!-- Birthdate -->
                <div class="column is-6">
                  <ValidationField
                    v-model="birthdate"
                    :validate-on-input="false"
                    name="birthdate"
                  >
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
                            <p v-if="errors.birthdate" class="help is-danger">
                              <b>{{ errors.birthdate }}</b>
                            </p>
                          </V-Control>
                        </V-Field>
                      </template>
                    </v-date-picker>
                  </ValidationField>
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
                  <ValidationField
                    v-slot="{ field }"
                    :validate-on-input="false"
                    name="username"
                  >
                    <V-Field>
                      <label>Username</label>
                      <V-Control icon="feather:user">
                        <input
                          v-bind="field"
                          type="text"
                          class="input is-info-focus"
                        />
                        <p v-if="errors.username" class="help is-danger">
                          <b>{{ errors.username }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
                  </ValidationField>
                </div>
                <!-- Email -->
                <div class="column is-6">
                  <ValidationField
                    v-slot="{ field }"
                    :validate-on-input="false"
                    name="email"
                  >
                    <V-Field>
                      <label>Email</label>
                      <V-Control icon="feather:at-sign">
                        <input
                          v-bind="field"
                          type="text"
                          class="input is-info-focus"
                        />
                        <p v-if="errors.email" class="help is-danger">
                          <b>{{ errors.email }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
                  </ValidationField>
                </div>
                <!-- Password -->
                <div class="column is-6">
                  <ValidationField
                    v-slot="{ field }"
                    :validate-on-input="false"
                    name="password"
                  >
                    <V-Field>
                      <label>Password</label>
                      <V-Control icon="feather:lock">
                        <input
                          v-bind="field"
                          type="password"
                          class="input is-info-focus"
                        />
                        <p v-if="errors.password" class="help is-danger">
                          <b>{{ errors.password }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
                  </ValidationField>
                </div>
                <!-- Confirm Password -->
                <div class="column is-6">
                  <ValidationField
                    v-slot="{ field }"
                    :validate-on-input="false"
                    name="password_confirmation"
                  >
                    <V-Field>
                      <label>Confirm Password</label>
                      <V-Control icon="feather:lock">
                        <input
                          v-bind="field"
                          type="password"
                          class="input is-info-focus"
                        />
                        <p
                          v-if="errors.password_confirmation"
                          class="help is-danger"
                        >
                          <b>{{ errors.password_confirmation }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
                  </ValidationField>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Button -->
    <VField class="fixed-buttons is-active">
      <VControl class="fixed-buttons-inner">
        <VButton
          type="submit"
          color="primary"
          :loading="api.isLoading.value"
          bold
          fullwidth
          raised
        >
          Submit
        </VButton>
      </VControl>
    </VField>
  </ValidationForm>
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
