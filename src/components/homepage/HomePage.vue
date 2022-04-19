<template>
  <div class="overlap-elements">
    <div class="text-container">
      <h1>
        Welcome to the place where integrity and trust are built and maintained
      </h1>
      <div class="sub-content">
        <h2>Check out ratings and reviews of handymen in your vicinity</h2>
      </div>
      <div class="sub-content-two">
        <h2>Word-of-Mouth made easy</h2>
      </div>
    </div>
    <top-rated class="top-rated" :handymanData="sortedHandymenByLike" />
  </div>
</template>

<script>
import TopRated from './TopRated.vue'
import assets from '../../assets/assets'

export default {
  name: 'HomePage',
  components: { TopRated },
  data() {
    return {
      allHandymanData: [
        {
          firstName: 'John',
          lastName: 'Doe',
          specialization: 'Painting',
          experience: 6,
          email: 'john.doe@gmail.com',
          img: assets.firstHandyman,
          rating: 10,
        },
        {
          firstName: 'Larry',
          lastName: 'Goldman',
          specialization: 'Plumbing',
          experience: 7,
          email: 'larry.goldman@gmail.com',
          img: assets.secondHandyman,
          rating: 9.5,
        },
        {
          firstName: 'Francisco',
          lastName: 'DeGoya',
          specialization: 'Tiling',
          experience: 3,
          email: 'francisco.degoya@gmail.com',
          img: assets.thirdHandyman,
          rating: 9.3,
        },
      ],
      limit: 3,
    }
  },
  computed: {
    sortedHandymenByLike() {
      const newArray = [...this.allHandymanData]
      return newArray
        .sort(function (a, b) {
          return parseFloat(b.rating) - parseFloat(a.rating)
        })
        .slice(0, this.limit)
    },
  },
}
</script>

<style scoped lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.text-container {
  color: white;
  background-color: orange;
  display: flex;
  flex-direction: column;
  min-height: 62vh;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
.text-container > * {
  padding-bottom: 3rem;
  font-weight: bold;
  font-family: 'Gill Sans', sans-serif;
}

.top-rated {
  margin-top: -160px;
}

.sub-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 1rem;
  margin-right: 3rem;
  font-size: 1.7rem;
}

.sub-content-two {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
  margin-left: 6rem;
  font-size: 1.7rem;
}

h1 {
  margin-top: 5rem;
  margin-left: 2rem;
  font-size: 2.3rem;
}
</style>
