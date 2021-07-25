<template>
  <q-dialog v-model="icon" style="width: 700px; max-width: 80vw">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <slot name="header">
          <div class="text-h6">Header Title</div>
        </slot>
        <q-space />
        <slot name="icon">
          <q-btn icon="close" flat round dense v-close-popup />
        </slot>
      </q-card-section>
      <q-card-section class="q-pa-lg">
        <slot name="message">Put your message here</slot>
      </q-card-section>
      <q-card-actions class="q-pa-lg" align="center">
        <slot name="button"></slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  setup() {
    const icon = true;
    return {
      icon,
    };
  },
};
</script>
<style scoped></style>
