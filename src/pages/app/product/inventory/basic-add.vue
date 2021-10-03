<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { carouselConfig, ckEditorConfig } from '/@src/defaults/'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import type {
  InventoryTabs,
  Product,
  ProductOptionsArray,
} from '/@src/models/product'
import {
  branch,
  color,
  material,
  size,
  tag,
  department,
  category,
  dimension,
  weight,
} from '/@src/static/product'
import useNotyf from '/@src/composable/useNotyf'
import usePreviewImages from '/@src/composable/usePreviewImages'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { Form, Field } from 'vee-validate'
import { ProductInfoSchema } from '/@src/schema/ProductSchema'

pageTitle.value = 'Create Basic Item'

const { images, uploadImages } = usePreviewImages()
const router = useRouter()
const notyf = useNotyf()
const isLoading = ref(false)
const selectedTab = ref<InventoryTabs>('info')
const productOptions = ref<ProductOptionsArray>([])

const product = reactive<Product>({
  image: [],
  sku: '',
  name: null,
  department: null,
  description: 'Insert short description here.',
  active: false,
  discountable: false,
  displayQuantity: false,
  quantity: 0,
  quantityWarn: 0,
  price: 0,
  tag: [],
  gender: null,
  weight: {
    unit: null,
    amount: 0,
  },
  dimension: {
    unit: null,
    length: 0,
    width: 0,
    height: 0,
  },
})

const branchFunc = (e: any) => {
  e == '-1' && branch.value?.length
    ? (branch.value = branch.value.slice(-1))
    : false
  e !== '-1' && branch.value?.indexOf('-1') === 0
    ? branch.value?.splice(branch.value.indexOf('-1'), 1)
    : false
}
const colorFunc = (e: any) => {
  color.value ? ((color.value.length = 0), color.value.push(e)) : false
}
const materialFunc = (e: any) => {
  material.value ? ((material.value.length = 0), material.value.push(e)) : false
}
const sizeFunc = (e: any) => {
  size.value ? ((size.value.length = 0), size.value.push(e)) : false
}

const infoFunc = async (infoInputs: any) => {
  console.log(infoInputs)
}

const create = async () => {
  isLoading.value = true
  isLoading.value = false
  notyf.success('Item has been added to the list')
  router.push({
    name: 'app-product-inventory-list',
  })
}
</script>

