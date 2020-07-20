<template>
  <div class="note">
    <div class="container note__wrapper">
      <h2>Создание заметки</h2>
      <hr>
      <form>
        <label class="custom-input">
          <span class="custom-input__description">Название заметки:</span>
          <input @input="handleChangeName" :value="name" class="custom-input__field" type="text"/>
        </label>
        <div class="todo" v-for="(task, index) in tasks" :key="task.id">
          <input @input="handleChangeDoneTask(index, $event)"
                 :checked="task.done" class="custom-checkbox"
                 type="checkbox" :id="`note-checkbox-${index}`">
          <label :for="`note-checkbox-${index}`"/>

          <label class="custom-input">
            <input @input="handleChangeTextTask(index, $event)"
                   :value="task.text" class="custom-input__field"
                   type="text"/>
          </label>

          <v-button :handler-click="() => handleDeleteTask(index)" :icon="icons.TrashIcon"/>
        </div>
        <div class="note__actions">
          <v-button class="note__action note__action--add-task"
                    :icon="icons.PlusIcon"
                    :handler-click="handleAddTask" text="Добавить задачу"/>
          <v-button class="note__action note__action--mini"
                    :handler-click="()=> handleHistoryChange(true)"
                    :disabled="activeHistoryIndex === 0"
                    text="Отменить внесенное изменение" :icon="icons.UndoIcon"/>
          <v-button class="note__action note__action--mini"
                    :disabled="activeHistoryIndex + 1 === historyChange.length"
                    :handler-click="() => handleHistoryChange(false)"
                    text="Повторить отмененное изменение" :icon="icons.RedoIcon"/>
          <v-button :handler-click="handleDeleteNote"
                    text="Удалить" :icon="icons.TrashIcon"/>
          <v-button :handler-click="saveNote" text="Сохранить" :icon="icons.SaveIcon"/>
        </div>
      </form>
    </div>
    <confirm-remove-modal :is-open="isOpenConfirmModal" :handler-click="handleConfirmRemove"/>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import debounce from 'debounce'

import Button from '@/components/common/Button'
import ConfirmRemoveModal from '@/components/modals/ComfirmRemoveModal'

import types from '@/store/types'

import TrashIcon from '@/assets/images/trash-icon.svg'
import RedoIcon from '@/assets/images/redo-icon.svg'
import UndoIcon from '@/assets/images/undo-icon.svg'
import PlusIcon from '@/assets/images/plus-icon.svg'
import SaveIcon from '@/assets/images/save-icon.svg'

export default {
  name: 'Note',
  components: {
    VButton: Button,
    ConfirmRemoveModal
  },
  data: () => ({
    isOpenConfirmModal: false,

    historyChange: [],
    activeHistoryIndex: -1,

    name: '',
    tasks: [],
    icons: {
      TrashIcon,
      UndoIcon,
      RedoIcon,
      PlusIcon,
      SaveIcon
    }
  }),
  computed: {
    isCreateMode() {
      return this.$route.name === 'NoteCreate'
    }
  },
  mounted() {
    if (!this.isCreateMode) {
      const note = this.$store.getters.getNoteById(this.$route.params.id)

      if (!note) return this.$router.push({ name: 'NotFound' })

      this.name = note.name
      this.tasks = JSON.parse(JSON.stringify(note.tasks)) // глубокая копия массива с объектами
    }

    return this.saveState() // for eslint consistent-return
  },
  methods: {
    handleChangeName(e) {
      this.name = e.target.value

      this.saveState()
    },
    handleChangeDoneTask(index, e) {
      this.updateTask('done', index, e.target.checked)

      this.saveState()
    },
    handleChangeTextTask(index, e) {
      this.updateTask('text', index, e.target.value)

      this.saveState()
    },
    updateTask(name, index, value) {
      const tasks = this.tasks.slice()

      tasks[index] = {
        ...tasks[index],
        [name]: value
      }

      this.tasks = tasks
    },
    saveState: debounce(function () {
      this.historyChange = this.historyChange.slice(0, this.activeHistoryIndex + 1)

      this.historyChange.push({
        name: this.name,
        tasks: JSON.parse(JSON.stringify(this.tasks)) // глубокая копия массива с объектами
      })

      this.activeHistoryIndex += 1
    }, 400),
    handleDeleteTask(index) {
      this.tasks.splice(index, 1)
    },
    handleAddTask() {
      this.tasks.push({
        id: uuidv4(),
        done: false,
        text: ''
      })

      this.saveState()
    },
    handleHistoryChange(isUndo) {
      if (isUndo) {
        this.activeHistoryIndex -= 1
      } else {
        this.activeHistoryIndex += 1
      }

      const state = this.historyChange[this.activeHistoryIndex]

      this.name = state.name
      this.tasks = JSON.parse(JSON.stringify(state.tasks)) // глубокая копия массива с объектами
    },
    handleConfirmRemove(isConfirm) {
      this.isOpenConfirmModal = false

      if (!isConfirm) return

      if (!this.isCreateMode) this.$store.commit(types.REMOVE_NOTE, { id: this.$route.params.id })

      this.$router.push({ name: 'Home' })
    },
    handleDeleteNote() {
      this.isOpenConfirmModal = true
    },
    saveNote() {
      const type = this.isCreateMode ? types.ADD_NOTE : types.EDIT_NOTE
      const note = this.isCreateMode ? {
        id: uuidv4(),
        name: this.name,
        tasks: this.tasks
      } : {
        id: this.$route.params.id,
        name: this.name,
        tasks: this.tasks
      }

      this.$store.commit(type, { note })

      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/scss/views/note";
</style>
