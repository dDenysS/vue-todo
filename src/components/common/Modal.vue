<template>
  <div class="modal" @click="overlayClick">
    <div class="modal__content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    overlayClick: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style scoped>
  @import "../../assets/scss/common/modal.scss";
</style>
