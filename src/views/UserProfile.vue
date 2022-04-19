<template>
  <div class="bg-gray-100">
    <div class="w-full test text-white bg-main-color">
      <div class="container mx-auto my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2">
          <!-- Left Side -->
          <div class="w-full md:w-3/12 md:mx-2">
            <!-- Profile Card -->
            <div class="bg-white p-3 border-t-4 border-green-400">
              <div class="image overflow-hidden">
                <img
                  class="h-auto w-full mx-auto"
                  :src="handleImage"
                  alt="user-image"
                  @error="fallBackDefault()"
                />
              </div>
              <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
                {{ userDataObject.firstName + ' ' + userDataObject.lastName }}
              </h1>

              <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
                <span class="font-bold">Additional info: </span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur
                non deserunt
              </p>
            </div>
          </div>
          <div class="w-full md:w-9/12 mx-2 h-64">
            <!-- Profile tab -->
            <!-- About Section -->
            <div class="bg-white p-3 shadow-sm rounded-sm">
              <div
                class="flex items-center space-x-2 font-semibold text-gray-900 leading-8"
              >
                <span clas="text-green-500">
                  <svg
                    class="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span class="tracking-wide">About</span>
              </div>
              <div class="text-gray-700">
                <div class="grid md:grid-cols-2 text-sm">
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">First Name</div>
                    <div class="px-4 py-2">{{ userDataObject.firstName }}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Last Name</div>
                    <div class="px-4 py-2">{{ userDataObject.lastName }}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Username</div>
                    <div class="px-4 py-2">{{ userDataObject.username }}</div>
                  </div>

                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Email</div>
                    <div class="px-4 py-2">
                      <a class="text-blue-800" :href="`mailto:${hrefMail}`">{{
                        userDataObject.email
                      }}</a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- End of Experience and education grid -->
            </div>
            <div class="flex justify-center mt-5">
              <button
                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-10"
                @click="redirectToPassCredentials"
              >
                Change Password
              </button>

              <button
                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                @click="redirectToMailCredentials"
              >
                Change Email
              </button>
            </div>
          </div>
        </div>

        <button
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          @click="redirectToUpload()"
        >
          Upload Photo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import assets from '../assets/assets'
import axios from 'axios'

export default {
  name: 'UserProfile',
  data() {
    return {
      main: 'https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg',
      image: assets.question,
      isError: false,
      userDataObject: {},
      hrefMail: '',
    }
  },
  methods: {
    redirectToPassCredentials() {
      this.$router.push('/users/password')
    },
    redirectToMailCredentials() {
      this.$router.push('/users/email')
    },

    fallBackDefault() {
      this.isError = true
    },

    async getUserData() {
      const userData = await axios.get('/users/self', {
        headers: {
          Authorization: localStorage.getItem('JWT'),
        },
      })
      this.userDataObject = userData.data
      this.hrefMail = this.userDataObject.email
      console.log('the data', this.userDataObject)
    },

    redirectToUpload() {
      this.$router.push('/users/avatar')
    },
  },

  computed: {
    handleImage() {
      return this.isError ? this.image : this.main
    },
  },
  async mounted() {
    await this.getUserData()
  },
}
</script>

<style scoped lang="scss">
.test {
  height: 89vh;
}
</style>
