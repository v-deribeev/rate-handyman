<template>
  <div>
    <input type="file" @change="onFileSelected" />
    <button @click="onUpload">Upload</button>
  </div>
  <div id="shit"></div>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: null,
      //   userImage: '',
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile, 'file')
    },
    onUpload() {
      const fd = new FormData()
      fd.append('image', this.selectedFile, this.selectedFile.name)
      const response = this.axios.post('/users/self/avatar', fd, {
        headers: {
          Authorization: localStorage.getItem('JWT'),
        },
      })
      console.log('backend response', response)
    },

    async getAvatar() {
      const userAvatar = await this.axios.get('/users/self/avatar', {
        headers: { Authorization: localStorage.getItem('JWT') },
      })
      let imgsrc =
        'data:image/jpeg;base64,' +
        btoa(unescape(encodeURIComponent(userAvatar.data)))
      let img = new Image(1, 1)
      img.src = imgsrc

      let quick = document.getElementById('shit')
      quick.appendChild(img)
    },
  },
  mounted() {
    this.getAvatar()
  },
}
</script>

<style scoped lang="scss"></style>
