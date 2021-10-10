<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { CustomerInfo } from '/@src/models/order'
import { Form as ValidationForm, Field as ValidationField } from 'vee-validate'
import { OrderCustomerForm } from '/@src/schema/OrderSchema'
import { useOrderStore } from '/@src/state/piniaState/orderState'
import useNotyf from '/@src/composable/useNotyf'

const notyf = useNotyf()
const isUpdating = ref(false)
const isDisabled = ref(true)
const autofill = ref<HTMLInputElement>()
const order = useOrderStore()

let autocomplete: google.maps.places.Autocomplete
const customer = reactive<CustomerInfo>({
  firstName: '',
  middleName: '',
  lastName: '',
  country: '',
  stateRegion: '',
  province: '',
  city: '',
  barangay: '',
  line1: '',
  line2: '',
  mobile: '',
  telephone: '',
  postal: null,
})

//fill inputs fields from google result
const fillForm = () => {
  let place = autocomplete.getPlace()
  const street = ref('')
  for (const data of place.address_components as google.maps.GeocoderAddressComponent[]) {
    const componentType = data.types[0]
    switch (componentType) {
      case 'street_number': {
        street.value = `${data.long_name} ${street.value}`
        break
      }
      case 'route': {
        customer.line1 = street.value + data.short_name
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
    isDisabled.value = false
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
  //state
  const data = order.GET_CUSTOMER_INFO
  customer.firstName = data.firstName
  customer.middleName = data.middleName
  customer.lastName = data.lastName
  customer.country = data.country
  customer.stateRegion = data.stateRegion
  customer.province = data.province
  customer.barangay = data.barangay
  customer.city = data.city
  customer.line1 = data.line1
  customer.line2 = data.line2
  customer.postal = data.postal
  customer.mobile = data.mobile
  customer.telephone = data.telephone
})

const onUpdate = (inputs: any) => {
  const data = OrderCustomerForm.cast(inputs)
  order.FILL_CUSTOMER_INFO(data)
  notyf.success(`Customer order updated.`)
  console.table(order.GET_CUSTOMER_INFO)
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
        v-model="customer.firstName"
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
        v-model="customer.middleName"
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
        v-model="customer.lastName"
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
              placeholder="Type your address to autofill up"
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
              <input
                v-bind="field"
                :disabled="isDisabled"
                type="text"
                class="input is-info-focus"
              />
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
                :disabled="isDisabled"
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
                :disabled="isDisabled"
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
                :disabled="isDisabled"
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
        v-model="customer.barangay"
        :validate-on-input="false"
        name="barangay"
      >
        <!-- Address line 1 -->
        <div class="column is-6">
          <VField>
            <label>Barangay *</label>
            <VControl icon="ic:baseline-drive-file-rename-outline">
              <input
                v-model="customer.barangay"
                :disabled="isDisabled"
                type="text"
                class="input is-info-focus"
              />
              <p v-if="errors.barangay" class="help is-danger">
                <b>{{ errors.barangay }}</b>
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
                :disabled="isDisabled"
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

      <ValidationField
        v-model="customer.line2"
        :validate-on-input="false"
        name="line2"
      >
        <!-- Address line 2 -->
        <div class="column is-6">
          <VField>
            <label>Line 2</label>
            <VControl icon="ic:baseline-drive-file-rename-outline">
              <input
                v-model="customer.line2"
                :disabled="isDisabled"
                type="text"
                class="input is-info-focus"
              />
              <p v-if="errors.line2" class="help is-danger">
                <b>{{ errors.line2 }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>

      <ValidationField
        v-model="customer.postal"
        :validate-on-input="false"
        name="postal"
      >
        <!-- Postal -->
        <div class="column is-6">
          <VField>
            <label>Postal *</label>
            <VControl icon="ic:baseline-drive-file-rename-outline">
              <input
                v-model="customer.postal"
                :disabled="isDisabled"
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
      <ValidationField
        v-model="customer.mobile"
        :validate-on-input="false"
        name="mobile"
      >
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
      </ValidationField>

      <ValidationField
        v-model="customer.telephone"
        :validate-on-input="false"
        name="telephone"
      >
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
      </ValidationField>
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
