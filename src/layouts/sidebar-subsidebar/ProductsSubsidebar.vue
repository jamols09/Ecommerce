<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">Products</h3>
      <div class="panel-close" @click="emit('close')">
        <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
      </div>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              <i aria-hidden="true" class="lnil lnil-package pr-3"></i>
              Inventories
              <i
                aria-hidden="true"
                class="iconify"
                data-icon="feather:chevron-right"
              />
            </a>
          </div>
          <ul>
            <li>
              <RouterLink
                :to="{ name: 'app-product-inventory-branch' }"
                class="is-submenu"
                title="Items per branch"
              >
                <i aria-hidden="true" class="lnil lnil-list pr-3"></i>
                Branch
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'app-product-inventory-list' }"
                class="is-submenu"
                title="Overall items"
              >
                <i aria-hidden="true" class="lnil lnil-list pr-3"></i>
                <span>Overall</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'app-product-inventory-selection' }"
                class="is-submenu"
                title="Add inventory"
              >
                <i aria-hidden="true" class="lnil lnil-circle-plus pr-3"></i>
                <span>Add</span>
              </RouterLink>
            </li>
          </ul>
        </li>
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              <i aria-hidden="true" class="lnil lnil-list-alt-1 pr-3"></i>
              Categories
              <i
                aria-hidden="true"
                class="iconify"
                data-icon="feather:chevron-right"
              />
            </a>
          </div>
          <ul>
            <li>
              <RouterLink
                :to="{ name: 'app-product-category-list' }"
                class="is-submenu"
                title="Inventory list"
              >
                <i aria-hidden="true" class="lnil lnil-list pr-3"></i>
                <span>List</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'app-product-category-add' }"
                class="is-submenu"
                title="Add inventory"
              >
                <i aria-hidden="true" class="lnil lnil-circle-plus pr-3"></i>
                <span>Add</span>
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/layout/_sidebar-panel.scss';
</style>
