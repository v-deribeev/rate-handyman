<template>
  <div class="m-auto w-96 h-screen">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-24">
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2 text-center"
          for="email"
        >
          E-Mail
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Enter your e-mail"
          v-model="user.email"
          @input="handler(errorDisplayEmail(), toggleBorderEmail())"
          @blur="handler(errorDisplayEmail(), toggleBorderEmail())"
          autocomplete="off"
          :class="{ styleborder: hasErrorEmail }"
        />

        <div v-if="v$.user.email.$error">
          <p
            v-if="v$.user.email.$errors[0].$message"
            class="text-red-500 text-xs font-bold"
          >
            {{ v$.user.email.$errors[0].$message }}
          </p>
        </div>

        <div class="flex items-center justify-center mt-4">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            @click="updateMail()"
          >
            Change Email
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { email } from '@vuelidate/validators'
import { required, helpers } from '@vuelidate/validators'
import axios from 'axios'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      user: {
        email: '',
      },
      hasErrorEmail: false,
      styleborder: '',
    }
  },
  validations() {
    return {
      user: {
        email: {
          required: helpers.withMessage(
            'This field cannot be empty !',
            required
          ),
          email: helpers.withMessage(
            'This is not a valid email address !',
            email
          ),
          $autoDirty: true,
        },
      },
    }
  },
  methods: {
    errorDisplayEmail() {
      this.v$.user.email.$touch()
    },
    toggleBorderEmail() {
      this.hasErrorEmail = this.v$.user.email.$error
    },

    handler(errorDisplayFn, toggleBorderFn) {
      errorDisplayFn
      toggleBorderFn
    },
    async updateMail() {
      try {
        if (this.user.email) {
          try {
            const userData = await axios.patch(
              '/users/self/update-email',
              {
                email: this.user.email,
              },
              {
                headers: {
                  Authorization: localStorage.getItem('JWT'),
                },
              }
            )
            console.log(userData, 'data sent to DB')
          } catch (error) {
            console.log(error)
          }
        } else {
          throw 'Please fill the entire form'
        }
      } catch (error) {
        console.log(error)
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

::-webkit-input-placeholder {
  text-align: center;
}
</style>
