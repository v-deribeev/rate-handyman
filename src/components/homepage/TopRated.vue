<template>
  <div class="container">
    <div v-for="(singleHandymanData, index) in handymanData" :key="index">
      <top-rated-card :handymanData="singleHandymanData" :inModal="false" />
    </div>
  </div>
</template>

<script>
import TopRatedCard from './TopRatedCard.vue'

export default {
  name: 'TopRated',
  components: { TopRatedCard },
  props: {
    handymanData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100vw;
  margin-block: 2rem;
  gap: 7rem;
}
</style>
