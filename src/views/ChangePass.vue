<template>
  <div class="m-auto w-96 h-screen">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-24">
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2 text-center"
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
          autocomplete="off"
        />
        <div v-if="v$.user.password.$error">
          <p
            v-if="v$.user.password.$errors[0].$message"
            class="text-red-500 text-xs font-bold"
          >
            {{ v$.user.password.$errors[0].$message }}
          </p>
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 text-center"
            for="confirm-password"
          >
            Confirm Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirm-password"
            type="password"
            placeholder="*******"
            v-model="user.confirmPassword"
            @input="
              handler(
                errorDisplayConfirmPassword(),
                toggleBorderConfirmPassword()
              )
            "
            @blur="
              handler(
                errorDisplayConfirmPassword(),
                toggleBorderConfirmPassword()
              )
            "
            :class="{ styleborder: hasErrorConfirmPass }"
            autocomplete="off"
          />
          <div v-if="v$.user.confirmPassword.$error">
            <p
              v-if="v$.user.confirmPassword.$errors[0].$message"
              class="text-red-500 text-xs font-bold"
            >
              {{ v$.user.confirmPassword.$errors[0].$message }}
            </p>
          </div>
          <div class="flex items-center justify-center mt-4">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              @click="updatePass()"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers, minLength, sameAs } from '@vuelidate/validators'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      user: {
        password: '',
        confirmPassword: '',
      },
      hasErrorPass: false,
      hasErrorConfirmPass: false,
      styleborder: '',
    }
  },
  validations() {
    return {
      user: {
        password: {
          required: helpers.withMessage(
            'This field cannot be empty !',
            required
          ),
          minLength: minLength(6),
          $autoDirty: true,
        },
        confirmPassword: {
          required: helpers.withMessage(
            'This field cannot be empty !',
            required
          ),
          sameAsPassword: helpers.withMessage(
            'Password does not match !',
            sameAs(this.user.password)
          ),
          $autoDirty: true,
        },
      },
    }
  },
  methods: {
    errorDisplayPassword() {
      this.v$.user.password.$touch()
    },
    toggleBorderPassword() {
      this.hasErrorPass = this.v$.user.password.$error
    },
    errorDisplayConfirmPassword() {
      this.v$.user.confirmPassword.$touch()
    },
    toggleBorderConfirmPassword() {
      this.hasErrorConfirmPass = this.v$.user.confirmPassword.$error
    },
    handler(errorDisplayFn, toggleBorderFn) {
      errorDisplayFn
      toggleBorderFn
    },
    async updatePass() {
      try {
        if (this.user.password) {
          try {
            const userData = await this.axios.patch(
              '/users/self/update-password',
              {
                password: this.user.password,
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
