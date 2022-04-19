<template>
  <main class="flex items-center flex-col w-full">
    <handymen-table :allHandymanData="computedTableData" />
    <pagination
      v-if="this.$store.getters.allHandymen"
      :totalRecords="this.$store.getters.allHandymen.length"
      :perPageOptions="perPageOptions"
      @update-page="changePage"
    />
    <search-bar class=""></search-bar>
  </main>
</template>

<script>
import HandymenTable from './HandymenTable.vue'
import Pagination from '../pagination/Pagination.vue'
import SearchBar from '../searchComponent/SearchBar.vue'
import assets from '../../assets/assets'

export default {
  name: 'HandymenPage',
  components: { HandymenTable, Pagination, SearchBar },

  data() {
    return {
      allHandymanData: [
        {
          firstName: 'John',
          lastName: 'Doe',
          specialization: 'Painting',
          experience: 1,
          email: 'john.doe@gmail.com',
          img: assets.firstHandyman,
          rating: 10,
        },
        {
          firstName: 'Larry',
          lastName: 'Goldman',
          specialization: 'Plumbing',
          experience: 2,
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
        {
          firstName: 'John',
          lastName: 'Doe',
          specialization: 'Painting',
          experience: 1,
          email: 'john.doe@gmail.com',
          img: assets.firstHandyman,
          rating: 10,
        },
        {
          firstName: 'Garry',
          lastName: 'Petrov',
          specialization: 'Plumbing',
          experience: 5,
          email: 'garry.goldman@gmail.com',
          img: assets.secondHandyman,
          rating: 7.5,
        },
        {
          firstName: 'Stefan',
          lastName: 'Todorov',
          specialization: 'Tiling',
          experience: 3,
          email: 'francisco.degoya@gmail.com',
          img: assets.thirdHandyman,
          rating: 5,
        },
        {
          firstName: 'Ivan',
          lastName: 'Stoqnov',
          specialization: 'Painting',
          experience: 1,
          email: 'john.doe@gmail.com',
          img: assets.firstHandyman,
          rating: 8,
        },
        {
          firstName: 'Barry',
          lastName: 'Leopold',
          specialization: 'Plumbing',
          experience: 2,
          email: 'larry.goldman@gmail.com',
          img: assets.secondHandyman,
          rating: 7.5,
        },
        {
          firstName: 'Gen',
          lastName: 'Ji',
          specialization: 'Tiling',
          experience: 3,
          email: 'francisco.degoya@gmail.com',
          img: assets.thirdHandyman,
          rating: 8.3,
        },
        {
          firstName: 'John',
          lastName: 'Cena',
          specialization: 'Painting',
          experience: 1,
          email: 'john.doe@gmail.com',
          img: assets.firstHandyman,
          rating: 10,
        },
        {
          firstName: 'Lamar',
          lastName: 'Kendrick',
          specialization: 'Plumbing',
          experience: 2,
          email: 'larry.goldman@gmail.com',
          img: assets.secondHandyman,
          rating: 6,
        },
        {
          firstName: 'John-tra',
          lastName: 'Volta',
          specialization: 'Tiling',
          experience: 3,
          email: 'francisco.degoya@gmail.com',
          img: assets.thirdHandyman,
          rating: 9.9,
        },
        {
          firstName: 'Fedor',
          lastName: 'Kerov',
          specialization: 'Painting',
          experience: 1,
          email: 'john.doe@gmail.com',
          img: assets.firstHandyman,
          rating: 10,
        },
        {
          firstName: 'Papi',
          lastName: 'Hans',
          specialization: 'Plumbing',
          experience: 2,
          email: 'larry.goldman@gmail.com',
          img: assets.secondHandyman,
          rating: 5,
        },
      ],
      totalHandymanData: [],
      perPageOptions: 10,
      pagination: { page: 1 },
    }
  },
  methods: {
    changePage(payload) {
      console.log('check', payload.page)
      console.log('check again', payload)
      this.pagination.page = payload.page
    },
  },
  computed: {
    computedTableData() {
      if (!this.$store.getters.allHandymen) {
        return []
      } else {
        const firstIndex = (this.pagination.page - 1) * this.perPageOptions
        const lastIndex = this.pagination.page * this.perPageOptions
        return this.$store.getters.allHandymen.slice(firstIndex, lastIndex)
      }
    },
  },

  async mounted() {
    // when component mounts fn dispatches an action w a get request and the auth token
    await this.$store.dispatch('getAllHandymen', this.$store.getters.userToken)
    //sets totalHandymanData to the value of the getter within the store
    this.totalHandymanData = this.$store.getters.allHandymen
  },
}
</script>

<style scoped lang="scss"></style>
