<template>
  <modal v-if="isOpen" :overlay-click="() => handlerClick(false)">
    <div class="confirm-modal">
      <h3 class="confirm-modal__title">Вы уверены что хотите удалить?</h3>
      <div class="confirm-modal__actions">
        <v-button :handler-click="() => handlerClick(false)" text="Нет"/>
        <v-button :handler-click="() => handlerClick(true)" text="Да"/>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'

export default {
  name: 'ConfirmRemoveModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    handlerClick: {
      type: Function,
      required: true
    }
  },
  components: {
    Modal,
    VButton: Button
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/scss/modals/comfirm-remove";
</style>
