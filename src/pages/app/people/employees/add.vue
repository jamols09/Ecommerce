<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { ImageData, People, StatusArray } from '../../../../models/people'

pageTitle.value = 'Create Employee'

const route = useRoute()
const statusOptions = ref<StatusArray>([])
const employee = reactive<People>({
  active: false,
  verified: false,
  firstName: '',
  middleName: '',
  lastName: '',
  birthdate: new Date(),
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const role = reactive({
  options: [
    { id: 'basic', label: 'Basic' },
    { id: 'admin', label: 'Admin' },
  ],
  value: ['basic'],
})

const imageData = reactive<ImageData>({
  name: '',
  file: null,
})

// File Pond
const onAddFile = (error: any, fileInfo: any) => {
  if (error) {
    console.error(error)
    return
  }
  const _file = fileInfo.file as File
  if (_file) {
    imageData.file = _file
  }
}
const onRemoveFile = (error: any, fileInfo: any) => {
  if (error) {
    console.error(error)
    return
  }
  imageData.file = null
}
const onAddFileProgress = (file: any, progress: any) => {
  console.log(file, progress)
}
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
          <div class="form-section is-grey">
            <div class="columns is-multiline">
              <!-- Is Active -->
              <div class="column is-12">
                <V-Field>
                  <V-Control>
                    <V-Checkbox
                      v-model="statusOptions"
                      value="active"
                      label="Active"
                      color="info"
                    />

                    <V-Checkbox
                      v-model="statusOptions"
                      value="verified"
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
                <V-Field>
                  <label>First Name</label>
                  <V-Control icon="feather:user">
                    <input
                      v-model="employee.firstName"
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
                      v-model="employee.middleName"
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
                      v-model="employee.lastName"
                      type="text"
                      class="input is-info-focus"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Birthdate -->
              <div class="column is-4">
                <v-date-picker
                  v-model="employee.birthdate"
                  color="info"
                  trim-weeks
                >
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
                    <input
                      v-model="employee.username"
                      type="text"
                      class="input is-info-focus"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Email -->
              <div class="column is-6">
                <V-Field>
                  <label>Email</label>
                  <V-Control icon="feather:at-sign">
                    <input
                      v-model="employee.email"
                      type="text"
                      class="input is-info-focus"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Password -->
              <div class="column is-6">
                <V-Field>
                  <label>Password</label>
                  <V-Control icon="feather:lock">
                    <input
                      v-model="employee.password"
                      type="password"
                      class="input is-info-focus"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Confirm Password -->
              <div class="column is-6">
                <V-Field>
                  <label>Confirm Password</label>
                  <V-Control icon="feather:lock">
                    <input
                      v-model="employee.confirmPassword"
                      type="password"
                      class="input is-info-focus"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Role Options -->
              <div class="column is-6">
                <V-Field>
                  <label>Role</label>
                  <V-Control>
                    <Treeselect
                      v-model="role.value"
                      :multiple="false"
                      :options="role.options"
                      :limit="2"
                    />
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
