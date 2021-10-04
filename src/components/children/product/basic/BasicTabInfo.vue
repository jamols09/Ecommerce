<script setup lang="ts">
import usePreviewImages from '/@src/composable/usePreviewImages'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { ProductInfoSchema } from '/@src/schema/ProductSchema'
import { ckEditorConfig } from '/@src/configs/'
import { department } from '/@src/static/product'
import {
  Form as ValidationForm,
  Field as ValidationField,
  ErrorMessage,
} from 'vee-validate'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { carouselConfig } from '/@src/configs/'
import { useProductStore } from '/@src/state/products/'

const { images, uploadImageFunc } = usePreviewImages()
const product = useProductStore()
const stateValue = product.getTabInfo

const infoFunc = async (input: any) => {
  product.fillTabInfo({ ...input })
  console.table(product.getTabInfo)
}
</script>

<template>
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
                Preview {{ product.getTabInfo }}
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
                @change="uploadImageFunc"
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

  <ValidationForm :validation-schema="ProductInfoSchema" @submit="infoFunc">
    <div class="columns">
      <!-- Department -->
      <ValidationField
        v-slot="{ errorMessage }"
        v-model="stateValue.department"
        :validate-on-input="false"
        name="department"
      >
        <div class="column is-6">
          <VField>
            <label>Department *</label>
            <VControl>
              <Multiselect
                v-model="stateValue.department"
                :options="department.options"
              />
              <p v-if="errorMessage" class="help is-danger">
                <b>{{ errorMessage }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>
      <div class="column is-6"></div>
    </div>

    <div class="columns">
      <!-- Name -->
      <ValidationField
        v-slot="{ field, errorMessage }"
        v-model="stateValue.name"
        :validate-on-input="false"
        name="name"
      >
        <div class="column is-6">
          <VField>
            <label>Name *</label>
            <VControl>
              <input v-bind="field" type="text" class="input is-info-focus" />
              <p v-if="errorMessage" class="help is-danger">
                <b>{{ errorMessage }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>

      <!-- SKU -->
      <ValidationField
        v-slot="{ field, errorMessage }"
        v-model="stateValue.sku"
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
              <input v-bind="field" type="text" class="input is-info-focus" />
              <p v-if="errorMessage" class="help is-danger">
                <b>{{ errorMessage }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>
    </div>

    <div class="columns">
      <!-- Description -->
      <ValidationField
        v-slot="{ errorMessage }"
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
              <p v-if="errorMessage" class="help is-danger">
                <b>{{ errorMessage }}</b>
              </p>
            </VControl>
          </VField>
        </div>
      </ValidationField>
    </div>
    <VField>
      <VControl class="login">
        <VButton type="submit" color="info" bold fullwidth raised>
          Yawa
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
    padding: 10px;

    .carousel__item {
      min-height: 300px;
      max-height: 650px;
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
