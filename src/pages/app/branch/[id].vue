<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { BranchForm } from '/@src/schema/BranchSchema'
import { useBranch } from '/@src/composable/api/useBranch'
import { Form as ValidationForm, Field as ValidationField } from 'vee-validate'

pageTitle.value = 'Edit Branch'

const api = useBranch()
const isSubmitting = ref(false)
const autofill = ref('')
const route = useRoute()
const branch = ref({
  address_line_1: '',
  address_line_2: '',
  code: '',
  country: '',
  city: '',
  barangay: '',
  id: 0,
  longitude: 0,
  latitude: 0,
  mobile: '',
  name: '',
  state: '',
  postal: '',
  telephone: '',
  is_active: [],
})

const isLoadState = computed(() => api.isLoading.value)
const onSubmit = async (inputs: any) => {
  isSubmitting.value = true
  inputs.is_active = branch.value.is_active.length > 0 ? true : false
  await api.update(inputs, branch.value.id)
  isSubmitting.value = false
}

onMounted(async () => {
  await api.details(route.params.id)
  const { data } = api.detailsResponse.value
  branch.value = {
    ...data,
    telephone: data.telephone !== null ? data.telephone : '',
    is_active: data.is_active === 1 ? [1] : [''], //spread operator
  }
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
                <h3>Branch {{ isLoadState }}</h3>
              </div>
            </div>
          </div>
          <div class="form-body">
            <VLoader
              :active="isLoadState"
              :translucent="true"
              size="small"
              :grey="true"
              card="regular"
            >
              <div class="form-section is-grey">
                <div class="columns is-multiline">
                  <!-- Checkbox -->
                  <div class="column is-12">
                    <V-Field>
                      <V-Control>
                        <ValidationField
                          v-model="branch.is_active"
                          :validate-on-input="false"
                          name="is_active"
                        >
                          <VCheckbox
                            v-model="branch.is_active"
                            :value="1"
                            label="Active"
                            color="info"
                          />
                          <VueTooltip
                            label="Make products sellable in this branch"
                            abbreviation
                            :multiline="false"
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
                      v-model="branch.name"
                      :validate-on-input="false"
                      name="name"
                    >
                      <V-Field>
                        <label>Name *</label>
                        <V-Control icon="ic:baseline-drive-file-rename-outline">
                          <input
                            v-model="branch.name"
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
                      v-model="branch.code"
                      :validate-on-input="false"
                      name="code"
                    >
                      <V-Field>
                        <VueTooltip
                          label="Must be unique. Auto generated when empty."
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
                      v-model="branch.country"
                      :validate-on-input="false"
                      name="country"
                    >
                      <V-Field>
                        <label>Country *</label>
                        <V-Control icon="ic:baseline-drive-file-rename-outline">
                          <input
                            v-model="branch.country"
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
                      v-model="branch.state"
                      :validate-on-input="false"
                      name="state"
                    >
                      <V-Field>
                        <label>Region / State *</label>
                        <V-Control icon="ic:baseline-drive-file-rename-outline">
                          <input
                            v-model="branch.state"
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
                      v-model="branch.city"
                      :validate-on-input="false"
                      name="city"
                    >
                      <V-Field>
                        <label>City *</label>
                        <V-Control icon="ic:baseline-drive-file-rename-outline">
                          <input
                            v-model="branch.city"
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
                  <!-- Branch Barangay -->
                  <div class="column is-6">
                    <ValidationField
                      v-model="branch.barangay"
                      :validate-on-input="false"
                      name="barangay"
                    >
                      <V-Field>
                        <label>Barangay *</label>
                        <V-Control icon="ic:baseline-drive-file-rename-outline">
                          <input
                            v-model="branch.barangay"
                            type="text"
                            class="input is-info-focus"
                          />
                          <p v-if="errors.barangay" class="help is-danger">
                            <b>{{ errors.barangay }}</b>
                          </p>
                        </V-Control>
                      </V-Field>
                    </ValidationField>
                  </div>
                  <!-- Branch Address Line 1 -->
                  <div class="column is-6">
                    <ValidationField
                      v-model="branch.address_line_1"
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
                            v-model="branch.address_line_1"
                            type="text"
                            class="input is-info-focus"
                          />
                          <p
                            v-if="errors.address_line_1"
                            class="help is-danger"
                          >
                            <b>{{ errors.address_line_1 }}</b>
                          </p>
                        </V-Control>
                      </V-Field>
                    </ValidationField>
                  </div>
                  <!-- Branch Address Line 2 -->
                  <div class="column is-6">
                    <ValidationField
                      v-model="branch.address_line_2"
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
                            v-model="branch.address_line_2"
                            type="text"
                            class="input is-info-focus"
                          />
                          <p
                            v-if="errors.address_line_2"
                            class="help is-danger"
                          >
                            <b>{{ errors.address_line_2 }}</b>
                          </p>
                        </V-Control>
                      </V-Field>
                    </ValidationField>
                  </div>
                  <!-- Branch Postal / Zip -->
                  <div class="column is-6">
                    <ValidationField
                      v-model="branch.postal"
                      :validate-on-input="false"
                      name="postal"
                    >
                      <V-Field>
                        <label>Postal / Zip</label>
                        <V-Control icon="ic:baseline-drive-file-rename-outline">
                          <input
                            v-model="branch.postal"
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
                      v-model="branch.longitude"
                      :validate-on-input="false"
                      name="longitude"
                    >
                      <V-Field>
                        <label>Longitude</label>
                        <V-Control icon="ic:baseline-drive-file-rename-outline">
                          <input
                            v-model="branch.longitude"
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
                      v-model="branch.latitude"
                      :validate-on-input="false"
                      name="latitude"
                    >
                      <V-Field>
                        <label>Latitude</label>
                        <V-Control icon="ic:baseline-drive-file-rename-outline">
                          <input
                            v-model="branch.latitude"
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
                      v-model="branch.telephone"
                      :validate-on-input="false"
                      name="telephone"
                    >
                      <V-Field>
                        <label>Telephone</label>
                        <V-Control icon="ion:ios-telephone-outline">
                          <input
                            v-model="branch.telephone"
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
                      v-model="branch.mobile"
                      :validate-on-input="false"
                      name="mobile"
                    >
                      <V-Field>
                        <label>Mobile</label>
                        <V-Control icon="ph:device-mobile">
                          <VIMaskInput
                            v-model="branch.mobile"
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
            </VLoader>
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
