<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { Form as ValidationForm, Field as ValidationField } from 'vee-validate'
import { CategoryForm } from '/@src/schema/CategorySchema'
import useNotyf from '/@src/composable/useNotyf'
import { parent } from '/@src/static/product'
pageTitle.value = 'Create Category'

const notyf = useNotyf()
const route = useRoute()
const isSubmitting = ref(false)
const name = ref('')

const headerName = computed((): string => {
  const name = route.fullPath.split('/').slice(-2, -1)[0] // get 2nd to the last index
  return name.charAt(0).toUpperCase() + name.slice(1)
})

const onSubmit = async (e: any) => {
  isSubmitting.value = true
  if (name.value.length > 0) {
    //api call
    //error
    notyf.success(`Category <b><u>${e.name}</u></b> added.`)
  } else {
    notyf.error('Please fill up required fields.')
  }
  isSubmitting.value = false
}
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
                <h3>{{ headerName }}</h3>
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
                    v-model="name"
                    :validate-on-input="false"
                    name="name"
                  >
                    <V-Field>
                      <label> Name * </label>
                      <V-Control icon="ic:baseline-drive-file-rename-outline">
                        <input
                          v-bind="field"
                          type="text"
                          class="input is-info-focus"
                        />
                        <p v-if="errors.name" class="help is-danger">
                          <b>{{ errors.name }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
                  </ValidationField>
                </div>
                <!-- Parent -->
                <div class="column is-6">
                  <ValidationField
                    v-model="parent.value"
                    :validate-on-input="false"
                    name="parent"
                  >
                    <V-Field>
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
                      <V-Control>
                        <Multiselect
                          v-model="parent.value"
                          :options="parent.options"
                          :searchable="true"
                        />
                        <p v-if="errors.parent" class="help is-danger">
                          <b>{{ errors.parent }}</b>
                        </p>
                      </V-Control>
                    </V-Field>
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
