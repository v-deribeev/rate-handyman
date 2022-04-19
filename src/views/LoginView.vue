<template>
  <div class="m-auto w-96 h-screen">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-24"
      @submit.prevent="theLogin"
      novalidate
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Enter your username"
          v-model="user.username"
          @input="handler(errorDisplayUsername(), toggleBorderUsername())"
          @blur="handler(errorDisplayUsername(), toggleBorderUsername())"
          autocomplete="off"
          :class="{ styleborder: hasErrorUsername }"
        />
        <div v-if="v$.user.username.$error">
          <p
            v-if="v$.user.username.$errors[0].$message"
            class="text-red-500 text-xs font-bold"
          >
            {{ v$.user.username.$errors[0].$message }}
          </p>
        </div>
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="*******"
          v-model="user.password"
          @input="handler(errorDisplayPassword(), toggleBorderPassword())"
          @blur="handler(errorDisplayPassword(), toggleBorderPassword())"
          :class="{ styleborder: hasErrorPass }"
        />
        <div v-if="v$.user.password.$error">
          <p
            v-if="v$.user.password.$errors[0].$message"
            class="text-red-500 text-xs font-bold"
          >
            {{ v$.user.password.$errors[0].$message }}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Login
        </button>

        <button
          @click="startRegistration"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers, minLength } from '@vuelidate/validators'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      hasErrorUsername: false,
      hasErrorPass: false,
      styleborder: '',
    }
  },
  validations() {
    return {
      user: {
        username: {
          required: helpers.withMessage(
            'This field cannot be empty !',
            required
          ),
          $autoDirty: true,
        },
        password: {
          required: helpers.withMessage(
            'This field cannot be empty !',
            required
          ),
          minLength: minLength(6),
          $autoDirty: true,
        },
      },
    }
  },
  methods: {
    errorDisplayUsername() {
      this.v$.user.username.$touch()
    },
    toggleBorderUsername() {
      this.hasErrorUsername = this.v$.user.username.$error
    },
    errorDisplayPassword() {
      this.v$.user.password.$touch()
    },
    toggleBorderPassword() {
      this.hasErrorPass = this.v$.user.password.$error
    },
    handler(errorDisplayFn, toggleBorderFn) {
      errorDisplayFn
      toggleBorderFn
    },
    startRegistration() {
      this.$router.push('/register')
    },
    async theLogin() {
      await this.$store.dispatch('login', this.user)
      if (this.$store.getters.isUserAuthenticated) {
        this.$router.push({ path: '/' })
      } else {
        alert('Invalid username or password, please check and try again')
      }
    },
  },
}
</script>

<style scoped>
.styleborder {
  border: 1px solid red;
  border-radius: 4px;
}
</style>
