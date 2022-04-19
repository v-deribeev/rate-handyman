<template>
  <div
    class="modal-backdrop bg-opacity-50 bg-slate-900 flex items-center fixed top-0 bottom-0 right-0 left-0"
    @click.self="close"
  >
    <div
      class="modal w-54.4rem h-91vh ml-108 rounded-xl sm:w-113 sm:ml-20 lg:w-54.4rem lg:ml-16 2lg:w-54.4rem 2lg:ml-56 xl:w-54.4rem xl:ml-72 2xl:w-54.4rem 2xl:ml-108"
    >
      <top-rated-card :handymanData="userDataById" :inModal="true" />
    </div>
  </div>
</template>

<script>
import TopRatedCard from '../homepage/TopRatedCard.vue'
import axios from 'axios'

export default {
  name: 'WorkerProfileModal',
  components: { TopRatedCard },
  props: {
    handymanDataProfile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userDataById: this.handymanDataProfile,
      tempDataContainer: {},
      userId: '',
    }
  },
  methods: {
    close() {
      this.$router.push('/handymen')
      this.$emit('close')
    },

    async findUserById(idParam) {
      try {
        const singleUserById = await axios.get(`/workers/${idParam}`, {
          headers: { Authorization: localStorage.getItem('JWT') },
        })
        if (singleUserById.data == null) {
          throw {
            code: 404,
            message: 'user not found',
          }
        } else {
          console.log('the user', singleUserById.data)
          return singleUserById
        }
      } catch (e) {
        console.log('db error', e)
      }
    },
  },

  async mounted() {
    if (this.$route.params.id) {
      this.userId = this.$route.params.id
      try {
        this.tempContainer = await this.findUserById(this.userId)
        console.log('the container', this.tempContainer)

        if (!this.tempContainer) {
          console.log('boom if undefined')
          throw { code: 404, message: 'user not found' }
        }
      } catch (e) {
        console.log('not found', e)
      }

      this.userDataById = this.tempContainer?.data
      console.log('the props', this.userDataById)
    }
  },
}
</script>

<style scoped lang="scss">
.modal {
  margin: 0 auto;
}
</style>
