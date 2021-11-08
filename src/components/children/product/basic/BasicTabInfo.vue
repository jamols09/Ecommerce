<script setup lang="ts">
import usePreviewImages from '/@src/composable/usePreviewImages'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { ProductInfoForm } from '/@src/schema/ProductSchema'
import { ckEditorConfig } from '/@src/configs/'
import { department } from '/@src/static/product'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { carouselConfig } from '/@src/configs/'
import { useProductStore } from '/@src/state/piniaState/productState'
import { Form as ValidationForm, Field as ValidationField } from 'vee-validate'
import { onMounted } from 'vue-demi'
import { ref } from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import { useDepartment } from '/@src/composable/api/useDepartment'
import { useBrand } from '/@src/composable/api/useBrand'

const apiBrand = useBrand()
const apiDepartment = useDepartment()
const notyf = useNotyf()
const { images, onUploadImg } = usePreviewImages()
const product = useProductStore()
const stateImage = ref<Array<string>>([])
const stateValue = product.GET_TAB_INFO

const onGetBrand = async () => {
  await apiBrand.dropdown()
}
const onGetDepartment = async () => {
  await apiDepartment.dropdown()
}

const onUpdate = async (inputs: any) => {
  // Convert uploaded image to blob and save it on state
  stateImage.value.length = 0
  inputs.images.forEach((e: any) => {
    stateImage.value.push(URL.createObjectURL(e))
  })
  product.FILL_TAB_INFO({ ...inputs, images: stateImage.value })

  notyf.success('Product updated')
}

onMounted(() => {
  stateValue.images.length > 0 ? (images.value = stateValue.images) : false
})
</script>

<template>
  <ValidationForm
    v-slot="{ errors }"
    :validation-schema="ProductInfoForm"
    @submit="onUpdate"
  >
    <!-- Image Preview -->
    <div class="columns">
      <div class="column is-12" style="margin: auto">
        <VField>
          <Carousel v-if="images?.length" :settings="carouselConfig">
            <Slide v-for="(data, index) in images" :key="index">
              <div class="carousel__item">
                <img class="carousel_images" :src="data" />
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
                    <p style="font-size: 1rem">(Portrait Recommended)</p>
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
      <div class="column is-12">
        <VField grouped>
          <VControl>
            <div class="file">
              <label class="file-label">
                <!-- File Upload -->
                <ValidationField
                  name="images"
                  class="file-input"
                  type="file"
                  rules="image|required"
                  multiple
                  @change="onUploadImg"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-cloud-upload-alt"></i>
                  </span>
                  <span class="file-label">Upload image</span>
                </span>
              </label>
            </div>
            <p v-if="errors.images" class="help is-danger">
              <b>{{ errors.images }}</b>
            </p>
          </VControl>
        </VField>
      </div>
    </div>

    <div class="columns">
      <!-- Department -->
      <ValidationField
        v-model="stateValue.department_id"
        :validate-on-input="false"
        name="department_id"
      >
        <div class="column is-6">
          <VField>
            <label>Department *</label>
            <VControl>
              <Multiselect
                v-model="stateValue.department_id"
                :options="apiDepartment.dropdownResponse.value"
                :loading="apiDepartment.isLoading.value"
                @open="onGetDepartment"
              />
              <p v-if="errors.department_id" class="help is-danger">
                <b>{{ errors.department_id }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>

      <!-- Brand -->
      <ValidationField
        v-model="stateValue.brand_id"
        :validate-on-input="false"
        name="brand_id"
      >
        <div class="column is-6">
          <VField>
            <label>Brand</label>
            <VControl>
              <Multiselect
                v-model="stateValue.brand_id"
                :options="apiBrand.dropdownResponse.value"
                :loading="apiBrand.isLoading.value"
                @open="onGetBrand"
              />
              <p v-if="errors.brand_id" class="help is-danger">
                <b>{{ errors.brand_id }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>
    </div>

    <div class="columns">
      <!-- Name -->
      <ValidationField
        v-slot="{ field }"
        v-model="stateValue.name"
        :validate-on-input="false"
        name="name"
      >
        <div class="column is-6">
          <VField>
            <label>Name *</label>
            <VControl>
              <input v-bind="field" type="text" class="input is-info-focus" />
              <p v-if="errors.name" class="help is-danger">
                <b>{{ errors.name }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>

      <!-- SKU -->
      <ValidationField
        v-slot="{ field }"
        v-model="stateValue.sku"
        :validate-on-input="false"
        name="sku"
      >
        <div class="column is-6">
          <VField>
            <label>
              Stock Keep Unit (SKU)
              <VueTooltip
                label="Must be unique. Auto generated when empty."
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
              <input v-bind="field" type="text" class="input is-info-focus" />
              <p v-if="errors.sku" class="help is-danger">
                <b>{{ errors.sku }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>
    </div>

    <div class="columns">
      <!-- Description -->
      <ValidationField
        v-model="stateValue.description"
        :validate-on-value-update="false"
        name="description"
      >
        <div class="column is-full">
          <VField>
            <label>Description</label>
            <VControl>
              <ckeditor
                v-model="stateValue.description"
                :editor="ClassicEditor"
                :config="ckEditorConfig"
              >
              </ckeditor>
              <p v-if="errors.description" class="help is-danger">
                <b>{{ errors.description }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>
    </div>

    <!-- Button -->
    <VField class="fixed-buttons is-active">
      <VControl class="fixed-buttons-inner">
        <VButton type="submit" color="info" bold fullwidth raised>
          Update
        </VButton>
      </VControl>
    </VField>
  </ValidationForm>
</template>

<style scoped lang="scss">
@import '../../../../scss/abstracts/_variables.scss';
@import '../../../../scss/abstracts/_mixins.scss';
@import '../../../../scss/pages/generic/_forms.scss';
.carousel {
  .carousel_images {
    max-height: 650px;
    margin: 15px;
    border-radius: 6px;
  }
  .carousel__slide {
    padding: 50px;

    .carousel__item {
      min-height: 300px;
      max-height: 630px;
      max-width: 600px;
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
