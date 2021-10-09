<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { CustomerInfo } from '/@src/models/order'
import { Form as ValidationForm, Field as ValidationField } from 'vee-validate'
import { OrderCustomerForm } from '/@src/schema/OrderSchema'

const isUpdating = ref(false)
const autofill = ref<HTMLInputElement>()
const address1 = ref('')

let autocomplete: google.maps.places.Autocomplete

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
  postal: '',
})

//fill inputs fields from google result
const fillForm = () => {
  let place = autocomplete.getPlace()
  for (const data of place.address_components as google.maps.GeocoderAddressComponent[]) {
    const componentType = data.types[0]
    console.log(componentType)
    switch (componentType) {
      case 'street_number': {
        address1.value = `${data.long_name} ${address1.value}`
        break
      }
      case 'route': {
        customer.line1 = address1.value + data.short_name
        break
      }
      case 'locality': {
        customer.city = data.long_name
      }
      case 'administrative_area_level_1': {
        customer.stateRegion = data.short_name
        break
      }
      case 'administrative_area_level_2': {
        customer.province = data.long_name
      }
      case 'country':
        customer.country = data.long_name
        break
    }
  }
}

onMounted(() => {
  const options = {
    componentRestrictions: { country: 'ph' },
    fields: ['address_components', 'geometry'],
    types: ['address'],
  }
  autocomplete = new google.maps.places.Autocomplete(autofill.value!, options)
  autocomplete.addListener('place_changed', fillForm)
})
const onUpdate = (inputs: any) => {
  const data = OrderCustomerForm.cast(inputs)
}
</script>

<template>
  <ValidationForm
    v-slot="{ errors }"
    :validation-schema="OrderCustomerForm"
    @submit="onUpdate"
  >
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
      <ValidationField
        v-slot="{ field }"
        :validate-on-input="false"
        name="firstName"
      >
        <!-- First Name -->
        <div class="column is-6">
          <VField>
            <label>First Name *</label>
            <VControl icon="ic:baseline-drive-file-rename-outline">
              <input v-bind="field" type="text" class="input is-info-focus" />
              <p v-if="errors.firstName" class="help is-danger">
                <b>{{ errors.firstName }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>

      <ValidationField
        v-slot="{ field }"
        :validate-on-input="false"
        name="middleName"
      >
        <!-- Middle Name -->
        <div class="column is-6">
          <VField>
            <label>Middle Name</label>
            <VControl icon="ic:baseline-drive-file-rename-outline">
              <input v-bind="field" type="text" class="input is-info-focus" />
              <p v-if="errors.middleName" class="help is-danger">
                <b>{{ errors.middleName }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>

      <ValidationField
        v-slot="{ field }"
        :validate-on-input="false"
        name="lastName"
      >
        <!-- Last Name -->
        <div class="column is-6">
          <VField>
            <label>Last Name</label>
            <VControl icon="ic:baseline-drive-file-rename-outline">
              <input v-bind="field" type="text" class="input is-info-focus" />
              <p v-if="errors.lastName" class="help is-danger">
                <b>{{ errors.lastName }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>
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
              id="autofill"
              ref="autofill"
              name="autofill"
              type="text"
              class="input is-info-focus"
              placeholder="Autofill"
              autocomplete="off"
            />
          </VControl>
        </VField>
      </div>

      <ValidationField
        v-slot="{ field }"
        v-model="customer.country"
        :validate-on-input="false"
        name="country"
      >
        <!-- Country -->
        <div class="column is-6">
          <VField>
            <label>Country *</label>
            <VControl icon="ic:baseline-drive-file-rename-outline">
              <input v-bind="field" type="text" class="input is-info-focus" />
              <p v-if="errors.country" class="help is-danger">
                <b>{{ errors.country }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>

      <ValidationField
        v-model="customer.stateRegion"
        :validate-on-input="false"
        name="stateRegion"
      >
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
              <p v-if="errors.stateRegion" class="help is-danger">
                <b>{{ errors.stateRegion }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>

      <ValidationField
        v-model="customer.province"
        :validate-on-input="false"
        name="province"
      >
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
              <p v-if="errors.province" class="help is-danger">
                <b>{{ errors.province }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>

      <ValidationField
        v-model="customer.city"
        :validate-on-input="false"
        name="city"
      >
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
              <p v-if="errors.city" class="help is-danger">
                <b>{{ errors.city }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>

      <ValidationField
        v-model="customer.line1"
        :validate-on-input="false"
        name="line1"
      >
        <!-- Address line 1 -->
        <div class="column is-6">
          <VField>
            <label>Line 1 *</label>
            <VControl icon="ic:baseline-drive-file-rename-outline">
              <input
                v-model="customer.line1"
                type="text"
                class="input is-info-focus"
              />
              <p v-if="errors.line1" class="help is-danger">
                <b>{{ errors.line1 }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>

      <!-- Address line 2 -->
      <div class="column is-6">
        <VField>
          <label>Line 2</label>
          <VControl icon="ic:baseline-drive-file-rename-outline">
            <input
              v-model="customer.line2"
              type="text"
              class="input is-info-focus"
            />
            <p v-if="errors.line2" class="help is-danger">
              <b>{{ errors.line2 }}</b>
            </p>
          </VControl>
        </VField>
      </div>

      <ValidationField
        v-model="customer.postal"
        :validate-on-input="false"
        name="postal"
      >
        <div class="column is-6">
          <VField>
            <label>Postal *</label>
            <VControl icon="ic:baseline-drive-file-rename-outline">
              <input
                v-model="customer.postal"
                type="number"
                class="input is-info-focus"
              />
              <p v-if="errors.postal" class="help is-danger">
                <b>{{ errors.postal }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>
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
            <VIMaskInput
              v-model="customer.mobile"
              class="input"
              :options="{
                mask: '{63} 0 000 000 000',
              }"
              placeholder="+63 9 000-000-000"
            />

            <p v-if="errors.mobile" class="help is-danger">
              <b>{{ errors.mobile }}</b>
            </p>
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
            <p v-if="errors.telephone" class="help is-danger">
              <b>{{ errors.telephone }}</b>
            </p>
          </VControl>
        </VField>
      </div>
    </div>

    <!-- Button -->
    <VField class="fixed-buttons is-active">
      <VControl class="fixed-buttons-inner">
        <VButton
          color="info"
          type="submit"
          :loading="isUpdating"
          bold
          fullwidth
          raised
        >
          Update
        </VButton>
      </VControl>
    </VField>
  </ValidationForm>
</template>
