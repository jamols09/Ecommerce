<script setup lang="ts">
import sleep from '/@src/utils/sleep'
import useNotyf from '/@src/composable/useNotyf'
import { onMounted, ref } from 'vue'
import { ProductPricingForm } from '/@src/schema/ProductSchema'
import { useProductStore } from '/@src/state/piniaState/productState'
import { Form as ValidationForm, Field as ValidationField } from 'vee-validate'

const notyf = useNotyf()
const product = useProductStore()
const isSubmitting = ref(false)
const isUpdating = ref(false)
const options = ref<Array<string>>([])

const onUpdate = async (inputs: any) => {
  product.FILL_TAB_PRICE(inputs)
  notyf.success('Product updated')
}
const onSubmit = async () => {
  isSubmitting.value = true
  if (product.IS_MISSING_FIELDS) {
    notyf.success(`Product <b><u>${product.name}</u></b> added.`)
    product.$dispose()
    product.$reset()
    await sleep(1500)
    location.reload()
  } else {
    notyf.error('Please save data by pressing update.')
  }
  isSubmitting.value = false
}
onMounted(() => {
  options.value = product.options
})
</script>
<template>
  <ValidationForm
    v-slot="{ errors }"
    :validation-schema="ProductPricingForm"
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
        v-model="product.price"
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

    <!-- Button -->
    <VField class="fixed-buttons is-active two">
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
        <VButton
          color="primary"
          :loading="isSubmitting"
          bold
          fullwidth
          raised
          @click="onSubmit"
        >
          Submit
        </VButton>
      </VControl>
    </VField>
  </ValidationForm>
</template>
