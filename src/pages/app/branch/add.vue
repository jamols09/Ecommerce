<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { Form as ValidationForm, Field as ValidationField } from 'vee-validate'
import { BranchForm } from '/@src/schema/BranchSchema'
import useNotyf from '/@src/composable/useNotyf'
import { useBranch } from '/@src/composable/api/useBranch'

pageTitle.value = 'Create Branch'

const api = useBranch()
const notyf = useNotyf()
const options = ref([])
const isSubmitting = ref(false)
const autofill = ref('')
const mobile = ref('')
const code = ref('')

const onSubmit = async (inputs: any) => {
  isSubmitting.value = true
  inputs.is_active = options.value.length > 0 ? true : false
  await api.create(inputs)
  notyf.success(`Branch <b><u> ${inputs.name} </u></b> added.`)
  isSubmitting.value = false
}

watchEffect(() => {
  code.value.length > 0 ? (code.value = code.value.toUpperCase()) : code.value
})
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
                <h3>Branch</h3>
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
                  <ValidationField
                    v-model="code"
                    :validate-on-input="false"
                    name="code"
                  >
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
                          v-model="code"
                          type="text"
                          class="input is-info-focus"
                        />
                      </V-Control>
                    </V-Field>
                  </ValidationField>
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
                  <ValidationField
                    v-slot="{ field }"
                    :validate-on-input="false"
                    name="country"
                  >
                    <V-Field>
                      <label>Country *</label>
                      <V-Control icon="ic:baseline-drive-file-rename-outline">
                        <input
                          v-bind="field"
                          type="text"
                          class="input is-info-focus"
                        />
                        <p v-if="errors.country" class="help is-danger">
                          <b>{{ errors.country }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
                  </ValidationField>
                </div>
                <!-- Branch Region / State -->
                <div class="column is-6">
                  <ValidationField
                    v-slot="{ field }"
                    :validate-on-input="false"
                    name="state"
                  >
                    <V-Field>
                      <label>Region / State *</label>
                      <V-Control icon="ic:baseline-drive-file-rename-outline">
                        <input
                          v-bind="field"
                          type="text"
                          class="input is-info-focus"
                        />
                        <p v-if="errors.state" class="help is-danger">
                          <b>{{ errors.state }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
                  </ValidationField>
                </div>
                <!-- Branch City -->
                <div class="column is-6">
                  <ValidationField
                    v-slot="{ field }"
                    :validate-on-input="false"
                    name="city"
                  >
                    <V-Field>
                      <label>City *</label>
                      <V-Control icon="ic:baseline-drive-file-rename-outline">
                        <input
                          v-bind="field"
                          type="text"
                          class="input is-info-focus"
                        />
                        <p v-if="errors.city" class="help is-danger">
                          <b>{{ errors.city }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
                  </ValidationField>
                </div>
                <!-- Branch Address Line 1 -->
                <div class="column is-6">
                  <ValidationField
                    v-slot="{ field }"
                    :validate-on-input="false"
                    name="address_line_1"
                  >
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
                          v-bind="field"
                          type="text"
                          class="input is-info-focus"
                        />
                        <p v-if="errors.address_line_1" class="help is-danger">
                          <b>{{ errors.address_line_1 }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
                  </ValidationField>
                </div>
                <!-- Branch Address Line 2 -->
                <div class="column is-6">
                  <ValidationField
                    v-slot="{ field }"
                    :validate-on-input="false"
                    name="address_line_2"
                  >
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
                          v-bind="field"
                          type="text"
                          class="input is-info-focus"
                        />
                        <p v-if="errors.address_line_2" class="help is-danger">
                          <b>{{ errors.address_line_2 }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
                  </ValidationField>
                </div>
                <!-- Branch Postal / Zip -->
                <div class="column is-6">
                  <ValidationField
                    v-slot="{ field }"
                    :validate-on-input="false"
                    name="postal"
                  >
                    <V-Field>
                      <label>Postal / Zip</label>
                      <V-Control icon="ic:baseline-drive-file-rename-outline">
                        <input
                          v-bind="field"
                          type="text"
                          class="input is-info-focus"
                        />
                        <p v-if="errors.postal" class="help is-danger">
                          <b>{{ errors.postal }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
                  </ValidationField>
                </div>
                <!-- Branch Longitude -->
                <div class="column is-6">
                  <ValidationField
                    v-slot="{ field }"
                    :validate-on-input="false"
                    name="longitude"
                  >
                    <V-Field>
                      <label>Longitude</label>
                      <V-Control icon="ic:baseline-drive-file-rename-outline">
                        <input
                          v-bind="field"
                          type="number"
                          class="input is-info-focus"
                        />
                        <p v-if="errors.longitude" class="help is-danger">
                          <b>{{ errors.longitude }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
                  </ValidationField>
                </div>
                <!-- Branch Latitude -->
                <div class="column is-6">
                  <ValidationField
                    v-slot="{ field }"
                    :validate-on-input="false"
                    name="latitude"
                  >
                    <V-Field>
                      <label>Latitude</label>
                      <V-Control icon="ic:baseline-drive-file-rename-outline">
                        <input
                          v-bind="field"
                          type="number"
                          class="input is-info-focus"
                        />
                        <p v-if="errors.latitude" class="help is-danger">
                          <b>{{ errors.latitude }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
                  </ValidationField>
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
                  <ValidationField
                    v-slot="{ field }"
                    :validate-on-input="false"
                    name="telephone"
                  >
                    <V-Field>
                      <label>Telephone</label>
                      <V-Control icon="ion:ios-telephone-outline">
                        <input
                          v-bind="field"
                          type="number"
                          class="input is-info-focus"
                        />
                        <p v-if="errors.telephone" class="help is-danger">
                          <b>{{ errors.telephone }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
                  </ValidationField>
                </div>
                <div class="column is-6">
                  <ValidationField
                    v-model="mobile"
                    :validate-on-input="false"
                    name="mobile"
                  >
                    <V-Field>
                      <label>Mobile</label>
                      <V-Control icon="ph:device-mobile">
                        <VIMaskInput
                          v-model="mobile"
                          class="input"
                          :options="{
                            mask: '{63} 0 000 000 000',
                          }"
                          placeholder="+63 9 000-000-000"
                        />
                        <p v-if="errors.mobile" class="help is-danger">
                          <b>{{ errors.mobile }}</b>
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
