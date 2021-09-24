<script setup lang="ts">
import { ref } from 'vue'
import { pageTitle } from '/@src/state/sidebarLayoutState'
pageTitle.value = 'Create Order'
</script>

<template>
  <div class="page-content-inner">
    <div class="form-layout is-stacked">
      <div class="form-outer">
        <div class="form-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>Order</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="form-body">
        <div class="form-section is-grey">
          <div class="columns is-multiline">
            <div class="column is-12"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
/* Separated treeselect due to conflict */
@import '../../../scss/extensions/_treeselect.scss';
</style>
<style scoped lang="scss">
@import '../../../scss/abstracts/variables.scss';
@import '../../../scss/abstracts/_mixins.scss';
@import '../../../scss/pages/generic/_forms.scss';

.form-layout {
  max-width: unset;
}
</style>
