<template>
  <div class="mini-note">
    <h3 class="mini-note__title">{{ note.name ? note.name : 'Title is empty :(' }}</h3>
    <ul class="mini-note__items" :class="{'mini-note__items--more': note.tasks.length > 4}">
      <li v-for="(task, index) in note.tasks.slice(0, 4)" :key="task.id" class="mini-note__item">
        <input :disabled="true"
               :checked="task.done" class="custom-checkbox"
               type="checkbox" :id="`note-checkbox-${index}`">
        <label :for="`note-checkbox-${index}`"/>

        {{ task.text ? task.text : 'Task is empty :(' }}
      </li>
    </ul>
    <div class="mini-note__actions">
      <v-button :to="{name:'Note', params: {id: note.id} }" text="Изменить" :icon="icons.EditIcon"/>
      <v-button :handler-click="handleRemove" text="Удалить" :icon="icons.TrashIcon"/>
    </div>
    <confirm-remove-modal :handler-click="handleConfirmRemove" :is-open="isOpen"/>
  </div>
</template>

<script>
import Button from '@/components/common/Button'

import types from '@/store/types'

import TrashIcon from '@/assets/images/trash-icon.svg'
import EditIcon from '@/assets/images/edit-icon.svg'
import ConfirmRemoveModal from '@/components/modals/ComfirmRemoveModal'

export default {
  name: 'MiniNote',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  components: {
    ConfirmRemoveModal,
    VButton: Button
  },
  data: () => ({
    isOpen: false,
    icons: {
      TrashIcon,
      EditIcon
    }
  }),
  methods: {
    handleRemove() {
      this.isOpen = true
    },
    handleConfirmRemove(isConfirm) {
      this.isOpen = false

      if (!isConfirm) return

      this.$store.commit(types.REMOVE_NOTE, { id: this.note.id })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/scss/components/mini-note.scss";
</style>
