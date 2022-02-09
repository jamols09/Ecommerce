<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { ckEditorConfig } from '/@src/configs/'
import sleep from '/@src/utils/sleep'
import useNotyf from '/@src/composable/useNotyf'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import useItemAttribute from '/@src/composable/useItemAttribute'
import type { GeneralDropdown } from '/@src/models/product'

pageTitle.value = 'Create Item Variation'

const {
  dynamicField,
  addAttribute,
  removeAttribute,
  removeTag,
  addTag,
  capitalText,
} = useItemAttribute()

const notyf = useNotyf()
const router = useRouter()
const isLoading = ref(false)
const isLoadingTable = ref(false)
const isOpenModal = ref(false)
const productVariantName = ref<string>('')
const productDescription = ref(`Insert short description here.`)
const productPrice = ref<number | undefined>()
const productQty = ref<number | undefined>()
const productSku = ref<string | undefined>()
const isDiscountable = ref(['Option 2'])
const isActive = ref([])
const variantValue = ref([])
const selectedTab = ref('info')
const options = ref(['Batman', 'Robin', 'Joker'])

const productVariantCategory = reactive<GeneralDropdown>({
  options: [{ id: 'pants', label: 'Pants' }],
  value: null,
})
const isAllowGenerate = computed(() =>
  dynamicField.length > 0 && productVariantCategory.value !== null
    ? false
    : true
)
const changeTab = async () => {
  isLoadingTable.value = true //loading
  await sleep()
  notyf.success('Table generated.')
  isLoadingTable.value = false //stop loading
  isOpenModal.value = false //close modal
  selectedTab.value = 'table' //set tab destination
}
const showModal = (e: boolean) => {
  isOpenModal.value = e
}
const create = async () => {
  isLoading.value = true
  isLoading.value = false
  notyf.success('Item has been added to the list.')
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
              <h3>Item Variations</h3>
            </div>
          </div>
        </div>
        <div class="form-body">
          <div class="form-section is-grey">
            <div class="columns is-multiline">
              <div class="column is-full">
                <VTabs
                  :selected="selectedTab"
                  :tabs="[
                    { label: 'Info', value: 'info', icon: 'octicon:info-16' },
                    {
                      label: 'Variations',
                      value: 'variations',
                      icon: 'mdi:sitemap',
                    },
                    { label: 'Table', value: 'table', icon: 'mdi:form-select' },
                  ]"
                  @clicked-tab="selectedTab = $event"
                >
                  <template #tab="{ activeValue }">
                    <div
                      v-if="activeValue === 'info'"
                      class="columns is-multiline"
                    >
                      <!-- Name -->
                      <div class="column is-6">
                        <VField>
                          <label>Name *</label>
                          <VControl>
                            <input
                              v-model="productVariantName"
                              type="text"
                              class="input is-info-focus"
                            />
                          </VControl>
                        </VField>
                      </div>
                      <!-- SKU -->
                      <div class="column is-6">
                        <VField>
                          <label>Stock Keep Unit (SKU)</label>
                          <VControl>
                            <input
                              disabled
                              type="text"
                              class="input is-info-focus"
                            />
                          </VControl>
                        </VField>
                      </div>
                      <!-- Description -->
                      <div class="column is-full">
                        <VField>
                          <label>Description</label>
                          <VControl>
                            <ckeditor
                              v-model="productDescription"
                              :editor="ClassicEditor"
                              :config="ckEditorConfig"
                            ></ckeditor>
                          </VControl>
                        </VField>
                      </div>
                    </div>
                    <div
                      v-else-if="activeValue === 'variations'"
                      class="columns is-multiline"
                    >
                      <!-- Category -->
                      <div class="column is-6">
                        <VField>
                          <label>Category</label>
                          <VControl>
                            <Treeselect
                              v-model="productVariantCategory.value"
                              :multiple="false"
                              :options="productVariantCategory.options"
                              :limit="2"
                            />
                          </VControl>
                        </VField>
                      </div>
                      <div class="column is-6"></div>
                      <div class="column is-6">
                        <VAction grey class="mr-4" @click="addAttribute">
                          New Attribute
                        </VAction>
                        <VAction
                          grey
                          :disabled="isAllowGenerate"
                          @click="showModal(true)"
                        >
                          Generate Table
                        </VAction>
                      </div>
                      <div class="column is-6"></div>
                      <template
                        v-for="(field, index) in dynamicField"
                        :key="index"
                      >
                        <!-- Variant Title -->
                        <div class="column is-6">
                          <VField>
                            <VControl>
                              <input
                                v-model="dynamicField[index].attribute"
                                type="text"
                                class="input is-info-focus"
                                placeholder="Size, Taste, etc.."
                                @change="capitalText(index)"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <!-- Variant Attribute -->
                        <div class="column is-5">
                          <VField>
                            <VControl>
                              <div class="input-tag-wrapper">
                                <div
                                  v-for="(tag, tagIdx) in field.value"
                                  :key="tagIdx"
                                  class="input-tags"
                                >
                                  <span class="tag-text">{{ tag }}</span>
                                  <V-Icon
                                    :icon="'jam:close'"
                                    class="tag-icon"
                                    @click="removeTag(index, tagIdx)"
                                  />
                                </div>
                                <input
                                  v-model="field.input"
                                  placeholder="Press enter.."
                                  class="input is-info-focus"
                                  @keyup.enter="addTag(index)"
                                  @blur="addTag(index)"
                                />
                              </div>
                            </VControl>
                          </VField>
                        </div>
                        <div class="column auto">
                          <VField>
                            <VButtons>
                              <VIconButton
                                color="danger"
                                light
                                raised
                                circle
                                icon="feather:x"
                                @click="removeAttribute(index)"
                              />
                            </VButtons>
                          </VField>
                        </div>
                      </template>
                      <div class="column is-12">
                        <VField>
                          <VModal
                            :open="isOpenModal"
                            size="small"
                            actions="center"
                            title="Confirmation"
                            :noclose="true"
                            @close="isOpenModal = false"
                          >
                            <template #content>
                              <VPlaceholderSection
                                title="Generate Table ?"
                                subtitle="The Attributes and Values is fixed once table is generated."
                              />
                            </template>
                            <template #action>
                              <VButton
                                color="primary"
                                raised
                                :loading="isLoadingTable"
                                @click="changeTab"
                              >
                                Confirm
                              </VButton>
                            </template>
                          </VModal>
                        </VField>
                      </div>
                    </div>
                    <div
                      v-else-if="activeValue === 'table'"
                      class="columns is-multiline"
                    >
                      <div
                        class="column is-12 table-container has-slimscroll-h"
                      >
                        <table
                          class="table is-striped is-hoverable is-fullwidth"
                        >
                          <thead>
                            <tr>
                              <th scope="col" style="width: 90px">Active</th>
                              <th scope="col" style="width: 90px">
                                Discountable
                              </th>
                              <th scope="col" style="width: 200px">Size</th>
                              <th scope="col" style="width: 200px">Color</th>
                              <th scope="col" style="width: 180px">Price</th>
                              <th scope="col" style="width: 180px">Qty</th>
                              <th scope="col" style="width: 180px">SKU</th>
                              <th scope="col" style="width: 180px">
                                Auto Generated Name
                              </th>
                              <th scope="col">Images</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <VCheckbox
                                  v-model="isActive"
                                  value="discountable"
                                  label=" "
                                  solid
                                />
                              </td>
                              <td>
                                <VCheckbox
                                  v-model="isDiscountable"
                                  value="discountable"
                                  label=" "
                                  solid
                                />
                              </td>
                              <td>
                                <Multiselect
                                  v-model="variantValue"
                                  :options="options"
                                />
                              </td>
                              <td>
                                <Multiselect
                                  v-model="variantValue"
                                  :options="options"
                                />
                              </td>
                              <td>
                                <input
                                  v-model="productPrice"
                                  type="number"
                                  class="input is-info-focus"
                                />
                              </td>
                              <td>
                                <input
                                  v-model="productQty"
                                  type="number"
                                  class="input is-info-focus"
                                />
                              </td>
                              <td>
                                <input
                                  v-model="productSku"
                                  type="text"
                                  class="input is-info-focus"
                                />
                              </td>
                              <td>
                                <input
                                  v-model="productSku"
                                  type="text"
                                  class="input is-info-focus"
                                />
                              </td>
                              <td>
                                <div class="file">
                                  <label class="file-label">
                                    <input
                                      class="file-input"
                                      type="file"
                                      name="resume"
                                    />
                                    <span class="file-cta">
                                      <span class="file-icon">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                      </span>
                                      <span class="file-label"
                                        >Choose a file…</span
                                      >
                                    </span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <!-- 2nd column -->
                            <tr>
                              <td>
                                <VCheckbox
                                  v-model="isActive"
                                  value="active"
                                  label=" "
                                  solid
                                />
                              </td>
                              <td>
                                <VCheckbox
                                  v-model="isDiscountable"
                                  value="discountable"
                                  label=" "
                                  solid
                                />
                              </td>
                              <td>
                                <Multiselect
                                  v-model="variantValue"
                                  :options="options"
                                />
                              </td>
                              <td>
                                <Multiselect
                                  v-model="variantValue"
                                  :options="options"
                                />
                              </td>
                              <td>
                                <input
                                  v-model="productSku"
                                  type="text"
                                  class="input is-info-focus"
                                />
                              </td>
                              <td>
                                <input
                                  v-model="productVariantName"
                                  type="text"
                                  class="input is-info-focus"
                                />
                              </td>
                              <td>
                                <input
                                  v-model="productVariantName"
                                  type="text"
                                  class="input is-info-focus"
                                />
                              </td>
                              <td>
                                <input
                                  v-model="productVariantName"
                                  type="text"
                                  class="input is-info-focus"
                                />
                              </td>
                              <td>
                                <div class="file">
                                  <label class="file-label">
                                    <input
                                      class="file-input"
                                      type="file"
                                      name="resume"
                                    />
                                    <span class="file-cta">
                                      <span class="file-icon">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                      </span>
                                      <span class="file-label"
                                        >Choose a file…</span
                                      >
                                    </span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
    <div class="fixed-buttons is-active">
      <div class="fixed-buttons-inner">
        <button class="is-info is-elevated button VButton">Save</button>
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

      .table-container {
        overflow-x: auto;
        white-space: nowrap;

        .table {
          min-width: 1200px;
          max-width: 2900px;
          width: auto;
          margin-bottom: 150px;

          .multiselect-options::-webkit-scrollbar {
            max-height: 100px;
            width: 15px !important;
            background: rgb(255 255 255) !important;
          }
        }
      }

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
        // float: left;

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
      }
    }
  }
}
</style>
