<script setup lang="ts">
import useNotyf from '/@src/composable/useNotyf'
import { computed, onMounted, ref } from 'vue'
import { ProductPricingForm } from '/@src/schema/ProductSchema'
import { useProductStore } from '/@src/state/piniaState/productState'
import { Form as ValidationForm, Field as ValidationField } from 'vee-validate'
import { useItem } from '/@src/composable/api/useItem'

const api = useItem()
const notyf = useNotyf()
const product = useProductStore()
const options = ref<Array<string>>([])
const onUpdate = async (e: any) => {
  product.FILL_TAB_PRICE(e)
  notyf.success('Product updated')
}
const onSubmit = async () => {
  if (product.IS_MISSING_FIELDS) {
    const state = {
      ...product.GET_TAB_INFO,
      ...product.GET_TAB_PRICE,
      ...product.GET_TAB_SPECS,
      is_active: product.options.includes('is_active') ?? false,
      is_discountable: product.options.includes('is_discountable') ?? false,
      is_display_qty: product.options.includes('is_display_qty') ?? false,
    }
    const { options, ...data } = state
    await api.create(data)
    // product.$dispose()
    // product.$reset()
    // location.reload()
  } else {
    notyf.error('Please save data by pressing update.')
  }
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
                value="is_discountable"
                label="Discountable"
                color="info"
              />
            </ValidationField>

            <VueTooltip
              label="Allow product to be discounted"
              abbreviation
              :multiline="false"
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
        <VButton color="info" type="submit" bold fullwidth raised>
          Update
        </VButton>
        <VButton
          color="primary"
          :loading="api.isLoading.value"
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
