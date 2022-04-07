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

let obj = {}

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
const emit = defineEmits(['remove', 'activate'])

const onRemove = async (e: number) => {
  action.value.push(e)
  emit('remove', action.value)
}

const onActivate = async (e: number) => {
  emit('activate', { id: props.id, is_active: props.isActive })
}
</script>

<template>
  <VDropdown icon="feather:more-vertical" right spaced>
    <template #content>
      <template v-if="props.isActive === 1">
        <a
          href="#"
          role="menuitem"
          class="dropdown-item is-media"
          @click="onRemove(props.id)"
        >
          <div class="icon">
            <i aria-hidden="true" class="lnil lnil-trash-can-alt"></i>
          </div>
          <div class="meta">
            <span>{{ props.titleDeactivate }}</span>
            <span>
              <small>{{ props.messageDeactivate }}</small>
            </span>
          </div>
        </a>
      </template>
      <template v-else>
        <a
          href="#"
          role="menuitem"
          class="dropdown-item is-media"
          @click="onActivate(props.id)"
        >
          <div class="icon">
            <i aria-hidden="true" class="lnil lnil-trash-can-alt"></i>
          </div>
          <div class="meta">
            <span> Activate </span>
            <span>
              <small>{{ props.messageDeactivate }}</small>
            </span>
          </div>
        </a>
      </template>
    </template>
  </VDropdown>
</template>
