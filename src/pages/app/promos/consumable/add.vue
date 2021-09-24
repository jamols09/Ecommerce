<script setup lang="ts">
import { ref, computed, watchEffect, reactive, Ref } from 'vue'
import { useRoute } from 'vue-router'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { StartEndDate, TreeOptions } from '/@src/models/promo'
pageTitle.value = 'Create Limited Promo'

const route = useRoute()
const promo_name = ref<string>('')
const promo_description = ref<string>('')
const promo_type = ref<string>('raw')
const promo_amount = ref<number | undefined>()
const promo_required_amount = ref<number | undefined>()
const promo_quantity = ref<number | undefined>()
const qty_disabled = ref<boolean>(false)
const promo_options: Ref<string[]> = ref([])
const date = ref<StartEndDate>({
  start: new Date(),
  end: new Date(),
})
const uppercase = (): void => {
  promo_name.value = promo_name.value.toUpperCase()
}
const isSpecific = computed((): boolean => {
  if (promo_options.value.length) {
    return promo_options.value.includes('specific')
  }
  return false
})
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
const headerName: Ref<string> = computed(() => {
  const name = route.fullPath.split('/').slice(-2, -1)[0] // get 2nd to the last index -2, -1
  return name.charAt(0).toUpperCase() + name.slice(1)
})
watchEffect(() => {
  if (promo_options.value.includes('unlimited')) {
    promo_quantity.value = 0
    qty_disabled.value = true
  } else {
    qty_disabled.value = false
  }
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
            <div class="columns is-multiline is-centered">
              <div class="column is-12">
                <V-Field>
                  <V-Control>
                    <V-Checkbox
                      v-model="promo_options"
                      value="active"
                      label="Active"
                      color="info"
                    />
                    <V-Checkbox
                      v-model="promo_options"
                      value="unlimited"
                      label="Unlimited"
                      color="info"
                    />
                    <V-Checkbox
                      v-model="promo_options"
                      value="specific"
                      label="With Conditions"
                      color="info"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Promo Value Type -->
              <div class="column is-6">
                <V-Field addons>
                  <V-Control class="has-icons-left">
                    <span class="select">
                      <select v-model="promo_type">
                        <option value="percent">Percent</option>
                        <option value="raw">Raw</option>
                      </select>
                    </span>
                    <div class="icon is-small is-left">
                      <i
                        class="fas"
                        :class="
                          promo_type === 'percent'
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
              <!-- Promo Quantity -->
              <div class="column is-6">
                <V-Field>
                  <V-Control icon="feather:hash">
                    <input
                      v-model="promo_quantity"
                      type="number"
                      class="input is-info-focus"
                      placeholder="Quantity"
                      :disabled="qty_disabled"
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
              <!-- Promo Name -->
              <div class="column is-12">
                <V-Field>
                  <label>Name</label>
                  <V-Control>
                    <input
                      v-model="promo_name"
                      type="text"
                      class="input is-info-focus"
                      @keyup="uppercase"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Promo Description -->
              <div class="column is-12">
                <V-Field>
                  <label>Description</label>
                  <V-Control>
                    <textarea
                      v-model="promo_description"
                      class="textarea is-info-focus"
                      rows="4"
                    ></textarea>
                  </V-Control>
                </V-Field>
              </div>
              <!-- Required Amount -->
              <div class="column is-6">
                <V-Field v-show="isSpecific">
                  <label>Required Amount</label>
                  <V-Control icon="ph:asterisk-bold">
                    <input
                      v-model="promo_required_amount"
                      type="number"
                      class="input is-info-focus"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Branch Options -->
              <div class="column is-6">
                <V-Field v-show="isSpecific">
                  <label>Promo Condition - Branch</label>
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
                  <label>Promo Condition - Tags</label>
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
                  <label>Promo Condition - Category</label>
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
