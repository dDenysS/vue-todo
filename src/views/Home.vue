<template>
  <div class="container">
    <div class="head">
      <h2>Список заметок</h2>
      <v-button :icon="icons.EditIcon" text="Создать заметку"/>
    </div>
    <div class="note-list">
      <mini-note/>
      <mini-note/>
      <mini-note/>
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
  })
}
</script>

<style scoped lang="scss">
  @import "../assets/scss/views/home";
</style>
