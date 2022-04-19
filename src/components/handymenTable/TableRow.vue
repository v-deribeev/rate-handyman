<template class="flex">
  <tr
    class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
  >
    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {{ counter }}
    </td>
    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {{ handymanData.lastName + ' ' + handymanData.firstName }}
    </td>
    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {{ handymanData.email }}
    </td>
    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {{ handymanData.specialization }}
    </td>
    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {{ handymanData.experience }} {{ experienceYears }}
    </td>
    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {{ handymanData.rating }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'TableRow',
  props: {
    handymanData: {
      type: Object,
      required: true,
    },
    counter: {
      type: Number,
      required: true,
    },
  },
  computed: {
    experienceYears() {
      return this.handymanData.experience > 1 ? 'years' : 'year'
    },
  },
}
</script>

<style scoped lang="scss"></style>
