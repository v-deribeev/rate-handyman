<template>
  <div class="m-auto w-96 h-screen">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-24"
      @submit.prevent="createHandyman"
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
          for="proficiency"
        >
          Proficiency
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="proficiency"
          type="text"
          placeholder="Enter proficiency"
          v-model="user.specialization"
          @input="
            handler(errorDisplaySpecialization(), toggleBorderSpecialization())
          "
          @blur="
            handler(errorDisplaySpecialization(), toggleBorderSpecialization())
          "
          autocomplete="off"
          :class="{ styleborder: hasErrorSpecialization }"
        />
        <div v-if="v$.user.specialization.$error">
          <p
            v-if="v$.user.specialization.$errors[0].$message"
            class="text-red-500 text-xs font-bold"
          >
            {{ v$.user.specialization.$errors[0].$message }}
          </p>
        </div>
      </div>

      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="experience"
        >
          Experience
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="experience"
          type="number"
          placeholder="Enter experience"
          v-model="user.experience"
          @input="handler(errorDisplayExperience(), toggleBorderExperience())"
          @blur="handler(errorDisplayExperience(), toggleBorderExperience())"
          autocomplete="off"
          :class="{ styleborder: hasErrorExperience }"
        />
        <div v-if="v$.user.experience.$error">
          <p
            v-if="v$.user.experience.$errors[0].$message"
            class="text-red-500 text-xs font-bold"
          >
            {{ v$.user.experience.$errors[0].$message }}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { email } from '@vuelidate/validators'
import { required, helpers, alpha, numeric } from '@vuelidate/validators'

export default {
  name: 'CreateHandymanView',
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        specialization: '',
        experience: null,
      },
      hasErrorFirstName: false,
      hasErrorLastName: false,
      hasErrorEmail: false,
      hasErrorSpecialization: false,
      hasErrorExperience: false,
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
        specialization: {
          required: helpers.withMessage(
            'This field cannot be empty !',
            required
          ),
          alpha: helpers.withMessage('This field accepts only letters', alpha),
          $autoDirty: true,
        },
        experience: {
          required: helpers.withMessage(
            'This field cannot be empty !',
            required
          ),
          alpha: helpers.withMessage(
            'This field accepts only numbers',
            numeric
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
    errorDisplaySpecialization() {
      this.v$.user.specialization.$touch()
    },
    toggleBorderSpecialization() {
      this.hasErrorSpecialization = this.v$.user.experience.$error
    },
    errorDisplayExperience() {
      this.v$.user.experience.$touch()
    },
    toggleBorderExperience() {
      this.hasErrorExperience = this.v$.user.experience.$error
    },

    handler(errorDisplayFn, toggleBorderFn) {
      errorDisplayFn
      toggleBorderFn
    },
    async createHandyman() {
      try {
        if (
          this.user.firstName &&
          this.user.lastName &&
          this.user.email &&
          this.user.specialization &&
          this.user.experience
        ) {
          try {
            const userData = await this.axios.post('/workers/create', {
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              email: this.user.email,
              specialization: this.user.specialization,
              experience: this.user.experience,
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
