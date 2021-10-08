<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { Branch } from '/@src/models/branch'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { Form as ValidationForm, Field as ValidationField } from 'vee-validate'
import { BranchForm } from '/@src/schema/BranchSchema'
import useNotyf from '/@src/composable/useNotyf'
pageTitle.value = 'Create Branch'

const route = useRoute()
const options = ref([])
const isSubmitting = ref(false)
const notyf = useNotyf()
const autofill = ref('')

const branch = reactive<Branch>({
  name: '',
  code: '',
  contact: {
    telephone: null,
    mobile: null,
  },
  address: {
    country: '',
    regionState: '',
    city: '',
    addressLine1: '',
    addressLine2: '',
    postal: null,
    geolocation: {
      longitude: null,
      latitude: null,
    },
  },
})

const headerName = computed((): string => {
  const name = route.fullPath.split('/').slice(-2, -1)[0] // get 2nd to the last index -2, -1
  return name.charAt(0).toUpperCase() + name.slice(1)
})

const onSubmit = async (inputs: any) => {
  console.log(inputs)
  isSubmitting.value = true
  notyf.success(`Branch <b><u> ${inputs.name} </u></b> added.`)
  isSubmitting.value = false
}
</script>

<template>
  <ValidationForm
    v-slot="{ errors }"
    :validation-schema="BranchForm"
    @submit="onSubmit"
  >
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
                <!-- Checkbox -->
                <div class="column is-12">
                  <V-Field>
                    <V-Control>
                      <ValidationField
                        v-model="options"
                        :validate-on-input="false"
                        name="options"
                      >
                        <VCheckbox
                          v-model="options"
                          value="active"
                          label="Active"
                          color="info"
                        />
                        <VueTooltip
                          label="Make products sellable in this branch"
                          abbreviation
                          :multiline="true"
                          size="is-small"
                          class="light-text mr-3"
                          position="is-bottom"
                        >
                          <b>?</b>
                        </VueTooltip>
                      </ValidationField>
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
                  Details
                </h4>
              </div>
              <div class="columns is-multiline">
                <!-- Branch Name -->
                <div class="column is-6">
                  <ValidationField
                    v-slot="{ field }"
                    :validate-on-input="false"
                    name="name"
                  >
                    <V-Field>
                      <label>Name *</label>
                      <V-Control icon="ic:baseline-drive-file-rename-outline">
                        <input
                          v-bind="field"
                          type="text"
                          class="input is-info-focus"
                        />
                        <p v-if="errors.name" class="help is-danger">
                          <b>{{ errors.name }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
                  </ValidationField>
                </div>
                <!-- Branch Code -->
                <div class="column is-6">
                  <V-Field>
                    <VueTooltip
                      label="Define the code for branch. Required and must be unique."
                      abbreviation
                      :multiline="true"
                      size="is-small"
                      class="light-text"
                      >Code</VueTooltip
                    >
                    <V-Control icon="mdi:code-braces">
                      <input
                        v-model="branch.code"
                        type="text"
                        class="input is-info-focus"
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
                  Address
                </h4>
              </div>
              <!-- Autofill -->
              <div class="columns is-multiline">
                <div class="column is-12">
                  <VField>
                    <VControl icon="ic:baseline-drive-file-rename-outline">
                      <input
                        v-model="autofill"
                        type="text"
                        class="input is-info-focus"
                        placeholder="Autofill address"
                      />
                    </VControl>
                  </VField>
                </div>
              </div>
              <div class="columns is-multiline">
                <!-- Branch Country -->
                <div class="column is-6">
                  <V-Field>
                    <label>Country *</label>
                    <V-Control icon="ic:baseline-drive-file-rename-outline">
                      <input
                        v-model="branch.address.country"
                        type="text"
                        class="input is-info-focus"
                      />
                      <!-- <p v-if="errors.country" class="help is-danger">
                        <b>{{ errors.country }}</b>
                      </p> -->
                    </V-Control>
                  </V-Field>
                </div>
                <!-- Branch Region / State -->
                <div class="column is-6">
                  <V-Field>
                    <label>Region / State *</label>
                    <V-Control icon="ic:baseline-drive-file-rename-outline">
                      <input
                        v-model="branch.address.regionState"
                        type="text"
                        class="input is-info-focus"
                      />
                      <!-- <p v-if="errors.regionState" class="help is-danger">
                        <b>{{ errors.regionState }}</b>
                      </p> -->
                    </V-Control>
                  </V-Field>
                </div>
                <!-- Branch City -->
                <div class="column is-6">
                  <V-Field>
                    <label>City *</label>
                    <V-Control icon="ic:baseline-drive-file-rename-outline">
                      <input
                        v-model="branch.address.city"
                        type="text"
                        class="input is-info-focus"
                      />
                      <!-- <p v-if="errors.city" class="help is-danger">
                        <b>{{ errors.city }}</b>
                      </p> -->
                    </V-Control>
                  </V-Field>
                </div>
                <!-- Branch Address Line 1 -->
                <div class="column is-6">
                  <V-Field>
                    <VueTooltip
                      label="Primary Address (Street Addr, House #, etc..)"
                      abbreviation
                      :multiline="true"
                      size="is-small"
                      class="light-text"
                    >
                      Address Line 1 *
                    </VueTooltip>
                    <V-Control icon="ic:baseline-drive-file-rename-outline">
                      <input
                        v-model="branch.address.addressLine1"
                        type="text"
                        class="input is-info-focus"
                      />
                      <!-- <p v-if="errors.addressLine1" class="help is-danger">
                        <b>{{ errors.addressLine1 }}</b>
                      </p> -->
                    </V-Control>
                  </V-Field>
                </div>
                <!-- Branch Address Line 2 -->
                <div class="column is-6">
                  <V-Field>
                    <VueTooltip
                      label="Secondary Address (Apartment, Unit, Bldg. floor, etc..)"
                      abbreviation
                      :multiline="true"
                      size="is-small"
                      class="light-text"
                    >
                      Address Line 2
                    </VueTooltip>
                    <V-Control icon="ic:baseline-drive-file-rename-outline">
                      <input
                        v-model="branch.address.addressLine2"
                        type="text"
                        class="input is-info-focus"
                      />
                      <!-- <p v-if="errors.addressLine2" class="help is-danger">
                        <b>{{ errors.addressLine2 }}</b>
                      </p> -->
                    </V-Control>
                  </V-Field>
                </div>
                <!-- Branch Postal / Zip -->
                <div class="column is-6">
                  <V-Field>
                    <label>Postal / Zip</label>
                    <V-Control icon="ic:baseline-drive-file-rename-outline">
                      <input
                        v-model="branch.address.postal"
                        type="text"
                        class="input is-info-focus"
                      />
                      <!-- <p v-if="errors.postal" class="help is-danger">
                        <b>{{ errors.postal }}</b>
                      </p> -->
                    </V-Control>
                  </V-Field>
                </div>
                <!-- Branch Longitude -->
                <div class="column is-6">
                  <V-Field>
                    <label>Longitude</label>
                    <V-Control icon="ic:baseline-drive-file-rename-outline">
                      <input
                        v-model="branch.address.geolocation.longitude"
                        type="number"
                        class="input is-info-focus"
                      />
                      <!-- <p v-if="errors.longitude" class="help is-danger">
                        <b>{{ errors.longitude }}</b>
                      </p> -->
                    </V-Control>
                  </V-Field>
                </div>
                <!-- Branch Latitude -->
                <div class="column is-6">
                  <V-Field>
                    <label>Latitude</label>
                    <V-Control icon="ic:baseline-drive-file-rename-outline">
                      <input
                        v-model="branch.address.geolocation.latitude"
                        type="number"
                        class="input is-info-focus"
                      />
                      <!-- <p v-if="errors.latitude" class="help is-danger">
                        <b>{{ errors.latitude }}</b>
                      </p> -->
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
                  Contact
                </h4>
              </div>
              <div class="columns is-multiline">
                <!-- Branch Telephone -->
                <div class="column is-6">
                  <V-Field>
                    <label>Telephone</label>
                    <V-Control icon="ion:ios-telephone-outline">
                      <input
                        v-model="branch.contact.telephone"
                        type="text"
                        class="input is-info-focus"
                      />
                      <!-- <p v-if="errors.telephone" class="help is-danger">
                        <b>{{ errors.telephone }}</b>
                      </p> -->
                    </V-Control>
                  </V-Field>
                </div>
                <div class="column is-6">
                  <V-Field>
                    <label>Mobile</label>
                    <V-Control icon="ph:device-mobile">
                      <input
                        v-model="branch.contact.mobile"
                        type="text"
                        class="input is-info-focus"
                      />
                      <!-- <p v-if="errors.mobile" class="help is-danger">
                        <b>{{ errors.mobile }}</b>
                      </p> -->
                    </V-Control>
                  </V-Field>
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
          :loading="isSubmitting"
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
@import '../../../scss/abstracts/_variables.scss';
@import '../../../scss/abstracts/_mixins.scss';
@import '../../../scss/pages/generic/_forms.scss';
@import '../../../scss/extensions/_custom-tooltip.scss';

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
