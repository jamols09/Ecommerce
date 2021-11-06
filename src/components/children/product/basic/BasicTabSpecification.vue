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
import sleep from '/@src/utils/sleep'
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
  option.value.push({ value: '-1', label: 'All' })
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
  await sleep()
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
                value="active"
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
                value="displayQuantity"
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
        v-model="stateValue.quantityWarn"
        :validate-on-input="false"
        name="quantityWarn"
      >
        <!-- Quantity Warn -->
        <div class="column is-6">
          <VField>
            <label>
              Quantity Warn
              <VueTooltip
                label="Notify when quantity is reached."
                abbreviation
                :multiline="true"
                size="is-small"
                class="light-text mr-3"
                position="is-bottom"
              >
                <b>?</b>
              </VueTooltip>
            </label>
            <VControl>
              <input v-bind="field" type="number" class="input is-info-focus" />
              <p v-if="errors.quantityWarn" class="help is-danger">
                <b>{{ errors.quantityWarn }}</b>
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
        name="colors"
      >
        <!-- Color -->
        <div class="column is-6">
          <VField>
            <label>
              Color
              <VueTooltip
                label="Type and press enter to add color."
                abbreviation
                :multiline="true"
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
              <p v-if="errors.colors" class="help is-danger">
                <b>{{ errors.colors }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>

      <ValidationField
        v-model="size.value"
        :validate-on-input="false"
        name="sizes"
      >
        <!-- Size -->
        <div class="column is-6">
          <VField>
            <label>
              Size
              <VueTooltip
                label="Type and press enter to add size."
                abbreviation
                :multiline="true"
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
        name="materials"
      >
        <!-- Material -->
        <div class="column is-6">
          <VField>
            <label>
              Material
              <VueTooltip
                label="Type and press enter to add material"
                abbreviation
                :multiline="true"
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
        v-model="stateValue.weightUnit"
        :validate-on-input="false"
        name="weightUnit"
      >
        <!-- Weight Unit -->
        <div class="column is-6">
          <VField>
            <label>Weight Unit</label>
            <VControl>
              <Multiselect
                v-model="stateValue.weightUnit"
                :options="weight.options"
              />
            </VControl>
          </VField>
        </div>
      </ValidationField>

      <ValidationField
        v-slot="{ field }"
        v-model="stateValue.weightAmount"
        :validate-on-input="false"
        name="weightAmount"
      >
        <!-- Weight Amount -->
        <div class="column is-6">
          <VField>
            <label>Weight Amount</label>
            <VControl>
              <input v-bind="field" type="number" class="input is-info-focus" />
              <p v-if="errors.weightAmount" class="help is-danger">
                <b>{{ errors.weightAmount }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>
    </div>

    <div class="columns">
      <ValidationField
        v-model="stateValue.dimensionUnit"
        :validate-on-input="false"
        name="dimensionUnit"
      >
        <!-- Dimension Unit -->
        <div class="column is-6">
          <VField>
            <label>Dimension Unit</label>
            <VControl>
              <Multiselect
                v-model="stateValue.dimensionUnit"
                :options="dimension.options"
              />
            </VControl>
          </VField>
        </div>
      </ValidationField>

      <ValidationField
        v-slot="{ field }"
        v-model="stateValue.dimensionLength"
        :validate-on-input="false"
        name="dimensionLength"
      >
        <!-- Length -->
        <div class="column is-6">
          <VField>
            <label>Length</label>
            <VControl>
              <input v-bind="field" type="number" class="input is-info-focus" />
              <p v-if="errors.dimensionLength" class="help is-danger">
                <b>{{ errors.dimensionLength }}</b>
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
        v-model="stateValue.dimensionWidth"
        :validate-on-input="false"
        name="dimensionWidth"
      >
        <!-- Width -->
        <div class="column is-6">
          <VField>
            <label>Width</label>
            <VControl>
              <input v-bind="field" type="number" class="input is-info-focus" />
              <p v-if="errors.dimensionWidth" class="help is-danger">
                <b>{{ errors.dimensionWidth }}</b>
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
        v-model="stateValue.dimensionHeight"
        :validate-on-input="false"
        name="dimensionHeight"
      >
        <!-- Height -->
        <div class="column is-6">
          <VField>
            <label>Height</label>
            <VControl>
              <input v-bind="field" type="number" class="input is-info-focus" />
              <p v-if="errors.dimensionHeight" class="help is-danger">
                <b>{{ errors.dimensionHeight }}</b>
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
