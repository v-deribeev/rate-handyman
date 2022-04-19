<template>
  <nav class="flex nav-pad">
    <router-link to="/">Home</router-link> |
    <div class="nav-pad" v-if="!$store.getters.isUserAuthenticated">
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </div>
    <div class="nav-pad" v-else>
      <router-link to="/handymen">Handymen</router-link> |
      <router-link to="/create">Create Handyman</router-link> |
      <router-link to="/profile">Profile</router-link> |
      <button @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped lang="scss">
nav > * {
  padding: 0px 5px;
}

a {
  font-weight: bold;
  color: orange;
  text-decoration: none;

  &.router-link-exact-active {
    color: #42b983;
  }
}

button {
  font-weight: bold;
  color: orange;
  text-decoration: none;
}
</style>
