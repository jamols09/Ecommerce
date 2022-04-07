<script setup lang="ts">
import { ref } from 'vue'

interface IActionDropdownProps {
  titleDeactivate?: string
  messageDeactivate?: string
  titleEdit?: string
  messageEdit?: string
  editRoute?: string
  itemId?: number
  id: number
  isActive: number
  isDisplayQty: number
  quantity: number
  quantityWarn: number
  price: number
}

const props = withDefaults(defineProps<IActionDropdownProps>(), {
  titleDeactivate: 'Deactivate',
  messageDeactivate: 'Change item status',
  titleEdit: 'Edit',
  messageEdit: 'Edit item',
  editRoute: '',
  itemId: 0,
  id: 0,
  isActive: 0,
  isDisplayQty: 0,
  quantity: 0,
  quantityWarn: 0,
  price: 0,
})

const action = ref<Array<number>>([])
const emit = defineEmits(['remove', 'status'])

const onRemove = async (e: number) => {
  action.value.push(e)
  emit('remove', action.value)
}

const onStatus = async (id: number) => {
  emit('status', { id: id, is_active: props.isActive === 1 ? 0 : 1 })
}
</script>

<template>
  <VDropdown icon="feather:more-vertical" right spaced>
    <template #content>
      <a
        href="#"
        role="menuitem"
        class="dropdown-item is-media"
        @click="onStatus(props.id)"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-trash-can-alt"></i>
        </div>
        <div class="meta">
          <span>
            {{ props.isActive === 1 ? props.titleDeactivate : 'Activate' }}
          </span>
          <span>
            <small>{{ props.messageDeactivate }}</small>
          </span>
        </div>
      </a>
    </template>
  </VDropdown>
</template>
