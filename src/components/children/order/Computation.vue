<script setup lang="ts">
import { ref } from 'vue'
import { popovers } from '/@src/data/users/userPopovers'

const hello = ref('world')
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
  </div>
</template>
