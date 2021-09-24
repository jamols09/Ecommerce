<script setup lang="ts">
import { ref, computed, reactive, Ref } from 'vue'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { TreeOptions, PromoType, StartEndDate } from '/@src/models/promo/promo'
pageTitle.value = 'Flash Deals'

const promo_amount: Ref<number | undefined> = ref()
const flash_type: Ref<PromoType> = ref('raw')
const flash_options: Ref<string[]> = ref([])
const isSpecific = computed((): boolean => {
  if (flash_options.value.length) {
    return flash_options.value.includes('specific')
  }
  return false
})

const date = ref<StartEndDate>({
  start: new Date(),
  end: new Date(),
})

// Typescript Sample
// const category = reactive<{ options: object[], value: object[] }>({
//   options: [
//     {
//       id: 'a',
//       label: 'a',
//       children: [
//         { id: 'aa', label: 'aa' },
//         { id: 'ab', label: 'ab' },
//       ],
//     },
//     { id: 'b', label: 'b' },
//     { id: 'c', label: 'c' },
//   ],
//   value: []
// })

const category = reactive<TreeOptions>({
  options: [
    {
      id: 'a',
      label: 'a',
      children: [
        { id: 'aa', label: 'aa' },
        { id: 'ab', label: 'ab' },
      ],
    },
    { id: 'b', label: 'b' },
    { id: 'c', label: 'c' },
  ],
  value: [],
})
const branch = reactive<TreeOptions>({
  options: [
    { id: 'a', label: 'branch - a' },
    { id: 'b', label: 'branch - b' },
    { id: 'c', label: 'branch - c' },
  ],
  value: [],
})
const tag = reactive<TreeOptions>({
  options: [
    { id: 'a', label: 'tag - a' },
    { id: 'b', label: 'tag - b' },
    { id: 'c', label: 'tag - c' },
  ],
  value: [],
})
const item = reactive<TreeOptions>({
  options: [
    { id: 'a', label: 'Item 1' },
    { id: 'b', label: 'Item 2' },
    { id: 'c', label: 'Item 3' },
  ],
  value: [],
})
</script>

<template>
  <div class="page-content-inner">
    <div class="form-layout is-stacked">
      <div class="form-outer">
        <div class="form-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>Flash Deals</h3>
            </div>
          </div>
        </div>
        <div class="form-body">
          <div class="form-section is-grey">
            <div class="columns is-multiline">
              <!-- Active -->
              <div class="column is-12">
                <V-Field>
                  <V-Control>
                    <V-Checkbox
                      v-model="flash_options"
                      value="active"
                      label="Active"
                      color="info"
                    />
                    <V-Checkbox
                      v-model="flash_options"
                      value="specific"
                      label="With Conditions"
                      color="info"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Flash Type -->
              <div class="column is-6">
                <V-Field addons>
                  <V-Control class="has-icons-left">
                    <span class="select">
                      <select v-model="flash_type">
                        <option value="percent">Percent</option>
                        <option value="raw">Raw</option>
                      </select>
                    </span>
                    <div class="icon is-small is-left">
                      <i
                        class="fas"
                        :class="
                          flash_type === 'percent'
                            ? 'fa-percentage'
                            : 'fa-asterisk'
                        "
                      ></i>
                    </div>
                  </V-Control>
                  <V-Control expanded>
                    <input
                      v-model="promo_amount"
                      type="number"
                      class="input is-info-focus"
                      placeholder="Amount"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Start Date & End Date -->
              <v-date-picker
                v-model="date"
                is-range
                color="blue"
                trim-weeks
                class="column is-12"
              >
                <template #default="{ inputValue, inputEvents }">
                  <div class="columns v-calendar-combo">
                    <div class="column is-6">
                      <V-Field>
                        <label>Start date</label>
                        <V-Control icon="feather:calendar">
                          <input
                            placeholder="Start Date"
                            :value="inputValue.start"
                            class="input form-datepicker is-info-focus"
                            v-on="inputEvents.start"
                          />
                        </V-Control>
                      </V-Field>
                    </div>
                    <div class="column is-6">
                      <V-Field>
                        <label>End date</label>
                        <V-Control icon="feather:calendar">
                          <input
                            placeholder="End Date"
                            :value="inputValue.end"
                            class="input form-datepicker is-info-focus"
                            v-on="inputEvents.end"
                          />
                        </V-Control>
                      </V-Field>
                    </div>
                  </div>
                </template>
              </v-date-picker>
              <!-- Start Time -->
              <v-date-picker
                v-model="date.start"
                class="column is-6"
                color="blue"
                mode="time"
                is24hr
              >
                <template #default="{ inputValue, inputEvents }">
                  <V-Field class="mb-0">
                    <label>Start time</label>
                    <V-Control>
                      <input
                        class="input form-timepicker is-info-focus"
                        :value="inputValue"
                        v-on="inputEvents"
                      />
                    </V-Control>
                  </V-Field>
                </template>
              </v-date-picker>
              <!--  End Time  -->
              <v-date-picker
                v-model="date.end"
                class="column is-6"
                color="blue"
                mode="time"
                is24hr
              >
                <template #default="{ inputValue, inputEvents }">
                  <V-Field class="mb-0">
                    <label>End time</label>
                    <V-Control>
                      <input
                        class="input form-timepicker is-info-focus"
                        :value="inputValue"
                        v-on="inputEvents"
                      />
                    </V-Control>
                  </V-Field>
                </template>
              </v-date-picker>
              <!-- Branch Options -->
              <div class="column is-6">
                <V-Field v-show="isSpecific">
                  <label>Flash Condition - Branch</label>
                  <V-Control>
                    <Treeselect
                      v-model="branch.value"
                      :multiple="true"
                      :options="branch.options"
                      :limit="2"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Tags Options -->
              <div class="column is-6">
                <V-Field v-show="isSpecific">
                  <label>Flash Condition - Tags</label>
                  <V-Control>
                    <Treeselect
                      v-model="tag.value"
                      :multiple="true"
                      :options="tag.options"
                      :limit="2"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Category Options -->
              <div class="column is-6">
                <V-Field v-show="isSpecific">
                  <label>Flash Condition - Category</label>
                  <V-Control>
                    <Treeselect
                      v-model="category.value"
                      :multiple="true"
                      :options="category.options"
                      :limit="2"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Items Options -->
              <div class="column is-6">
                <V-Field v-show="isSpecific">
                  <label>Flash Condition - Item</label>
                  <V-Control>
                    <Treeselect
                      v-model="item.value"
                      :multiple="true"
                      :options="item.options"
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
