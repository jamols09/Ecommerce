<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import {
  branch,
  tag,
  category,
  dimension,
  weight,
  color,
  material,
  size,
} from '/@src/static/product'
import { Form as ValidationForm, Field as ValidationField } from 'vee-validate'
import { ProductSpecsForm } from '/@src/schema/ProductSchema'
import { useProductStore } from '/@src/state/piniaState/productState'
import useNotyf from '/@src/composable/useNotyf'
import { useBranch } from '/@src/composable/api/useBranch'

const api = useBranch()
const notyf = useNotyf()
const product = useProductStore()
const option = ref()
const isSubmitting = ref(false)
const options = ref<Array<string>>([])
const stateValue = product.GET_TAB_SPECS

const onGetBranch = async () => {
  await api.dropdown()
  option.value = api.dropdownResponse.value
  api.dropdownResponse.value.length > 0
    ? option.value.push({ value: '-1', label: 'All' })
    : false
}
const onUpdateBranch = (e: any) => {
  e == '-1' && branch.value?.length
    ? (branch.value = branch.value.slice(-1))
    : false
  e !== '-1' && branch.value?.indexOf('-1') === 0
    ? branch.value?.splice(branch.value.indexOf('-1'), 1)
    : false
}
const onUpdateColor = (e: any) => {
  if (color.options.find((a) => a.label === e || a.value === e)) return
  color.options.push({
    value: e,
    label: e.charAt(0).toUpperCase() + e.slice(1),
  })
}
const onUpdateMat = (e: any) => {
  if (material.options.find((a) => a.label === e || a.value === e)) return
  material.options.push({
    value: e,
    label: e.charAt(0).toUpperCase() + e.slice(1),
  })
}
const onCheckSize = (e: any) => {
  if (size.options.find((a) => a.label === e || a.value === e)) return
  size.options.push({
    value: e,
    label: e.charAt(0).toUpperCase() + e.slice(1),
  })
}
const onUpdate = async (inputs: any) => {
  isSubmitting.value = true
  // Save data to state
  product.FILL_TAB_SPECS(inputs)
  isSubmitting.value = false
  notyf.success('Product updated.')
}
onMounted(() => {
  options.value = stateValue.options
})
watchEffect(() => {
  tag.value && tag.value.length > 0 ? false : (tag.value = null)
  size.value && size.value.length > 0 ? false : (size.value = null)
  color.value && color.value.length > 0 ? false : (color.value = null)
  branch.value && branch.value?.length > 0 ? false : (branch.value = null)
  material.value && material.value.length > 0 ? false : (material.value = null)
})
</script>

