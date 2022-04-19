<template>
  <div class="card">
    <div class="image-container">
      <img
        :src="handleImage"
        alt="handyman-image"
        class="card-header"
        @error="fallBackDefault()"
      />
    </div>
    <div class="card-body">
      <div class="tag-container w-full flex justify-between">
        <span class="tag tag-blue">{{ handymanData.specialization }}</span>
        <span class="tag tag-gold"
          >{{ handymanData.experience }} {{ experienceYears }}</span
        >
      </div>
      <h2 class="name">{{ fullName }}</h2>
      <p class="email">{{ handymanData.email }}</p>
      <p class="rating">{{ handymanData.rating }}/10</p>
      <button
        v-if="inModal"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        @click="pushToRate()"
      >
        Rate
      </button>
    </div>
  </div>
</template>

<script>
import assets from '../../assets/assets.js'
export default {
  name: 'TopRatedCard',
  props: {
    handymanData: { type: Object, required: true },
    inModal: { type: Boolean, required: true },
  },
  data() {
    return {
      defaultImage: assets.question,
      isError: false,
    }
  },
  methods: {
    pushToRate() {
      this.$router.push(`/rate/${this.$route.params.id}`)
    },
    fallBackDefault() {
      this.isError = true
    },
  },
  computed: {
    fullName() {
      return this.handymanData.firstName + ' ' + this.handymanData.lastName
    },
    experienceYears() {
      return this.handymanData.experience > 1 ? 'years' : 'year'
    },
    handleImage() {
      return this.isError ? this.defaultImage : this.handymanData.img
    },
  },
}
</script>

<style scoped lang="scss">
img {
  max-width: 100%;
  display: block;
  object-fit: fill;
}

.img-container {
  width: 33vw;
}

.card {
  display: flex;
  flex-direction: column;
  width: clamp(20rem, calc(20rem + 2vw), 22rem);
  overflow: hidden;
  box-shadow: 0 0.3rem 1.2rem rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  background: #ece9e6;
  background: linear-gradient(to right, #ffffff, #ece9e6);
}

.card-body {
  display: flex;
  padding: 0.5rem 2rem;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.tag {
  padding: 0.25em 0.75em;
  border-radius: 1em;
  font-size: 0.75rem;
  font-weight: bold;
}

.tag + .tag {
  margin-left: 0.5em;
}

.tag-blue {
  background: #56ccf2;
  background: linear-gradient(to bottom, #2f80ed, #56ccf2);
  color: #fafafa;
}

.tag-gold {
  background: gold;
  background: linear-gradient(to bottom, #c5ec17, #d7f359);
  color: #fafafa;
}

h2,
h3 {
  margin: 0.8rem 2rem 0 2rem;
}

.name,
.email,
.rating {
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
