<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { Branch } from '/@src/models/branch'
import { pageTitle } from '/@src/state/sidebarLayoutState'
pageTitle.value = 'Create Branch'

const branchOptions = ref<string[]>([])
const branch = reactive<Branch>({
  name: '',
  code: '',
  country: '',
  regionState: '',
  city: '',
  addressLine1: '',
  addressLine2: '',
  postal: null,
  telephone: null,
  mobile: null,
  geolocation: {
    longitude: null,
    latitude: null,
  },
})

const route = useRoute()
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
              <div class="column is-12">
                <V-Field>
                  <V-Control>
                    <V-Checkbox
                      v-model="branchOptions"
                      value="active"
                      label="Active"
                      color="info"
                    />
                    <VueTooltip
                      label="Warning! This will affect all the inventory assigned to this branch."
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
                Details
              </h4>
            </div>
            <div class="columns is-multiline">
              <!-- Branch Name -->
              <div class="column is-6">
                <V-Field>
                  <label>Name</label>
                  <V-Control icon="ic:baseline-drive-file-rename-outline">
                    <input
                      v-model="branch.name"
                      type="text"
                      class="input is-info-focus"
                    />
                  </V-Control>
                </V-Field>
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
            <div class="columns is-multiline">
              <!-- Branch Country -->
              <div class="column is-6">
                <V-Field>
                  <label>Country</label>
                  <V-Control icon="ic:baseline-drive-file-rename-outline">
                    <input
                      v-model="branch.country"
                      type="text"
                      class="input is-info-focus"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Branch Region / State -->
              <div class="column is-6">
                <V-Field>
                  <label>Region / State</label>
                  <V-Control icon="ic:baseline-drive-file-rename-outline">
                    <input
                      v-model="branch.regionState"
                      type="text"
                      class="input is-info-focus"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Branch City -->
              <div class="column is-6">
                <V-Field>
                  <label>City</label>
                  <V-Control icon="ic:baseline-drive-file-rename-outline">
                    <input
                      v-model="branch.city"
                      type="text"
                      class="input is-info-focus"
                    />
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
                    >Address Line 1</VueTooltip
                  >
                  <V-Control icon="ic:baseline-drive-file-rename-outline">
                    <input
                      v-model="branch.addressLine1"
                      type="text"
                      class="input is-info-focus"
                    />
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
                    >Address Line 2 (optional)</VueTooltip
                  >
                  <V-Control icon="ic:baseline-drive-file-rename-outline">
                    <input
                      v-model="branch.addressLine2"
                      type="text"
                      class="input is-info-focus"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Branch Postal / Zip -->
              <div class="column is-6">
                <V-Field>
                  <label>Postal / Zip</label>
                  <V-Control icon="ic:baseline-drive-file-rename-outline">
                    <input
                      v-model="branch.postal"
                      type="text"
                      class="input is-info-focus"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Branch Longitude -->
              <div class="column is-6">
                <V-Field>
                  <label>Longitude</label>
                  <V-Control icon="ic:baseline-drive-file-rename-outline">
                    <input
                      v-model="branch.geolocation.longitude"
                      type="number"
                      class="input is-info-focus"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Branch Latitude -->
              <div class="column is-6">
                <V-Field>
                  <label>Longitude</label>
                  <V-Control icon="ic:baseline-drive-file-rename-outline">
                    <input
                      v-model="branch.geolocation.latitude"
                      type="number"
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
                      v-model="branch.telephone"
                      type="text"
                      class="input is-info-focus"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <div class="column is-6">
                <V-Field>
                  <label>Mobile</label>
                  <V-Control icon="ph:device-mobile">
                    <input
                      v-model="branch.mobile"
                      type="text"
                      class="input is-info-focus"
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
