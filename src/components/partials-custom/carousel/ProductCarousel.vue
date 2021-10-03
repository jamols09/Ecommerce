<script setup lang="ts">
import { ImgHTMLAttributes } from 'vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { carouselConfig } from '/@src/defaults/'

interface ImageProps {
  images: Array<string> | null
}
const props = withDefaults(defineProps<ImageProps>(), {
  images: undefined,
})
</script>
<template>
  <div class="column is-12" style="margin: auto">
    <VField>
      <Carousel v-if="props.images?.length" :settings="carouselConfig">
        <Slide v-for="(data, index) in props.images" :key="index">
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
          <div class="carousel__item static" style="background-color: #323236">
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
</template>

<style scoped lang="scss">
@import '../../../scss/abstracts/_variables.scss';
@import '../../../scss/abstracts/_mixins.scss';
@import '../../../scss/pages/generic/_forms.scss';
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
