<script setup lang="ts">
import { ref, computed, watchEffect, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import {
  TreeOptions,
  PromoRecurring,
  PromoOptionsArray,
} from '/@src/models/promo'
pageTitle.value = 'Create Repeating Promo'

const route = useRoute()
const isQuantity = ref<boolean>(false)
const promoOptions = ref<PromoOptionsArray>([])
const promo = reactive<PromoRecurring>({
  active: false,
  unlimited: false,
  specific: false,
  name: '',
  description: '',
  type: 'raw',
  amount: 0,
  quantity: 0,
  requiredAmount: 0,
  repeat: 'every_month',
  date: {
    start: new Date(),
    end: new Date(),
  },
})

const uppercaseFunc = (): void => {
  promo.name = promo.name.toUpperCase()
}

watchEffect(() => {
  if (promoOptions.value.includes('unlimited')) {
    isQuantity.value = true
    promo.quantity = 0
    promo.unlimited = true
  } else {
    promo.unlimited = false
    isQuantity.value = false
  }

  if (promoOptions.value.includes('active')) {
    promo.active = true
  } else {
    promo.active = false
  }

  if (promoOptions.value.includes('specific')) {
    promo.specific = true
  } else {
    promo.specific = false
  }
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
            <div class="columns is-multiline is-centered">
              <div class="column is-12">
                <V-Field>
                  <V-Control>
                    <V-Checkbox
                      v-model="promoOptions"
                      value="active"
                      label="Active"
                      color="info"
                    />
                    <V-Checkbox
                      v-model="promoOptions"
                      value="unlimited"
                      label="Unlimited"
                      color="info"
                    />
                    <V-Checkbox
                      v-model="promoOptions"
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
                      <select v-model="promo.type">
                        <option value="percent">Percent</option>
                        <option value="raw">Raw</option>
                      </select>
                    </span>
                    <div class="icon is-small is-left">
                      <i
                        class="fas"
                        :class="
                          promo.type === 'percent'
                            ? 'fa-percentage'
                            : 'fa-asterisk'
                        "
                      ></i>
                    </div>
                  </V-Control>
                  <V-Control expanded>
                    <input
                      v-model="promo.amount"
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
                      v-model="promo.quantity"
                      type="number"
                      class="input is-info-focus"
                      placeholder="Quantity"
                      :disabled="isQuantity"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Start Date & End Date -->
              <v-date-picker
                v-model="promo.date"
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
                v-model="promo.date.start"
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
              <!-- End Time -->
              <v-date-picker
                v-model="promo.date.end"
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
                      v-model="promo.name"
                      type="text"
                      class="input is-info-focus"
                      @keyup="uppercaseFunc"
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
                      v-model="promo.description"
                      class="textarea is-info-focus"
                      rows="4"
                    ></textarea>
                  </V-Control>
                </V-Field>
              </div>

              <div class="column is-12 p-0">
                <V-Control>
                  <V-Radio
                    v-model="promo.repeat"
                    value="every_week"
                    label="Repeat every week"
                    name="outlined_squared_radio"
                    color="info"
                  />
                  <V-Radio
                    v-model="promo.repeat"
                    value="every_month"
                    label="Repeat every month"
                    name="outlined_squared_radio"
                    color="info"
                  />
                  <V-Radio
                    v-model="promo.repeat"
                    value="every_year"
                    label="Repeat every year"
                    name="outlined_squared_radio"
                    color="info"
                  />
                </V-Control>
              </div>
              <!-- Required Amount -->
              <div class="column is-6">
                <V-Field v-show="promo.specific">
                  <label>Required Amount</label>
                  <V-Control icon="ph:asterisk-bold">
                    <input
                      v-model="promo.requiredAmount"
                      type="number"
                      class="input is-info-focus"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Branch Options -->
              <div class="column is-6">
                <V-Field v-show="promo.specific">
                  <label style="text-decoration: line-through">
                    Promo Condition - Branch
                  </label>
                  <V-Control>
                    <Treeselect
                      v-model="branch.value"
                      :multiple="true"
                      :options="branch.options"
                      :limit="2"
                      :disabled="true"
                    />
                  </V-Control>
                </V-Field>
              </div>
              <!-- Tags Options -->
              <div class="column is-6">
                <V-Field v-show="promo.specific">
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
                <V-Field v-show="promo.specific">
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
