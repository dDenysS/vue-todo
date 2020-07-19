<template>
  <!-- Сознательное дублирование кода,
   потому что это самый просто способ совместить <router-link> и <button>
  в одном компоненте -->
  <router-link v-if="to" :to="to" class="button">
    <img v-if="icon" class="button__icon" :src="icon" alt="Trash icon">
    <span v-if="text" class="button__text"> {{ text}}</span>
  </router-link>
  <button v-else class="button" @click.prevent="handlerClick" :disabled="disabled" :type="type">
    <img v-if="icon" class="button__icon" :src="icon" alt="Trash icon">
    <span v-if="text" class="button__text"> {{ text}}</span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button'
    },
    icon: { // icon path
      type: String,
      default: ''
    },
    to: {
      type: [String, Object]
    },
    handlerClick: {
      type: Function
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/scss/common/button";
</style>
