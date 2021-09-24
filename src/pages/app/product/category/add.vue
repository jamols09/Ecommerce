<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Create Category'

const route = useRoute()

const categoryName = ref('')
const categoryParent = reactive<{ options: object; value: string | null }>({
  options: [
    { id: '0', label: 'Category Parent 1' },
    { id: '1', label: 'Category Parent 2' },
  ],
  value: null,
})
const headerName = computed((): string => {
  const name = route.fullPath.split('/').slice(-2, -1)[0] // get 2nd to the last index -2, -1
  return name.charAt(0).toUpperCase() + name.slice(1)
})
</script>

<template>
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
                <V-Field>
                  <label>Name</label>
                  <V-Control icon="ic:baseline-drive-file-rename-outline">
                    <input
                      v-model="categoryName"
                      type="text"
                      class="input is-info-focus"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Parent -->
              <div class="column is-6">
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
                    <Treeselect
                      v-model="categoryParent.value"
                      :multiple="false"
                      :options="categoryParent.options"
                      :limit="2"
                    />
                  </V-Control>
                </V-Field>
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