<template>
  <ValidationForm
    v-slot="{ errors }"
    :validation-schema="ProductSpecsForm"
    @submit="onUpdate"
  >
    <div class="columns">
      <!-- Checkboxes -->
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
                value="is_active"
                label="Active"
                color="info"
              />
            </ValidationField>
            <ValidationField
              v-model="options"
              :validate-on-input="false"
              name="options"
            >
              <VCheckbox
                v-model="options"
                value="is_display_qty"
                label="Display Quantity"
                color="info"
              />
            </ValidationField>
          </VControl>
        </VField>
      </div>
    </div>

    <div class="columns">
      <!-- Branch -->
      <ValidationField
        v-model="branch.value"
        :validate-on-input="false"
        name="branches"
      >
        <div class="column is-6">
          <VField>
            <label>Branch *</label>
            <VControl>
              <Multiselect
                v-model="branch.value"
                mode="tags"
                :close-on-select="false"
                :create-tag="false"
                :searchable="true"
                :options="option"
                :loading="api.isLoading.value"
                @open="onGetBranch"
                @select="onUpdateBranch($event)"
              />
              <p v-if="errors.branches" class="help is-danger">
                <b>{{ errors.branches }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>
      <div class="column is-6"></div>
    </div>

    <div class="columns">
      <ValidationField
        v-slot="{ field }"
        v-model="stateValue.quantity"
        :validate-on-input="false"
        name="quantity"
      >
        <!-- Quantity -->
        <div class="column is-6">
          <VField>
            <label>Quantity</label>
            <VControl>
              <input v-bind="field" type="number" class="input is-info-focus" />
              <p v-if="errors.quantity" class="help is-danger">
                <b>{{ errors.quantity }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>

      <ValidationField
        v-slot="{ field }"
        v-model="stateValue.quantity_warn"
        :validate-on-input="false"
        name="quantity_warn"
      >
        <!-- Quantity Warn -->
        <div class="column is-6">
          <VField>
            <label>
              Quantity Warn
              <VueTooltip
                label="Notify when quantity is reached."
                abbreviation
                :multiline="false"
                size="is-small"
                class="light-text mr-3"
                position="is-bottom"
              >
                <b>?</b>
              </VueTooltip>
            </label>
            <VControl>
              <input v-bind="field" type="number" class="input is-info-focus" />
              <p v-if="errors.quantity_warn" class="help is-danger">
                <b>{{ errors.quantity_warn }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>
    </div>

    <div class="columns">
      <!-- Category -->
      <!-- <div class="column is-6">
        <VField>
          <label>Category</label>
          <VControl>
            <Treeselect 
              v-model="category.value"
              :multiple="false"
              :options="category.options"
              :limit="2"
            />
          </VControl>
        </VField>
      </div> -->

      <!-- 
        <ValidationField
        v-model="tag.value"
        :validate-on-input="false"
        name="tags"
      > -->
    </div>

    <div class="columns">
      <!-- Attributes -->
      <div class="column is-full">
        <VField>
          <VControl>
            <div class="fieldset-heading my-3">
              <h4
                class="has-text-weight-semibold"
                style="font-family: Montserrat, sans-serif"
              >
                Attributes
              </h4>
            </div>
          </VControl>
        </VField>
      </div>
    </div>

    <div class="columns">
      <ValidationField
        v-model="color.value"
        :validate-on-input="false"
        name="color"
      >
        <!-- Color -->
        <div class="column is-6">
          <VField>
            <label>
              Color
              <VueTooltip
                label="Type and press enter to add color."
                abbreviation
                :multiline="false"
                size="is-small"
                class="light-text mr-3"
                position="is-bottom"
              >
                <b>?</b>
              </VueTooltip>
            </label>
            <VControl>
              <Multiselect
                v-model="color.value"
                :options="color.options"
                :searchable="true"
                :create-tag="true"
                @select="onUpdateColor($event)"
              />
              <p v-if="errors.color" class="help is-danger">
                <b>{{ errors.color }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>

      <ValidationField
        v-model="size.value"
        :validate-on-input="false"
        name="size"
      >
        <!-- Size -->
        <div class="column is-6">
          <VField>
            <label>
              Size
              <VueTooltip
                label="Type and press enter to add size."
                abbreviation
                :multiline="false"
                size="is-small"
                class="light-text mr-3"
                position="is-bottom"
              >
                <b>?</b>
              </VueTooltip>
            </label>
            <VControl>
              <Multiselect
                v-model="size.value"
                :options="size.options"
                :searchable="true"
                :create-tag="true"
                @select="onCheckSize($event)"
              />
            </VControl>
          </VField>
        </div>
      </ValidationField>
    </div>

    <div class="columns">
      <ValidationField
        v-model="material.value"
        :validate-on-input="false"
        name="material"
      >
        <!-- Material -->
        <div class="column is-6">
          <VField>
            <label>
              Material
              <VueTooltip
                label="Type and press enter to add material"
                abbreviation
                :multiline="false"
                size="is-small"
                class="light-text mr-3"
                position="is-bottom"
              >
                <b>?</b>
              </VueTooltip></label
            >
            <VControl>
              <Multiselect
                v-model="material.value"
                :options="material.options"
                :searchable="true"
                :create-tag="true"
                @select="onUpdateMat($event)"
              />
            </VControl>
          </VField>
        </div>
      </ValidationField>
    </div>

    <div class="columns">
      <!-- Measurements -->
      <div class="column is-full">
        <VField>
          <VControl>
            <div class="fieldset-heading my-3">
              <h4
                class="has-text-weight-semibold"
                style="font-family: Montserrat, sans-serif"
              >
                Measurements
              </h4>
            </div>
          </VControl>
        </VField>
      </div>
    </div>

    <div class="columns">
      <ValidationField
        v-model="stateValue.weight_unit"
        :validate-on-input="false"
        name="weight_unit"
      >
        <!-- Weight Unit -->
        <div class="column is-6">
          <VField>
            <label>Weight Unit</label>
            <VControl>
              <Multiselect
                v-model="stateValue.weight_unit"
                :options="weight.options"
              />
            </VControl>
          </VField>
        </div>
      </ValidationField>

      <ValidationField
        v-slot="{ field }"
        v-model="stateValue.weight_amount"
        :validate-on-input="false"
        name="weight_amount"
      >
        <!-- Weight Amount -->
        <div class="column is-6">
          <VField>
            <label>Weight Amount</label>
            <VControl>
              <input v-bind="field" type="number" class="input is-info-focus" />
              <p v-if="errors.weight_amount" class="help is-danger">
                <b>{{ errors.weight_amount }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>
    </div>

    <div class="columns">
      <ValidationField
        v-model="stateValue.dimension_unit"
        :validate-on-input="false"
        name="dimension_unit"
      >
        <!-- Dimension Unit -->
        <div class="column is-6">
          <VField>
            <label>Dimension Unit</label>
            <VControl>
              <Multiselect
                v-model="stateValue.dimension_unit"
                :options="dimension.options"
              />
            </VControl>
          </VField>
        </div>
      </ValidationField>

      <ValidationField
        v-slot="{ field }"
        v-model="stateValue.length"
        :validate-on-input="false"
        name="length"
      >
        <!-- Length -->
        <div class="column is-6">
          <VField>
            <label>Length</label>
            <VControl>
              <input v-bind="field" type="number" class="input is-info-focus" />
              <p v-if="errors.length" class="help is-danger">
                <b>{{ errors.length }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>
    </div>

    <div class="columns">
      <div class="column is-6"></div>
      <ValidationField
        v-slot="{ field }"
        v-model="stateValue.width"
        :validate-on-input="false"
        name="width"
      >
        <!-- Width -->
        <div class="column is-6">
          <VField>
            <label>Width</label>
            <VControl>
              <input v-bind="field" type="number" class="input is-info-focus" />
              <p v-if="errors.width" class="help is-danger">
                <b>{{ errors.width }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>
    </div>

    <div class="columns">
      <div class="column is-6"></div>
      <ValidationField
        v-slot="{ field }"
        v-model="stateValue.height"
        :validate-on-input="false"
        name="height"
      >
        <!-- Height -->
        <div class="column is-6">
          <VField>
            <label>Height</label>
            <VControl>
              <input v-bind="field" type="number" class="input is-info-focus" />
              <p v-if="errors.height" class="help is-danger">
                <b>{{ errors.height }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>
    </div>

    <VField class="fixed-buttons is-active">
      <VControl class="fixed-buttons-inner">
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
<style scoped>
.input-tag-wrapper {
  background-color: rgb(40 40 43);
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 1;
  border-radius: 6px;
}
.input-tags {
  align-items: center;
  padding: 3px 2px;
  margin: 2px 3px;
  color: white;
  justify-content: center;

  span {
    &.tag-text {
      margin: auto 2px;
      padding: auto 2px;
    }
  }
  &:hover {
    cursor: pointer;
    background-color: #3b3b41;
    border-radius: 3px;
  }
  .tag-icons {
    cursor: pointer;
  }
}
</style>
