<script setup lang="ts">
import { reactive, ref } from 'vue'
import { CustomerInfo } from '/@src/models/order'

const autofill = ref('')
const customer = reactive<CustomerInfo>({
  firstName: '',
  middleName: '',
  lastName: '',
  country: '',
  stateRegion: '',
  province: '',
  city: '',
  line1: '',
  line2: '',
  mobile: '',
  telephone: '',
  postal: null,
})
</script>

<template>
  <form>
    <div class="columns is-multiline">
      <div class="column is-12">
        <p>
          Note: when adding manual order this will be treated as a separate
          data.
        </p>
      </div>
      <div class="column is-12">
        <!-- Basic Details -->
        <div class="fieldset-heading mb-2">
          <h4
            class="has-text-weight-semibold"
            style="font-family: Montserrat, sans-serif"
          >
            Info
          </h4>
        </div>
      </div>
    </div>
    <div class="columns is-multiline">
      <!-- First Name -->
      <div class="column is-6">
        <VField>
          <label>First Name *</label>
          <VControl icon="ic:baseline-drive-file-rename-outline">
            <input
              v-model="customer.firstName"
              type="text"
              class="input is-info-focus"
            />
          </VControl>
        </VField>
      </div>
      <!-- Middle Name -->
      <div class="column is-6">
        <VField>
          <label>Middle Name</label>
          <VControl icon="ic:baseline-drive-file-rename-outline">
            <input
              v-model="customer.middleName"
              type="text"
              class="input is-info-focus"
            />
          </VControl>
        </VField>
      </div>
      <!-- Last Name -->
      <div class="column is-6">
        <VField>
          <label>Last Name</label>
          <VControl icon="ic:baseline-drive-file-rename-outline">
            <input
              v-model="customer.lastName"
              type="text"
              class="input is-info-focus"
            />
          </VControl>
        </VField>
      </div>
    </div>
    <!-- Address Details -->
    <div class="fieldset-heading mb-5">
      <h4
        class="has-text-weight-semibold"
        style="font-family: Montserrat, sans-serif"
      >
        Location
      </h4>
    </div>
    <div class="columns is-multiline">
      <!-- Autofill -->
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
      <!-- Country -->
      <div class="column is-6">
        <VField>
          <label>Country *</label>
          <VControl icon="ic:baseline-drive-file-rename-outline">
            <input
              v-model="customer.country"
              type="text"
              class="input is-info-focus"
            />
          </VControl>
        </VField>
      </div>
      <!-- State/Region -->
      <div class="column is-6">
        <VField>
          <label>State / Region *</label>
          <VControl icon="ic:baseline-drive-file-rename-outline">
            <input
              v-model="customer.stateRegion"
              type="text"
              class="input is-info-focus"
            />
          </VControl>
        </VField>
      </div>
      <!-- Province -->
      <div class="column is-6">
        <VField>
          <label>Province *</label>
          <VControl icon="ic:baseline-drive-file-rename-outline">
            <input
              v-model="customer.province"
              type="text"
              class="input is-info-focus"
            />
          </VControl>
        </VField>
      </div>
      <!-- City -->
      <div class="column is-6">
        <VField>
          <label>City *</label>
          <VControl icon="ic:baseline-drive-file-rename-outline">
            <input
              v-model="customer.city"
              type="text"
              class="input is-info-focus"
            />
          </VControl>
        </VField>
      </div>
      <!-- Address line 1 -->
      <div class="column is-6">
        <VField>
          <label>Address Line 1 *</label>
          <VControl icon="ic:baseline-drive-file-rename-outline">
            <input
              v-model="customer.line1"
              type="text"
              class="input is-info-focus"
            />
          </VControl>
        </VField>
      </div>
      <!-- Address line 2 -->
      <div class="column is-6">
        <VField>
          <label>Address Line 2</label>
          <VControl icon="ic:baseline-drive-file-rename-outline">
            <input
              v-model="customer.line2"
              type="text"
              class="input is-info-focus"
            />
          </VControl>
        </VField>
      </div>
      <div class="column is-6">
        <VField>
          <label>Postal</label>
          <VControl icon="ic:baseline-drive-file-rename-outline">
            <input
              v-model="customer.postal"
              type="number"
              class="input is-info-focus"
            />
          </VControl>
        </VField>
      </div>
    </div>
    <!-- Contact Details -->
    <div class="fieldset-heading mb-5">
      <h4
        class="has-text-weight-semibold"
        style="font-family: Montserrat, sans-serif"
      >
        Contact
      </h4>
    </div>
    <div class="columns is-multiline">
      <!-- Mobile -->
      <div class="column is-6">
        <VField>
          <label> Mobile </label>
          <VControl icon="ph:device-mobile">
            <input
              v-model="customer.mobile"
              type="number"
              class="input is-info-focus"
            />
          </VControl>
        </VField>
      </div>
      <!-- Telephone -->
      <div class="column is-6">
        <VField>
          <label> Telephone </label>
          <VControl icon="ion:ios-telephone-outline">
            <input
              v-model="customer.telephone"
              type="text"
              class="input is-info-focus"
            />
          </VControl>
        </VField>
      </div>
    </div>
  </form>
</template>
