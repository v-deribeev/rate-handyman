<template>
  <div class="flex flex-col w-full">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead class="bg-gray-800 border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-medium text-white px-6 py-4 text-left"
                >
                  #
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-white px-6 py-4 text-left"
                >
                  <button @click="getSortingCategory('lastName')">
                    Name {{ toggleOrder }}
                  </button>
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-white px-6 py-4 text-left"
                >
                  Contact
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-white px-6 py-4 text-left"
                >
                  Proficiency
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-white px-6 py-4 text-left"
                >
                  <button @click="getSortingCategory('experience')">
                    Experience
                  </button>
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-white px-6 py-4 text-left"
                >
                  <button @click="getSortingCategory('rating')">
                    Rating
                  </button>
                </th>
              </tr>
            </thead>
            <tbody
              v-for="(singleHandymanData, index) in allHandymanData"
              :key="index"
            >
              <table-row
                :handymanData="singleHandymanData"
                :counter="index + 1"
                @click="
                  getProps(
                    $event.target.__vueParentComponent.props.handymanData
                  )
                "
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <worker-profile-modal
        class="z-20"
        v-if="isVisible"
        :handymanDataProfile="propsData"
        @close="closeModal()"
      />
    </Teleport>
  </div>
</template>

<script>
import TableRow from './TableRow.vue'
import WorkerProfileModal from '../modals/WorkerProfileModal.vue'

export default {
  name: 'HandymenTable',
  components: { TableRow, WorkerProfileModal },
  props: {
    allHandymanData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      propsData: {},
      sortingCategory: {},
      isVisible: false,
      routeId: '',

      orderType: '',
      toggleOrder: false,
    }
  },
  methods: {
    // extracts props data from the target of the onClick event (extract all data found in the clicked table row) and assigns it to the data object
    // also opens the modal (reveals the modal)

    getProps(data) {
      this.isVisible = true
      this.propsData = data
      console.log('propsData', this.propsData)
      this.$router.push({
        name: 'handyman',
        params: { id: this.propsData.modelId },
      })
    },

    // category to sort by
    getSortingCategory(category) {
      this.toggleOrder = !this.toggleOrder
      this.sortingCategory = category
      this.orderType = this.toggleOrder ? 'asc' : 'desc'
      console.log('order type', this.orderType)
      this.triggerSort()
    },

    closeModal() {
      this.isVisible = false
    },

    // sort
    async triggerSort() {
      await this.$store.dispatch('getSortedWorkers', {
        sortingCategory: this.sortingCategory,
        token: localStorage.getItem('JWT'),
        sortingOrder: this.orderType,
      })
      console.log('sorted', this.$store.getters.allHandymen)
    },
  },

  mounted() {
    console.log('URL-parent', this.$route.params.id)
    if (this.$route.params.id) {
      this.routeId = this.$route.params.id
      console.log('check routeID', this.routeId)
      this.isVisible = true
    }
  },
}
</script>

<style scoped lang="scss"></style>
