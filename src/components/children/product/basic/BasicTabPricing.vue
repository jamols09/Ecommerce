<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import { ProductPricingSchema } from '/@src/schema/ProductSchema'
import { useProductStore } from '/@src/state/products/'
import { Form as ValidationForm, Field as ValidationField } from 'vee-validate'

const notyf = useNotyf()
const product = useProductStore()
const isSubmitting = ref(false)
const options = ref<Array<string>>([])
const stateValue = product.GET_TAB_PRICE

const onUpdate = async (inputs: any) => {
  product.FILL_TAB_PRICE({
    options: inputs.options,
    price: inputs.price,
  })
  isSubmitting.value = false
  notyf.success('Updated')
}
onMounted(() => {
  options.value = product.options
})
</script>
<template>
  <ValidationForm
    v-slot="{ errors }"
    :validation-schema="ProductPricingSchema"
    @submit="onUpdate"
  >
    <div class="columns">
      <!-- Discountable -->
      <div class="column is-12">
        <VField>
          <VControl>
            <ValidationField
              v-model="options"
              :validate-on-input="false"
              name="options"
            >
              <VCheckbox
                v-model="options"
                value="discountable"
                label="Discountable"
                color="info"
              />
            </ValidationField>

            <VueTooltip
              label="Allow product to be discounted"
              abbreviation
              :multiline="true"
              size="is-small"
              class="light-text mr-3"
              position="is-bottom"
            >
              <b>?</b>
            </VueTooltip>
          </VControl>
        </VField>
      </div>
    </div>
    <div class="columns">
      <ValidationField
        v-slot="{ field }"
        v-model="stateValue.price"
        :validate-on-input="false"
        name="price"
      >
        <!-- Price -->
        <div class="column is-6">
          <VField>
            <label>Price *</label>
            <VControl>
              <input v-bind="field" type="number" class="input is-info-focus" />
              <p v-if="errors.price" class="help is-danger">
                {{ errors.price }}
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>
    </div>
    <VField>
      <VControl>
        <VButton
          type="submit"
          color="info"
          :loading="isSubmitting"
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
