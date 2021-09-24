<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { carouselConfig, ckEditorConfig } from '/@src/defaults/'
import useNotyf from '/@src/composable/useNotyf'
import usePreviewImages from '/@src/composable/usePreviewImages'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

pageTitle.value = 'Create Basic Item'

const { images, uploadImages } = usePreviewImages()

const router = useRouter()
const notyf = useNotyf()
const isLoading = ref<boolean>(false)
const option = ref<string[]>([])
const productName = ref<string>('')
const productSku = ref<string>('')
const productQuantity = ref<number | undefined>(0)
const productQuantityWarn = ref<number | undefined>(0)
const productPrice = ref<number | undefined>(0)
const editorData = ref(`Insert short description here.`)
const selectedTab = ref('info')

const productCategory = reactive<{ options: object; value: string | null }>({
  options: [{ id: 0, label: 'Category 1' }],
  value: null,
})
const productTag = reactive<{ options: object; value: string | null }>({
  options: [{ id: 0, label: 'Tag 1' }],
  value: null,
})

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
                <V-Tabs
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
                  @clickedTab="selectedTab = $event"
                >
                  <template #tab="{ activeValue }">
                    <div
                      v-if="activeValue === 'info'"
                      class="columns is-multiline"
                    >
                      <!-- Image Preview -->
                      <div
                        class="column is-two-thirds has-text-centered"
                        style="margin: auto"
                      >
                        <V-Field>
                          <Carousel
                            v-if="images && images.length"
                            :settings="carouselConfig"
                          >
                            <slide v-for="data in images" :key="data">
                              <div class="carousel__item">
                                <img
                                  v-if="images"
                                  class="carousel_images"
                                  :src="data"
                                />
                              </div>
                            </slide>
                            <template #addons>
                              <Navigation />
                            </template>
                          </Carousel>
                          <Carousel v-else>
                            <Slide v-for="data in 1" :key="data">
                              <div class="carousel__item static">
                                <span>
                                  Preview
                                  <br />
                                  <span>
                                    <p style="font-size: 1rem">(draggable)</p>
                                  </span>
                                </span>
                              </div>
                            </Slide>
                            <template #addons>
                              <Navigation />
                            </template>
                          </Carousel>
                        </V-Field>
                      </div>
                      <div class="column is-full">
                        <V-Field grouped>
                          <V-Control>
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
                          </V-Control>
                        </V-Field>
                      </div>
                      <!-- Name -->
                      <div class="column is-6">
                        <V-Field>
                          <label>Name</label>
                          <V-Control>
                            <input
                              v-model="productName"
                              type="text"
                              class="input is-info-focus"
                            />
                          </V-Control>
                        </V-Field>
                      </div>
                      <!-- SKU -->
                      <div class="column is-6">
                        <V-Field>
                          <label>Stock Keep Unit (SKU)</label>
                          <V-Control>
                            <input
                              v-model="productSku"
                              type="text"
                              class="input is-info-focus"
                            />
                          </V-Control>
                        </V-Field>
                      </div>
                      <!-- Description -->
                      <div class="column is-full">
                        <V-Field>
                          <label>Description</label>
                          <V-Control>
                            <ckeditor
                              v-model="editorData"
                              :editor="ClassicEditor"
                              :config="ckEditorConfig"
                            ></ckeditor>
                          </V-Control>
                        </V-Field>
                      </div>
                    </div>
                    <div
                      v-else-if="activeValue === 'specs'"
                      class="columns is-multiline"
                    >
                      <!-- Options -->
                      <div class="column is-full">
                        <V-Field>
                          <V-Control>
                            <V-Checkbox
                              v-model="option"
                              value="active"
                              label="Active"
                              color="info"
                            />
                            <V-Checkbox
                              v-model="option"
                              value="display_qty"
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
                          </V-Control>
                        </V-Field>
                      </div>
                      <!-- Quantity -->
                      <div class="column is-6">
                        <V-Field>
                          <label>Quantity</label>
                          <V-Control>
                            <input
                              v-model="productQuantity"
                              type="number"
                              class="input is-info-focus"
                            />
                          </V-Control>
                        </V-Field>
                      </div>
                      <!-- Quantity Warn -->
                      <div class="column is-6">
                        <V-Field>
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
                          <V-Control>
                            <input
                              v-model="productQuantityWarn"
                              type="number"
                              class="input is-info-focus"
                            />
                          </V-Control>
                        </V-Field>
                      </div>
                      <!-- Category -->
                      <div class="column is-6">
                        <V-Field>
                          <label>Category</label>
                          <V-Control>
                            <Treeselect
                              v-model="productCategory.value"
                              :multiple="false"
                              :options="productCategory.options"
                              :limit="2"
                            />
                          </V-Control>
                        </V-Field>
                      </div>
                      <!-- Tags -->
                      <div class="column is-6">
                        <V-Field>
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
                          <V-Control>
                            <Treeselect
                              v-model="productTag.value"
                              :multiple="true"
                              :options="productTag.options"
                              :limit="2"
                            />
                          </V-Control>
                        </V-Field>
                      </div>
                    </div>
                    <div
                      v-else-if="activeValue === 'pricing'"
                      class="columns is-multiline"
                    >
                      <!-- Discountable -->
                      <div class="column is-full">
                        <V-Field>
                          <V-Control>
                            <V-Checkbox
                              v-model="option"
                              value="active"
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
                          </V-Control>
                        </V-Field>
                      </div>
                      <!-- Price -->
                      <div class="column is-6">
                        <V-Field>
                          <label>Price</label>
                          <V-Control>
                            <input
                              v-model="productPrice"
                              type="number"
                              class="input is-info-focus"
                            />
                          </V-Control>
                        </V-Field>
                      </div>
                    </div>
                  </template>
                </V-Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Fixed Save Buttons-->
    <div class="fixed-buttons is-active">
      <div class="fixed-buttons-inner">
        <button class="is-info is-elevated button v-button">Save</button>
      </div>
    </div>
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
    height: 325px;
    margin: 15px;
    border-radius: 6px;
  }
  .carousel__slide {
    padding: 10px;

    .carousel__item {
      min-height: 300px;
      max-height: 350px;
      background-color: #323236;
      color: white;
      font-size: 20px;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;

      &.static {
        width: 100%;
      }
    }
  }

  .carousel__prev,
  .carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
  }
}
</style>
