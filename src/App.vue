<template>
  <app-header />
  <router-view class="navigation" />
  <app-footer />
</template>

<script>
import AppHeader from './components/marginals/AppHeader.vue'
import AppFooter from './components/marginals/AppFooter.vue'

export default {
  components: { AppHeader, AppFooter },
  mounted() {
    this.$store.commit('setToken', localStorage.getItem('JWT'))
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: orange;
}

.navigation {
  padding-top: 5px;
}
</style>
