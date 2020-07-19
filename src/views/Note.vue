<template>
  <div class="note">
    <div class="container note__wrapper">
      <h2>Создание заметки</h2>
      <hr>
      <form>
        <label class="custom-input">
          <span class="custom-input__description">Название заметки:</span>
          <input @change="handleChangeName" :value="name" class="custom-input__field" type="text"/>
        </label>
        <div class="todo" v-for="(task, index) in tasks" :key="task.id">
          <input @change="handleChangeDoneTask(index, $event)"
                 :value="task.done" class="custom-checkbox"
                 type="checkbox" :id="`note-checkbox-${index}`">
          <label :for="`note-checkbox-${index}`"/>

          <label class="custom-input">
            <input @change="handleChangeTextTask(index, $event)"
                   :value="task.text" class="custom-input__field"
                   type="text"/>
          </label>

          <v-button :handler-click="() => handleDeleteTask(index)" :icon="icons.TrashIcon" />
        </div>
        <div class="note__actions">
          <v-button class="note__action note__action--add-task"
                    :icon="icons.PlusIcon"
                    :handler-click="handleAddTask" text="Добавить задачу"/>
          <v-button class="note__action note__action--mini"
                    :handler-click="handleUndo"
                    :disabled="activeHistoryIndex === 0"
                    text="Отменить внесенное изменение" :icon="icons.UndoIcon"/>
          <v-button class="note__action note__action--mini"
                    :disabled="activeHistoryIndex <= historyChange.length"
                    :handler-click="handleRedo"
                    text="Повторить отмененное изменение" :icon="icons.RedoIcon"/>
          <v-button text="Удалить" :icon="icons.TrashIcon"/>
          <v-button text="Сохранить" :icon="icons.SaveIcon"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button'

import { v4 as uuidv4 } from 'uuid'

import TrashIcon from '@/assets/images/trash-icon.svg'
import RedoIcon from '@/assets/images/redo-icon.svg'
import UndoIcon from '@/assets/images/undo-icon.svg'
import PlusIcon from '@/assets/images/plus-icon.svg'
import SaveIcon from '@/assets/images/save-icon.svg'

export default {
  name: 'Note',
  components: {
    VButton: Button
  },
  data: () => ({
    historyChange: [],
    activeHistoryIndex: 0,
    name: '',
    tasks: [{
      id: uuidv4(),
      done: false,
      text: 'Lorem Lorem Lorem'
    }, {
      id: uuidv4(),
      done: true,
      text: 'Lorem Lorem Lorem'
    }],
    icons: {
      TrashIcon,
      UndoIcon,
      RedoIcon,
      PlusIcon,
      SaveIcon
    }
  }),
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
    saveState() {
      this.historyChange = this.historyChange.slice(0, this.historyChange.length)

      this.historyChange.push({
        name: this.name,
        tasks: JSON.parse(JSON.stringify(this.tasks)) // глубокая копия массива с объектами
      })

      this.activeHistoryIndex += 1
    },
    handleDeleteTask(index) {
      this.tasks.splice(index, 1)
    },
    handleAddTask() {
      this.tasks.push({
        id: uuidv4(),
        done: false,
        text: ''
      })
    },
    handleUndo() {
      const state = this.historyChange[this.activeHistoryIndex - 1]

      this.name = state.name
      this.tasks = state.tasks

      this.activeHistoryIndex -= 1
    },
    handleRedo() {
      this.activeHistoryIndex += 1

      const state = this.historyChange[this.activeHistoryIndex]

      this.name = state.name
      this.tasks = state.tasks
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/scss/views/note";
</style>
