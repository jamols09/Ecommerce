<script setup lang="ts">
import { ref, onMounted, watchEffect, computed } from 'vue'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { Form as ValidationForm, Field as ValidationField } from 'vee-validate'
import { CategoryForm } from '/@src/schema/CategorySchema'
import { parent } from '/@src/static/product'
import { useCategory } from '/@src/composable/api/useCategory'
import { useRoute } from 'vue-router'

pageTitle.value = 'Edit Category'

const route = useRoute()
const api = useCategory()
const category = ref({
  name: '',
  parent_id: null,
})

const onSubmit = async (inputs: typeof CategoryForm) => {
  await api.update(inputs, route.params.id)
}

onMounted(async () => {
  await api.dropdown()
  await api.details(route.params.id)
  const { data } = api.detailsResponse.value
  category.value = data
  category.value.parent_id ? (parent.value = category.value.parent_id) : null
})
</script>

<template>
  <ValidationForm
    v-slot="{ errors }"
    :validation-schema="CategoryForm"
    @submit="onSubmit"
  >
    <div class="page-content-inner">
      <div class="form-layout is-stacked">
        <div class="form-outer">
          <div class="form-header">
            <div class="form-header-inner">
              <div class="left">
                <h3>Category</h3>
              </div>
            </div>
          </div>
          <div class="form-body">
            <VLoader
              :active="api.isLoading.value"
              :translucent="true"
              :grey="true"
              card="regular"
              size="small"
            >
              <div class="form-section is-grey">
                <div class="columns is-multiline">
                  <!-- Name -->
                  <div class="column is-6">
                    <ValidationField
                      v-model="category.name"
                      :validate-on-input="false"
                      name="name"
                    >
                      <VField>
                        <label> Name * </label>
                        <VControl icon="ic:baseline-drive-file-rename-outline">
                          <input
                            v-model="category.name"
                            type="text"
                            class="input is-info-focus"
                          />
                          <p v-if="errors.name" class="help is-danger">
                            <b>{{ errors.name }}</b>
                          </p>
                        </VControl>
                      </VField>
                    </ValidationField>
                  </div>

                  <!-- Parent -->
                  <div class="column is-6">
                    <ValidationField
                      v-model="parent.value"
                      :validate-on-input="false"
                      name="parent_id"
                    >
                      <VField>
                        <label>
                          Parent
                          <VueTooltip
                            label="Restricted to 1 parent for each node."
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
                            v-model="parent.value"
                            :options="api.dropdownResponse.value"
                            :loading="api.isLoading.value"
                            :searchable="true"
                          >
                          </Multiselect>
                          <p v-if="errors.parent" class="help is-danger">
                            <b>{{ errors.parent }}</b>
                          </p>
                        </VControl>
                      </VField>
                    </ValidationField>
                  </div>
                </div>
              </div>
            </VLoader>
          </div>
        </div>
      </div>
    </div>

    <!-- Button -->
    <VField class="fixed-buttons is-active">
      <VControl class="fixed-buttons-inner">
        <VButton
          type="submit"
          color="primary"
          :loading="api.isLoading.value"
          bold
          fullwidth
          raised
        >
          Submit
        </VButton>
      </VControl>
    </VField>
  </ValidationForm>
</template>

<style lang="scss">
@import '../../../../scss/abstracts/_variables.scss';
@import '../../../../scss/abstracts/_mixins.scss';
@import '../../../../scss/pages/generic/_forms.scss';
@import '../../../../scss/extensions/_treeselect.scss';

@media only screen and (min-width: 767px) {
  .v-calendar-combo {
    margin: 0 !important;

    .column {
      padding-top: 0 !important;
      padding-bottom: 0 !important;

      &:first-child {
        padding-left: 0 !important;
      }
      &:last-child {
        padding-right: 0 !important;
      }
    }
  }
}
</style>
