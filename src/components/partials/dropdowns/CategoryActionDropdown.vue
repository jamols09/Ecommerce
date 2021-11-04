<script setup lang="ts">
import { ref } from 'vue'
import { useCategory } from '/@src/composable/api/useCategory'

interface IActionDropdown {
  actionId: number
}
const api = useCategory()
const props = withDefaults(defineProps<IActionDropdown>(), {
  actionId: 0,
})
const emit = defineEmits(['remove'])
const action = ref<Array<number>>([])
const onRemove = async (e: number) => {
  action.value.push(e)
  emit('remove', action.value)
}
</script>

<template>
  <VDropdown icon="feather:more-vertical" right spaced>
    <template #content>
      <a href="#" role="menuitem" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-cog"></i>
        </div>
        <div class="meta">
          <span>Edit</span>
          <span>Make Category changes</span>
        </div>
      </a>

      <hr class="dropdown-divider" />

      <a
        href="#"
        role="menuitem"
        class="dropdown-item is-media"
        @click="onRemove(props.actionId)"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-trash-can-alt"></i>
        </div>
        <div class="meta">
          <span>Remove</span>
        </div>
      </a>
    </template>
  </VDropdown>
</template>
