<template>
  <q-layout view="lHh LpR lFf">
    <q-header reveal class="bg-green-5 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <!-- <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"> -->
          </q-avatar>
          Startup
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="320"
      :breakpoint="500"
      bordered
      class="bg-grey-2"
    >
      <q-scroll-area class="fit">
        <q-list padding>

          <q-item>
            <q-item-section top thumbnail class="q-ml-none" v-if="miniState">
              <!-- <img src="https://cdn.quasar.dev/img/mountains.jpg" width="25px" height="25px" /> -->
            </q-item-section>

            <q-item-section>
              <q-item-label overline class="text-center" v-if="!miniState">Store Name</q-item-label>
            </q-item-section>

          </q-item>

          <MenuList />
          
          <q-separator />
          
          <SettingList />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal class="bg-green-4 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <!-- <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"> -->
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import MenuList from "src/components/Drawer/MenuDrawerList.vue";
import SettingList from "src/components/Drawer/SettingDrawerList.vue";

export default {
  components: {
    SettingList,
    MenuList,
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      miniState: ref(true),
    };
  },
};
</script>

<style lang="sass" scoped>
.q-hoverable:hover
      > .q-focus-helper
        background-color: violet
</style>
