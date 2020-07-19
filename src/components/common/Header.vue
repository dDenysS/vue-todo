<template>
  <header class="header">
    <div class="container">
      <router-link class="logo" :to="{name:'Home'}">
        <img class="logo__icon" src="../../assets/images/to-do-list-icon.svg" alt="Logo icon">
        <span class="logo__name">TodoList</span>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped lang="scss">
  @import "../../assets/scss/common/header.scss";
</style>
