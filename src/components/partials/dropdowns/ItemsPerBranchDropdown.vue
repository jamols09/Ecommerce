<script setup lang="ts">
import { ref } from 'vue'

interface IDetails {
  item_id: number
  branch_id: number
  id: number
  is_active: number
  is_display_qty: number
  quantity: number
  quantity_warn: number
  price: number
}

interface IActionDropdownProps {
  details: IDetails
  titleDeactivate?: string
  messageDeactivate?: string
  titleEdit?: string
  messageEdit?: string
  editRoute?: string
}

let obj = {}

const props = withDefaults(defineProps<IActionDropdownProps>(), {
  details: () => ({
    item_id: 0,
    branch_id: 0,
    id: 0,
    is_active: 0,
    is_display_qty: 0,
    quantity: 0,
    quantity_warn: 0,
    price: 0,
  }),
  titleDeactivate: 'Deactivate',
  messageDeactivate: 'Change item status',
  titleEdit: 'Edit',
  messageEdit: 'Edit item',
  editRoute: '',
})

const action = ref<Array<number>>([])
const emit = defineEmits(['remove'])

const onRemove = async (e: number) => {
  action.value.push(e)
  emit('remove', action.value)
}

const onDeactivate = async (e: number) => {
  action.value
}
</script>

<template>
  <VDropdown icon="feather:more-vertical" right spaced>
    <template #content>
      <!-- <RouterLink
        :to="{
          path: props.editRoute + props.actionId,
        }"
        role="menuitem"
        class="dropdown-item is-media"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-cog"></i>
        </div>
        <div class="meta">
          <span>{{ props.titleEdit }}</span>
          <span>
            <small>{{ props.messageEdit }}</small>
          </span>
        </div>
      </RouterLink> -->

      <!-- <hr class="dropdown-divider" /> -->
      <template v-if="props.details.is_active === 1">
        <a
          href="#"
          role="menuitem"
          class="dropdown-item is-media"
          @click="onRemove(props.details.id)"
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
          @click="onDeactivate(props.details.id)"
        >
          <div class="icon">
            <i aria-hidden="true" class="lnil lnil-trash-can-alt"></i>
          </div>
          <div class="meta">
            <span>Activate</span>
            <span>
              <small>{{ props.messageDeactivate }}</small>
            </span>
          </div>
        </a>
      </template>
    </template>
  </VDropdown>
</template>
