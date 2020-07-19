<template>
  <div id="app">
    <v-header/>
    <router-view/>
    <v-footer/>
  </div>
</template>

<script>
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export default {
  name: 'App',
  components: {
    VHeader: Header,
    VFooter: Footer
  }
}
</script>
