<template>
  <section class="container">
    <p class="flex justify-center">
      <svg
        @click="changePage(0)"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        @click="changePage(-1)"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      <span class="inner-pagination-content">
        Showing Page {{ page }} of {{ pages }}
      </span>
      <svg
        @click="changePage(1)"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        @click="changePage(pages)"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
        <path
          fill-rule="evenodd"
          d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </p>
  </section>
</template>

<script>
export default {
  props: {
    totalRecords: {
      type: Number,
      required: true,
    },
    perPageOptions: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
      perPage: this.perPageOptions,
    }
  },
  methods: {
    changePage(val) {
      switch (val) {
        case 0:
          this.page = 1
          break
        case -1:
          this.page = this.page > 1 ? this.page - 1 : this.page
          break
        case 1:
          this.page = this.page < this.pages ? this.page + 1 : this.pages
          break
        case this.pages:
          this.page = this.pages
          break
      }
      this.$emit(
        'update-page',
        { page: this.page, perPage: this.perPage },
        console.log('haha', { page: this.page, perPage: this.perPage })
      )
    },
  },
  computed: {
    pages() {
      const remainder = this.totalRecords % this.perPage
      if (remainder > 0) {
        return Math.floor(this.totalRecords / this.perPage) + 1
      } else {
        return this.totalRecords / this.perPage
      }
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  text-align: center;
  justify-content: center;
}
</style>
