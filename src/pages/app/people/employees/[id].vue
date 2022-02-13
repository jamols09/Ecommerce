<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Form as ValidationForm, Field as ValidationField } from 'vee-validate'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { StatusArray } from '../../../../models/people'
import { EmployeeForm } from '/@src/schema/EmployeeSchema'
import {
  onAddFile,
  onRemoveFile,
  onAddFileProgress,
} from '/@src/composable/useFilePond'
import { useUser } from '/@src/composable/api/useUser'
import { useRoute } from 'vue-router'

pageTitle.value = 'Create Employee'

const api = useUser()
const route = useRoute()
const statusOptions = ref<StatusArray>([])
const isSubmitting = ref(false)
const birthdate = ref(new Date())
const employee = ref({
  is_active: [],
  first_name: '',
  middle_name: '',
  last_name: '',
  birthdate: '',
  username: '',
  email: '',
})

const onSubmit = async (inputs: typeof EmployeeForm) => {
  isSubmitting.value = true
  inputs.account_type = 'ADMIN'
  inputs.is_active = statusOptions.value.length > 0 ? true : false
  inputs.birthdate =
    inputs.birthdate.toISOString().split('T')[0] + ' ' + '00:00:00'
  await api.create(inputs)
  isSubmitting.value = false
}

onMounted(async () => {
  await api.details(route.params.id)
  const { data } = api.detailsResponse.value
  employee.value = {
    ...data,
    is_active: data.is_active === 1 ? [1] : [''], //spread operator
  }
  console.log(data)
})
</script>

<template>
  <ValidationForm
    v-slot="{ errors }"
    :validation-schema="EmployeeForm"
    @submit="onSubmit"
  >
    <div class="page-content-inner">
      <div class="form-layout is-stacked">
        <div class="form-outer">
          <div class="form-header">
            <div class="form-header-inner">
              <div class="left">
                <h3>Employees</h3>
              </div>
            </div>
          </div>
          <div class="form-body">
            <div class="form-section is-grey">
              <div class="columns is-multiline">
                <!-- Is Active -->
                <div class="column is-12">
                  <V-Field>
                    <V-Control>
                      <V-Checkbox
                        v-model="employee.is_active"
                        :value="1"
                        label="Active"
                        color="info"
                      />
                      <VueTooltip
                        label="Set account state."
                        abbreviation
                        :multiline="false"
                        size="is-small"
                        class="light-text"
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
              <div class="columns is-multiline is-centered mb-5">
                <div class="column is-narrow has-text-centered">
                  <!-- Avatar -->
                  <V-Field>
                    <label>Avatar</label>
                    <V-Control>
                      <V-FilePond
                        class="profile-filepond"
                        name="profile_filepond"
                        :chunk-retry-delays="[500, 1000, 3000]"
                        label-idle="<i class='lnil lnil-cloud-upload'></i>"
                        :accepted-file-types="['image/png', 'image/jpeg']"
                        :image-preview-height="140"
                        :image-resize-target-width="140"
                        :image-resize-target-height="140"
                        image-crop-aspect-ratio="1:1"
                        style-panel-layout="compact circle"
                        style-load-indicator-position="center bottom"
                        style-progress-indicator-position="right bottom"
                        style-button-remove-item-position="left bottom"
                        style-button-process-item-position="right bottom"
                        @addfile="onAddFile"
                        @removefile="onRemoveFile"
                        @addfileprogress="onAddFileProgress"
                      />
                    </V-Control>
                  </V-Field>
                </div>
              </div>
              <div class="columns is-multiline">
                <!-- First name -->
                <div class="column is-4">
                  <ValidationField
                    v-model="employee.first_name"
                    :validate-on-input="false"
                    name="first_name"
                  >
                    <V-Field>
                      <label>First Name *</label>
                      <V-Control icon="feather:user">
                        <input
                          v-model="employee.first_name"
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
                    v-model="employee.middle_name"
                    :validate-on-input="false"
                    name="middle_name"
                  >
                    <V-Field>
                      <label>Middle Name</label>
                      <V-Control icon="feather:user">
                        <input
                          v-model="employee.middle_name"
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
                    v-model="employee.last_name"
                    :validate-on-input="false"
                    name="last_name"
                  >
                    <V-Field>
                      <label>Last Name</label>
                      <V-Control icon="feather:user">
                        <input
                          v-model="employee.last_name"
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
                <div class="column is-4">
                  <ValidationField
                    v-model="birthdate"
                    :validate-on-input="false"
                    name="birthdate"
                  >
                    <v-date-picker
                      v-model="employee.birthdate"
                      color="info"
                      trim-weeks
                    >
                      <template #default="{ inputValue, inputEvents }">
                        <V-Field>
                          <label>Birthdate *</label>
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
                    v-model="employee.username"
                    :validate-on-input="false"
                    name="username"
                  >
                    <V-Field>
                      <label>Username *</label>
                      <V-Control icon="feather:user">
                        <input
                          v-model="employee.username"
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
                    v-model="employee.email"
                    :validate-on-input="false"
                    name="email"
                  >
                    <V-Field>
                      <label>Email</label>
                      <V-Control icon="feather:at-sign">
                        <input
                          v-model="employee.email"
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

                <!-- Role Options -->
                <!-- <div class="column is-6">
                  <V-Field>
                    <label>Role</label>
                    <V-Control>
                      <Multiselect
                        v-model="role.value"
                        :options="role.options"
                        :searchable="true"
                      />
                    </V-Control>
                  </V-Field>
                </div> -->
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
            :loading="isSubmitting"
            bold
            fullwidth
            raised
          >
            Submit
          </VButton>
        </VControl>
      </VField>
    </div>
  </ValidationForm>
</template>

<style lang="scss">
@import '../../../../scss/abstracts/_variables.scss';
@import '../../../../scss/abstracts/_mixins.scss';
@import '../../../../scss/pages/generic/_forms.scss';
@import '../../../../scss/extensions/_treeselect.scss';

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
