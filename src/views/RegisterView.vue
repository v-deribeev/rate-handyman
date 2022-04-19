<template>
  <div class="m-auto w-96 h-screen">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-24"
      @submit.prevent="register"
      novalidate
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="first-name"
        >
          First Name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="first-name"
          type="text"
          placeholder="Enter your first name"
          v-model="user.firstName"
          @input="handler(errorDisplayFirstName(), toggleBorderFirstName())"
          @blur="handler(errorDisplayFirstName(), toggleBorderFirstName())"
          autocomplete="off"
          :class="{ styleborder: hasErrorFirstName }"
        />
        <div v-if="v$.user.firstName.$error">
          <!-- <p>{{ v$.user.email }}</p> -->
          <!-- <p>{{ v$.user.email.$uid }}</p> -->
          <!-- <p>{{ v$.user.email.$errors[0].$message }}</p> -->
          <!-- {{ this.v$.user.email.$error }} -->
          <p
            v-if="v$.user.firstName.$errors[0].$message"
            class="text-red-500 text-xs font-bold"
          >
            {{ v$.user.firstName.$errors[0].$message }}
          </p>
        </div>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="last-name"
        >
          Last Name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="last-name"
          type="text"
          placeholder="Enter your last name"
          v-model="user.lastName"
          @input="handler(errorDisplayLastName(), toggleBorderLastName())"
          @blur="handler(errorDisplayLastName(), toggleBorderLastName())"
          autocomplete="off"
          :class="{ styleborder: hasErrorLastName }"
        />
        <div v-if="v$.user.lastName.$error">
          <!-- <p>{{ v$.user.email }}</p> -->
          <!-- <p>{{ v$.user.email.$uid }}</p> -->
          <!-- <p>{{ v$.user.email.$errors[0].$message }}</p> -->
          <!-- {{ this.v$.user.email.$error }} -->
          <p
            v-if="v$.user.lastName.$errors[0].$message"
            class="text-red-500 text-xs font-bold"
          >
            {{ v$.user.lastName.$errors[0].$message }}
          </p>
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
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
          <!-- <p>{{ v$.user.email }}</p> -->
          <!-- <p>{{ v$.user.email.$uid }}</p> -->
          <!-- <p>{{ v$.user.email.$errors[0].$message }}</p> -->
          <!-- {{ this.v$.user.email.$error }} -->
          <p
            v-if="v$.user.email.$errors[0].$message"
            class="text-red-500 text-xs font-bold"
          >
            {{ v$.user.email.$errors[0].$message }}
          </p>
        </div>
      </div>
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
          <!-- <p>{{ v$.user.email }}</p> -->
          <!-- <p>{{ v$.user.email.$uid }}</p> -->
          <!-- <p>{{ v$.user.email.$errors[0].$message }}</p> -->
          <!-- {{ this.v$.user.email.$error }} -->
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
            class="block text-gray-700 text-sm font-bold mb-2"
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
        </div>
      </div>

      <div class="flex items-center justify-center">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { email } from '@vuelidate/validators'
import {
  required,
  helpers,
  minLength,
  sameAs,
  alpha,
} from '@vuelidate/validators'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      },
      hasErrorFirstName: false,
      hasErrorLastName: false,
      hasErrorEmail: false,
      hasErrorUsername: false,
      hasErrorPass: false,
      hasErrorConfirmPass: false,
      styleborder: '',
    }
  },
  validations() {
    return {
      user: {
        firstName: {
          required: helpers.withMessage(
            'This field cannot be empty !',
            required
          ),
          alpha: helpers.withMessage('This field accepts only letters', alpha),
          $autoDirty: true,
        },
        lastName: {
          required: helpers.withMessage(
            'This field cannot be empty !',
            required
          ),
          alpha: helpers.withMessage('This field accepts only letters', alpha),
          $autoDirty: true,
        },
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
    errorDisplayEmail() {
      this.v$.user.email.$touch()
    },
    toggleBorderEmail() {
      this.hasErrorEmail = this.v$.user.email.$error
    },
    errorDisplayFirstName() {
      this.v$.user.firstName.$touch()
    },
    toggleBorderFirstName() {
      this.hasErrorFirstName = this.v$.user.firstName.$error
    },
    errorDisplayLastName() {
      this.v$.user.lastName.$touch()
    },
    toggleBorderLastName() {
      this.hasErrorLastName = this.v$.user.lastName.$error
    },
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
    async register() {
      try {
        if (
          this.user.firstName &&
          this.user.lastName &&
          this.user.email &&
          this.user.username &&
          this.user.password
        ) {
          try {
            const userData = await this.axios.post('/users/sign-up', {
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              email: this.user.email,
              username: this.user.username,
              password: this.user.password,
            })
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
</style>
