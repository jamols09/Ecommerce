<script setup lang="ts">
import { ref, watchPostEffect, watch } from 'vue'
import { useRoute } from 'vue-router'

import { activePanel } from '/@src/state/activePanelState'
import { pageTitle } from '/@src/state/sidebarLayoutState'

export type SidebarTheme =
  | 'default'
  | 'color'
  | 'color-curved'
  | 'curved'
  | 'float'
  | 'labels'
  | 'labels-hover'

const props = withDefaults(
  defineProps<{
    theme?: SidebarTheme
    defaultSidebar?: string
    closeOnChange?: boolean
    openOnMounted?: boolean
    nowrap?: boolean
  }>(),
  {
    defaultSidebar: 'dashboard',
    theme: 'curved',
  }
)

const route = useRoute()
const isMobileSidebarOpen = ref(false)
const isDesktopSidebarOpen = ref(props.openOnMounted)
const activeMobileSubsidebar = ref(props.defaultSidebar)

function switchSidebar(id: string) {
  if (id === activeMobileSubsidebar.value) {
    isDesktopSidebarOpen.value = !isDesktopSidebarOpen.value
  } else {
    isDesktopSidebarOpen.value = true
    activeMobileSubsidebar.value = id
  }
}

/**
 * watchPostEffect callback will be executed each time dependent reactive values has changed
 */
watchPostEffect(() => {
  const isOpen = isDesktopSidebarOpen.value
  const wrappers = document.querySelectorAll('.view-wrapper')

  wrappers.forEach((wrapper) => {
    if (isOpen === false) {
      wrapper.classList.remove('is-pushed-full')
    } else if (!wrapper.classList.contains('is-pushed-full')) {
      wrapper.classList.add('is-pushed-full')
    }
  })
})
watch(
  () => route.fullPath,
  () => {
    isMobileSidebarOpen.value = false

    if (props.closeOnChange && isDesktopSidebarOpen.value) {
      isDesktopSidebarOpen.value = false
    }
  }
)
</script>

