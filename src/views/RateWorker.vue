<template>
  <main class="mt-20">
    <div class="flex justify-center w-full">Quality</div>
    <div class="flex justify-center mt-3 mb-6">
      <div v-for="(button, index) in ratingScale" :key="index">
        <div class="form-check form-check-inline mr-2">
          <input
            class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="inlineRadioOptions1"
            id="inlineRadio1"
            :value="index + 1"
            v-model="ratingValueQuality"
          />
          <label
            class="form-check-label inline-block text-gray-800"
            for="inlineRadio10"
            >{{ index + 1 }}</label
          >
        </div>
      </div>
    </div>

    <div class="flex justify-center w-full">Speed</div>
    <div class="flex justify-center mt-3 mb-6">
      <div v-for="(button, index) in ratingScale" :key="index">
        <div class="form-check form-check-inline mr-2">
          <input
            class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="inlineRadioOptions2"
            id="inlineRadio2"
            v-model="ratingValueSpeed"
            :value="index + 1"
          />
          <label
            class="form-check-label inline-block text-gray-800"
            for="inlineRadio10"
            >{{ index + 1 }}</label
          >
        </div>
      </div>
    </div>

    <div class="flex justify-center w-full">Price</div>
    <div class="flex justify-center mt-3 mb-6">
      <div v-for="(button, index) in ratingScale" :key="index">
        <div class="form-check form-check-inline mr-2">
          <input
            class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="inlineRadioOptions3"
            id="inlineRadio3"
            v-model="ratingValuePrice"
            :value="index + 1"
          />
          <label
            class="form-check-label inline-block text-gray-800"
            for="inlineRadio10"
            >{{ index + 1 }}</label
          >
        </div>
      </div>
    </div>

    <div class="flex justify-center w-full">Communication</div>
    <div class="flex justify-center mt-3 mb-6">
      <div v-for="(button, index) in ratingScale" :key="index">
        <div class="form-check form-check-inline mr-2">
          <input
            class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="inlineRadioOptions4"
            id="inlineRadio4"
            v-model="ratingValueCommunication"
            :value="index + 1"
          />
          <label
            class="form-check-label inline-block text-gray-800"
            for="inlineRadio10"
            >{{ index + 1 }}</label
          >
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-5">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        @click="updateRating()"
      >
        Submit
      </button>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
// import qs from 'qs'

export default {
  data() {
    return {
      ratingScale: 10,
      ratingValueQuality: null,
      ratingValueSpeed: null,
      ratingValuePrice: null,
      ratingValueCommunication: null,
    }
  },
  methods: {
    async updateRating() {
      try {
        const updateRating = await axios.post(
          `/workers/${this.$route.params.workerId}/rate`,
          {},
          {
            headers: {
              Authorization: localStorage.getItem('JWT'),
            },
            params: {
              speed: this.ratingValueSpeed,
              communication: this.ratingValueCommunication,
              price: this.ratingValuePrice,
              quality: this.ratingValueCommunication,
            },
          }
        )
        console.log('check sent data response', updateRating)
      } catch (error) {
        console.log(error, 'error')
      }
    },
  },
}
</script>

<style scoped lang="scss"></style>
