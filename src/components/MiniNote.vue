<template>
  <div class="mini-note">
    <h3 class="mini-note__title">Pfujkjdjr pfvtnrb f sdf sdf sdf</h3>
    <ul class="mini-note__items">
      <li class="mini-note__item">Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua</li>
      <li class="mini-note__item">Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua</li>
      <li class="mini-note__item">Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua</li>
    </ul>
    <div class="mini-note__actions">
      <v-button :to="{name:'Note', params: {id: 'tess1'} }" text="Изменить" :icon="icons.EditIcon"/>
      <v-button text="Удалить" :icon="icons.TrashIcon"/>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button'

import TrashIcon from '../assets/images/trash-icon.svg'
import EditIcon from '../assets/images/edit-icon.svg'

export default {
  name: 'MiniNote',
  components: {
    VButton: Button
  },
  data: () => ({
    icons: {
      TrashIcon,
      EditIcon
    }
  })
}
</script>

<style scoped lang="scss">
  @import "../assets/scss/components/mini-note.scss";
</style>
