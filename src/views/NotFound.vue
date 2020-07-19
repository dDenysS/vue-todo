<template>
  <div class="not-found">
    <div class="container">
        <div class="not-found__error">404</div>
        <span class="not-found__info">Page not found</span>
        <img class="not-found__image" src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped lang="scss">
  @import "../assets/scss/views/not-found.scss";
</style>
