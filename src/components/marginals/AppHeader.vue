<template>
  <section class="header-section">
    <div class="img-container">
      <img :src="assets.logo" alt="logo" />
    </div>
    <nav-bar />
  </section>
</template>

<script>
import NavBar from '../NavBar.vue'
import assets from '../../assets/assets.js'

export default {
  name: 'AppHeader',
  components: { NavBar },
  data() {
    return {
      assets,
    }
  },
}
</script>

<style scoped lang="scss">
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid black;
}
img {
  max-width: 4rem;
  border: solid black;
}
</style>
