<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import { ProductPricingSchema } from '/@src/schema/ProductSchema'
import { useProductStore } from '/@src/state/products/'
import { Form as ValidationForm, Field as ValidationField } from 'vee-validate'

const notyf = useNotyf()
const product = useProductStore()
const isSubmitting = ref(false)
const isUpdating = ref(false)
const options = ref<Array<string>>([])

const onUpdate = async (inputs: any) => {
  product.FILL_TAB_PRICE({
    options: inputs.options,
    price: inputs.price,
  })
  isSubmitting.value = false
  notyf.success('Product updated')
}
const onSubmit = async () => {
  //Check required fields
  if (
    product.images.length > 0 ||
    product.department.length > 0 ||
    product.name.length > 0 ||
    product.description.length > 0 ||
    product.branches.length > 0
  ) {
    notyf.success(`Product <b><u>${product.name}</u></b> created!`)
  } else {
    notyf.error('Please fill up required fields.')
  }
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