<template>
  <div class="sidebar-layout">
    <div class="app-overlay"></div>

    <!-- Mobile navigation -->
    <MobileNavbar
      :is-open="isMobileSidebarOpen"
      @toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
    >
      <template #brand>
        <RouterLink :to="{ name: 'index' }" class="navbar-item is-brand">
          <AnimatedLogo width="38px" height="38px" />
        </RouterLink>

        <div class="brand-end">
          <NotificationsMobileDropdown />
          <UserProfileDropdown />
        </div>
      </template>
    </MobileNavbar>

    <!-- Mobile sidebar links -->
    <MobileSidebar
      :is-open="isMobileSidebarOpen"
      @toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
    >
      <template #links>
        <li>
          <RouterLink :to="{ name: 'app' }">
            <i aria-hidden="true" class="iconify" data-icon="feather:home"></i>
          </RouterLink>
        </li>
      </template>

      <template #bottom-links>
        <li>
          <a href="#">
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:settings"
            ></i>
          </a>
        </li>
      </template>
    </MobileSidebar>

    <!-- Mobile subsidebar links -->
    <transition name="slide-x">
      <DashboardsMobileSubsidebar
        v-if="isMobileSidebarOpen && activeMobileSubsidebar === 'dashboard'"
      />
    </transition>

    <!-- Desktop subsidebar links -->
    <Sidebar :theme="props.theme" :is-open="isDesktopSidebarOpen">
      <template #links>
        <!-- Dashboards sidebar -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'pages' && 'is-active']"
            data-content="Pages"
            title="Pages"
            @click="switchSidebar('pages')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:layers"
            ></i>
          </a>
        </li>
        <!-- Orders sidebar -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'orders' && 'is-active']"
            data-content="Orders"
            title="Orders"
            @click="switchSidebar('orders')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:shopping-bag"
            ></i>
          </a>
        </li>
        <!-- Products sidebar -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'products' && 'is-active']"
            data-content="Products"
            title="Products"
            @click="switchSidebar('products')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:box"
            ></i>
          </a>
        </li>
        <!-- Branch sidebar -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'branches' && 'is-active']"
            data-content="Branches"
            title="Branches"
            @click="switchSidebar('branches')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="ps:branch"
            ></i>
          </a>
        </li>
        <!-- People sidebar -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'people' && 'is-active']"
            data-content="People"
            title="People"
            @click="switchSidebar('people')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:users"
            ></i>
          </a>
        </li>
        <!-- Statistics sidebar -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'statistics' && 'is-active']"
            data-content="Statistics"
            title="Statistics"
            @click="switchSidebar('statistics')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:trending-up"
            ></i>
          </a>
        </li>
        <!-- Promos sidebar -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'promos' && 'is-active']"
            data-content="Promos"
            title="Promos"
            @click="switchSidebar('promos')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="tabler:percentage"
            ></i>
          </a>
        </li>
      </template>

      <template #bottom-links>
        <!-- Settings -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'settings' && 'is-active']"
            data-content="Settings"
            title="Settings"
            @click="switchSidebar('settings')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:settings"
            ></i>
          </a>
        </li>

        <!-- Profile Dropdown -->
        <li>
          <UserProfileDropdown up />
        </li>
      </template>
    </Sidebar>

    <transition name="slide-x">
      <!-- Pages subsidebar -->
      <PagesSubsidebar
        v-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'pages'"
        @close="isDesktopSidebarOpen = false"
      />
      <!-- Orders subsidebar -->
      <OrdersSubsidebar
        v-else-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'orders'"
        @close="isDesktopSidebarOpen = false"
      />
      <!-- Products subsidebar -->
      <ProductsSubsidebar
        v-else-if="
          isDesktopSidebarOpen && activeMobileSubsidebar === 'products'
        "
        @close="isDesktopSidebarOpen = false"
      />
      <!-- Products subsidebar -->
      <BranchSubsidebar
        v-else-if="
          isDesktopSidebarOpen && activeMobileSubsidebar === 'branches'
        "
        @close="isDesktopSidebarOpen = false"
      />
      <!-- People subsidebar -->
      <PeopleSubsidebar
        v-else-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'people'"
        @close="isDesktopSidebarOpen = false"
      />
      <!-- Statistics subsidebar -->
      <StatisticsSubsidebar
        v-else-if="
          isDesktopSidebarOpen && activeMobileSubsidebar === 'statistics'
        "
        @close="isDesktopSidebarOpen = false"
      />
      <!-- Promos subsidebar -->
      <PromosSubsidebar
        v-else-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'promos'"
        @close="isDesktopSidebarOpen = false"
      />
      <!-- Settings subsidebar -->
      <SettingsSubsidebar
        v-else-if="isDesktopSidebarOpen && activeMobileSubsidebar == 'settings'"
        @close="isDesktopSidebarOpen = false"
      />
    </transition>

    <LanguagesPanel />

    <div class="view-wrapper">
      <div class="page-content-wrapper">
        <template v-if="props.nowrap">
          <slot></slot>
        </template>
        <div v-else class="page-content is-relative">
          <div class="page-title has-text-centered">
            <!-- Sidebar Trigger -->
            <div
              class="vuero-hamburger nav-trigger push-resize"
              @click="isDesktopSidebarOpen = !isDesktopSidebarOpen"
            >
              <span class="menu-toggle has-chevron">
                <span
                  :class="[isDesktopSidebarOpen && 'active']"
                  class="icon-box-toggle"
                >
                  <span class="rotate">
                    <i aria-hidden="true" class="icon-line-top"></i>
                    <i aria-hidden="true" class="icon-line-center"></i>
                    <i aria-hidden="true" class="icon-line-bottom"></i>
                  </span>
                </span>
              </span>
            </div>

            <div class="title-wrap">
              <h1 class="title is-4">{{ pageTitle }}</h1>
            </div>

            <Toolbar class="desktop-toolbar" />
          </div>

          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
