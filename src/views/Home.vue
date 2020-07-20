<template>
  <div class="container">
    <div class="head">
      <h2>Список заметок</h2>
      <v-button :to="{ name: 'NoteCreate' }" :icon="icons.EditIcon" text="Создать заметку"/>
    </div>
    <div class="note-list">
      <mini-note v-for="note in notes" :note="note" :key="note.id"/>
    </div>
  </div>
</template>

<script>
import MiniNote from '@/components/MiniNote'
import Button from '@/components/common/Button'

import EditIcon from '@/assets/images/plus-icon.svg'

export default {
  name: 'Home',
  components: {
    MiniNote,
    VButton: Button
  },
  data: () => ({
    icons: {
      EditIcon
    }
  }),
  computed: {
    notes() {
      return this.$store.state.notes
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/scss/views/home";
</style>