<template>
  <div class="page-content-inner">
    <div class="form-layout is-stacked">
      <div class="form-outer">
        <div class="form-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>Basic Item</h3>
            </div>
          </div>
        </div>
        <div class="form-body">
          <div class="form-section is-grey">
            <div class="columns is-multiline">
              <!-- Tabs -->
              <div class="column is-full">
                <VTabs
                  :selected="selectedTab"
                  :tabs="[
                    { label: 'Info', value: 'info', icon: 'octicon:info-16' },
                    {
                      label: 'Specifications',
                      value: 'specs',
                      icon: 'mdi:form-select',
                    },
                    {
                      label: 'Pricing',
                      value: 'pricing',
                      icon: 'si-glyph:tag-price',
                    },
                  ]"
                  @clicked-tab="selectedTab = $event"
                >
                  <template #tab="{ activeValue }">
                    <!-- Tab 1 -->
                    <div v-if="activeValue === 'info'">
                      <!-- Image Preview -->
                      <div class="columns">
                        <div class="column is-12" style="margin: auto">
                          <VField>
                            <Carousel
                              v-if="images && images.length"
                              :settings="carouselConfig"
                            >
                              <Slide v-for="data in images" :key="data">
                                <div class="carousel__item">
                                  <img
                                    v-if="images"
                                    class="carousel_images"
                                    :src="data"
                                  />
                                </div>
                              </Slide>
                              <template #addons>
                                <Navigation />
                              </template>
                            </Carousel>
                            <Carousel v-else>
                              <Slide v-for="data in 1" :key="data">
                                <div
                                  class="carousel__item static"
                                  style="background-color: #323236"
                                >
                                  <span>
                                    Preview
                                    <br />
                                    <span>
                                      <p style="font-size: 1rem">
                                        (Portrait Recommended)
                                      </p>
                                    </span>
                                  </span>
                                </div>
                              </Slide>
                              <template #addons>
                                <Navigation />
                              </template>
                            </Carousel>
                          </VField>
                        </div>
                      </div>

                      <div class="columns">
                        <!-- File Upload -->

                        <div class="column is-12">
                          <VField grouped>
                            <VControl>
                              <div class="file is-info">
                                <label class="file-label">
                                  <input
                                    class="file-input"
                                    type="file"
                                    name="resume"
                                    accept="image/x-png, image/gif, image/jpeg"
                                    multiple
                                    @change="uploadImages"
                                  />
                                  <span class="file-cta">
                                    <span class="file-icon">
                                      <i class="fas fa-cloud-upload-alt"></i>
                                    </span>
                                    <span class="file-label">Upload image</span>
                                  </span>
                                </label>
                              </div>
                            </VControl>
                          </VField>
                        </div>
                      </div>
                      <Form
                        :validation-schema="ProductInfoSchema"
                        @submit="infoFunc"
                      >
                        <div class="columns">
                          <!-- Department -->
                          <Field
                            v-slot="{ field, errorMessage }"
                            :validate-on-input="false"
                            name="department"
                          >
                            <div class="column is-6">
                              <VField>
                                <label>Department *</label>
                                <VControl>
                                  <Multiselect
                                    v-bind="field"
                                    :options="department.options"
                                  />
                                  <p v-if="errorMessage" class="help is-danger">
                                    <b>{{ errorMessage }}</b>
                                  </p>
                                </VControl>
                              </VField>
                            </div>
                          </Field>
                          <div class="column is-6"></div>
                        </div>

                        <div class="columns">
                          <!-- Name -->
                          <Field
                            v-slot="{ field, errorMessage }"
                            :validate-on-input="false"
                            name="name"
                          >
                            <div class="column is-6">
                              <VField>
                                <label>Name *</label>
                                <VControl>
                                  <input
                                    v-bind="field"
                                    type="text"
                                    class="input is-info-focus"
                                  />
                                  <p v-if="errorMessage" class="help is-danger">
                                    <b>{{ errorMessage }}</b>
                                  </p>
                                </VControl>
                              </VField>
                            </div>
                          </Field>

                          <!-- SKU -->
                          <Field
                            v-slot="{ field, errorMessage }"
                            :validate-on-input="false"
                            name="sku"
                          >
                            <div class="column is-6">
                              <VField>
                                <label>
                                  Stock Keep Unit (SKU)
                                  <VueTooltip
                                    label="Auto generated when empty."
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
                                  <input
                                    v-bind="field"
                                    type="text"
                                    class="input is-info-focus"
                                  />
                                  <p v-if="errorMessage" class="help is-danger">
                                    <b>{{ errorMessage }}</b>
                                  </p>
                                </VControl>
                              </VField>
                            </div>
                          </Field>
                        </div>

                        <div class="columns">
                          <!-- Description -->
                          <Field
                            v-slot="{ field, errorMessage }"
                            :validate-on-value-update="false"
                            name="description"
                          >
                            <div class="column is-full">
                              <VField>
                                <label>Description</label>
                                <VControl>
                                  <ckeditor
                                    v-bind="field"
                                    :editor="ClassicEditor"
                                    :config="ckEditorConfig"
                                  >
                                  </ckeditor>
                                  <p v-if="errorMessage" class="help is-danger">
                                    <b>{{ errorMessage }}</b>
                                  </p>
                                </VControl>
                              </VField>
                            </div>
                          </Field>
                        </div>
                        <VField>
                          <VControl class="login">
                            <VButton
                              type="submit"
                              color="info"
                              bold
                              fullwidth
                              raised
                            >
                              Yawa
                            </VButton>
                          </VControl>
                        </VField>
                      </Form>
                    </div>

                    <!-- Tab 2 -->
                    <div
                      v-else-if="activeValue === 'specs'"
                      class="columns is-multiline"
                    >
                      <!-- Options -->
                      <div class="column is-full">
                        <VField>
                          <VControl>
                            <VCheckbox
                              v-model="productOptions"
                              value="active"
                              label="Active"
                              color="info"
                            />
                            <VCheckbox
                              v-model="productOptions"
                              value="displayQuantity"
                              label="Display Quantity"
                              color="info"
                            />
                            <VueTooltip
                              label="Display quantity on page"
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
                      <!-- Branch -->
                      <div class="column is-6">
                        <VField>
                          <label>Branch</label>
                          <VControl>
                            <Multiselect
                              v-model="branch.value"
                              mode="tags"
                              :close-on-select="false"
                              :create-tag="false"
                              :searchable="true"
                              :options="branch.options"
                              @select="branchFunc($event)"
                            />
                          </VControl>
                        </VField>
                      </div>
                      <div class="column is-6"></div>
                      <!-- Quantity -->
                      <div class="column is-6">
                        <VField>
                          <label>Quantity</label>
                          <VControl>
                            <input
                              v-model="product.quantity"
                              type="number"
                              class="input is-info-focus"
                            />
                          </VControl>
                        </VField>
                      </div>
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
                            <input
                              v-model="product.quantityWarn"
                              type="number"
                              class="input is-info-focus"
                            />
                          </VControl>
                        </VField>
                      </div>
                      <!-- Category -->
                      <div class="column is-6">
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
                      </div>
                      <!-- Tags -->
                      <div class="column is-6">
                        <VField>
                          <label>
                            Tags
                            <VueTooltip
                              label="Search improvement."
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
                              v-model="tag.value"
                              mode="tags"
                              :close-on-select="false"
                              :create-tag="true"
                              :searchable="true"
                              :options="tag.options"
                            />
                          </VControl>
                        </VField>
                      </div>
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
                      <!-- Color -->
                      <div class="column is-6">
                        <VField>
                          <label>Color</label>
                          <VControl>
                            <Multiselect
                              v-model="color.value"
                              :options="color.options"
                              mode="tags"
                              :searchable="true"
                              :create-tag="true"
                              @select="colorFunc($event)"
                            />
                          </VControl>
                        </VField>
                      </div>
                      <!-- Size -->
                      <div class="column is-6">
                        <VField>
                          <label>Size</label>
                          <VControl>
                            <Multiselect
                              v-model="size.value"
                              mode="tags"
                              :options="size.options"
                              :searchable="true"
                              :create-tag="true"
                              @select="sizeFunc($event)"
                            />
                          </VControl>
                        </VField>
                      </div>
                      <!-- Material -->
                      <div class="column is-6">
                        <VField>
                          <label>Material</label>
                          <VControl>
                            <Multiselect
                              v-model="material.value"
                              mode="tags"
                              :options="material.options"
                              :searchable="true"
                              :create-tag="true"
                              @select="materialFunc($event)"
                            />
                          </VControl>
                        </VField>
                      </div>
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
                      <!-- Weight Unit -->
                      <div class="column is-6">
                        <VField>
                          <label>Weight Unit</label>
                          <VControl>
                            <Multiselect
                              v-model="product.weight.unit"
                              :options="weight.options"
                            />
                          </VControl>
                        </VField>
                      </div>
                      <!-- Weight Amount -->
                      <div class="column is-6">
                        <VField>
                          <label>Weight Amount</label>
                          <VControl>
                            <input
                              v-model="product.weight.amount"
                              type="number"
                              class="input is-info-focus"
                            />
                          </VControl>
                        </VField>
                      </div>
                      <!-- Dimension Unit -->
                      <div class="column is-6">
                        <VField>
                          <label>Dimension Unit</label>
                          <VControl>
                            <Multiselect
                              v-model="product.dimension.unit"
                              :options="dimension.options"
                            />
                          </VControl>
                        </VField>
                      </div>
                      <!-- Length -->
                      <div class="column is-6">
                        <VField>
                          <label>Length</label>
                          <VControl>
                            <input
                              v-model="product.dimension.length"
                              type="number"
                              class="input is-info-focus"
                            />
                          </VControl>
                        </VField>
                      </div>
                      <div class="column is-6"></div>
                      <!-- Width -->
                      <div class="column is-6">
                        <VField>
                          <label>Width</label>
                          <VControl>
                            <input
                              v-model="product.dimension.width"
                              type="number"
                              class="input is-info-focus"
                            />
                          </VControl>
                        </VField>
                      </div>
                      <div class="column is-6"></div>
                      <!-- Height -->
                      <div class="column is-6">
                        <VField>
                          <label>Height</label>
                          <VControl>
                            <input
                              v-model="product.dimension.height"
                              type="number"
                              class="input is-info-focus"
                            />
                          </VControl>
                        </VField>
                      </div>
                    </div>
                    <!-- Tab 3 -->
                    <div
                      v-else-if="activeValue === 'pricing'"
                      class="columns is-multiline"
                    >
                      <!-- Discountable -->
                      <div class="column is-full">
                        <VField>
                          <VControl>
                            <VCheckbox
                              v-model="productOptions"
                              value="discountable"
                              label="Discountable"
                              color="info"
                            />
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
                      <!-- Price -->
                      <div class="column is-6">
                        <VField>
                          <label>Price</label>
                          <VControl>
                            <input
                              v-model="product.price"
                              type="number"
                              class="input is-info-focus"
                            />
                          </VControl>
                        </VField>
                      </div>
                    </div>
                  </template>
                </VTabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Fixed Save Buttons-->
    <!-- <div class="fixed-buttons is-active">
      <div class="fixed-buttons-inner">
        <button class="is-info is-elevated button v-button" @click="infoFunc">
          Save
        </button>
      </div>
    </div> -->
  </div>
</template>

<style lang="scss">
/* Separated treeselect due to conflict */
@import '../../../../scss/extensions/_treeselect.scss';
</style>
<style scoped lang="scss">
@import '../../../../scss/abstracts/_variables.scss';
@import '../../../../scss/abstracts/_mixins.scss';
@import '../../../../scss/pages/generic/_forms.scss';

.form-layout {
  max-width: unset;

  .form-body {
    .form-section {
      min-height: 400px;
    }
  }
}

.carousel {
  .carousel_images {
    max-height: 800px;
    margin: 15px;
    border-radius: 6px;
  }
  .carousel__slide {
    padding: 10px;

    .carousel__item {
      min-height: 300px;
      max-height: 800px;
      color: white;
      font-size: 20px;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;

      &.static {
        width: 50%;
      }
    }
  }

  .carousel__prev,
  .carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
  }
}

@media (max-width: 930px) {
  .carousel {
    .carousel__slide {
      .carousel__item {
        &.static {
          width: 80%;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .carousel {
    .carousel__slide {
      .carousel__item {
        &.static {
          width: 90%;
        }
      }
    }
  }
}
</style>
