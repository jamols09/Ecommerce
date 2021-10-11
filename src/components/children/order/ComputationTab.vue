<script setup lang="ts">
import { ref } from 'vue'
import { popovers } from '/@src/data/users/userPopovers'

const isUpdating = ref(false)
</script>

<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <div class="invoice-body">
        <div class="invoice-card">
          <div class="invoice-section">
            <div class="flex-table">
              <!--Table header-->
              <div class="flex-table-header">
                <span class="is-grow">Product</span>
                <span>Quantity</span>
                <span>Rate</span>
                <span>Subtotal</span>
              </div>
              <!--Table item-->
              <div class="flex-table-item">
                <div class="flex-table-cell is-grow" data-th="Product">
                  <tippy
                    class="has-help-cursor"
                    interactive
                    placement="bottom-start"
                  >
                    <span class="dark-text"> Website Redesign </span>
                    <template #content>
                      <UserPopoverContent :user="popovers.user13" />
                    </template>
                  </tippy>
                </div>

                <div class="flex-table-cell" data-th="Quantity">
                  <span class="light-text">54</span>
                </div>
                <div class="flex-table-cell" data-th="Rate">
                  <span class="dark-inverted">$24</span>
                </div>
                <div class="flex-table-cell has-text-right" data-th="Subtotal">
                  <span class="dark-inverted">$1,296</span>
                </div>
              </div>

              <!--Table item-->
              <div class="flex-table-item">
                <div class="flex-table-cell is-grow" data-th="">
                  <span class="dark-text">Logo Design</span>
                </div>

                <div class="flex-table-cell" data-th="Quantity">
                  <span class="light-text">12</span>
                </div>
                <div class="flex-table-cell" data-th="Rate">
                  <span class="dark-inverted">$24</span>
                </div>
                <div class="flex-table-cell has-text-right" data-th="Subtotal">
                  <span class="dark-inverted">$288</span>
                </div>
              </div>

              <!--Table item-->
              <div class="flex-table-item">
                <div class="flex-table-cell is-grow" data-th="">
                  <span class="dark-text">Custom Illustrations</span>
                </div>

                <div class="flex-table-cell" data-th="Quantity">
                  <span class="light-text">7</span>
                </div>
                <div class="flex-table-cell" data-th="Rate">
                  <span class="dark-inverted">$32</span>
                </div>
                <div class="flex-table-cell has-text-right" data-th="Subtotal">
                  <span class="dark-inverted">$224</span>
                </div>
              </div>
            </div>

            <div class="flex-table sub-table">
              <!--Table item-->
              <div class="flex-table-item">
                <div class="flex-table-cell is-grow is-vhidden" data-th="">
                  <span class="dark-text"> Website Development </span>
                </div>

                <div class="flex-table-cell" data-th="Quantity">
                  <span class="light-text"></span>
                </div>
                <div class="flex-table-cell" data-th="">
                  <span class="table-label">Subtotal</span>
                </div>
                <div class="flex-table-cell has-text-right" data-th="">
                  <span class="table-total dark-inverted"> $1,808 </span>
                </div>
              </div>
              <!--Table item-->
              <div class="flex-table-item">
                <div class="flex-table-cell is-grow is-vhidden" data-th="">
                  <span class="dark-text"> Website Development </span>
                </div>

                <div class="flex-table-cell is-vhidden" data-th="Quantity">
                  <span class="light-text">2</span>
                </div>
                <div class="flex-table-cell" data-th="">
                  <span class="table-label">Taxes</span>
                </div>
                <div class="flex-table-cell has-text-right" data-th="">
                  <span class="table-total dark-inverted"> $273 </span>
                </div>
              </div>
              <!--Table item-->
              <div class="flex-table-item">
                <div class="flex-table-cell is-grow is-vhidden" data-th="">
                  <span class="dark-text"> Website Development </span>
                </div>
                <div class="flex-table-cell cell-end is-vhidden" data-th="Unit">
                  <span class="light-text">hrs</span>
                </div>

                <div class="flex-table-cell" data-th="">
                  <span class="table-label">Total</span>
                </div>
                <div class="flex-table-cell has-text-right" data-th="">
                  <span class="table-total is-bigger dark-inverted"
                    >$2,081</span
                  >
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
          color="primary"
          type="submit"
          :loading="isUpdating"
          bold
          fullwidth
          raised
        >
          Submit
        </VButton>
      </VControl>
    </VField>
  </div>
</template>
<style lang="scss">
/* Separated treeselect due to conflict */
@import '../../../scss/extensions/_treeselect.scss';
</style>
<style scoped lang="scss">
@import '../../../scss/abstracts/_variables.scss';
@import '../../../scss/abstracts/_mixins.scss';
@import '../../../scss/pages/generic/_forms.scss';

/* ==========================================================================
1. Invoice Normal mode
========================================================================== */
.flex-table {
  &.sub-table {
    .flex-table-item {
      padding-top: 0;
      padding-bottom: 0;
      margin-bottom: 0;
      min-height: 40px;
      border: none;

      .table-label {
        font-family: var(--font);
        text-transform: uppercase;
        font-size: 0.8rem;
        color: var(--light-text);
      }

      .table-total {
        font-family: var(--font);
        color: var(--dark-text);
        font-weight: 500;

        &.is-bigger {
          font-size: 1.2rem;
          font-weight: 600;
        }
      }
    }
  }

  .flex-table-header {
    span {
      &:not(:first-child) {
        justify-content: flex-end;
      }
    }
  }

  .flex-table-item {
    .flex-table-cell {
      &:not(:first-child) {
        justify-content: flex-end;
      }
    }
  }
}

/* ==========================================================================
2. Invoice Dark mode
========================================================================== */
.is-dark {
  .flex-table {
    .flex-table-item {
      background: var(--dark-sidebar-light-4);
    }
    &.sub-table {
      .flex-table-item {
        background: var(--dark-sidebar-light-4);
      }
    }
  }
}
</style>
