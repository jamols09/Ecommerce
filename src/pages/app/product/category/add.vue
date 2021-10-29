<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { Form as ValidationForm, Field as ValidationField } from 'vee-validate'
import { CategoryForm } from '/@src/schema/CategorySchema'
import { parent } from '/@src/static/product'
import { useCategory } from '/@src/composable/api/useCategory'

pageTitle.value = 'Create Category'

const api = useCategory()
const isSubmitting = ref(false)

interface IRCategory {
  id: number
  name: string
}

const onGetParents = async () => {
  await api.fetch()
  parent.options = api.fetchResponse.value.body.map((e: IRCategory) => {
    return { value: e.id, label: e.name }
  })
}

const onSubmit = async (e: typeof CategoryForm) => {
  isSubmitting.value = true
  await api.create(e)
  onGetParents()
  isSubmitting.value = false
}

onMounted(() => {
  onGetParents()
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
            <div class="form-section is-grey">
              <div class="columns is-multiline">
                <!-- Name -->
                <div class="column is-6">
                  <ValidationField
                    v-slot="{ field }"
                    :validate-on-input="false"
                    name="name"
                  >
                    <VField>
                      <label> Name * </label>
                      <VControl icon="ic:baseline-drive-file-rename-outline">
                        <input
                          v-bind="field"
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
                          v-model="parent.value"
                          :options="parent.options"
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
          :loading="isSubmitting"
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
