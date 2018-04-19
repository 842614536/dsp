<template>
  <div class="index">
    <h1 class="index-tit">看什么看 没见过计划么</h1>
    <input type="file" @change="fn"/>

    <form action="http://localhost:9999/dsp-creative/creative/upload"  method="post" enctype="multipart/form-data">
        <input type="file" id="fileId" name="file" value="请上传图片" />
        <input type="submit" id="submit" value="上传"/>
    </form>
    <button @click="add">{{this.obj.a.b}}</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      obj: {
        a: {
          b: 1
        }
      }
    }
  },
  methods: {
    add () {
      ++this.obj.a.b
    },
    fn (e) {
      const file = e.target.files[0]
      let formdata = new FormData()
      formdata.append('file', file)
      axios.post('http://localhost:9999/dsp-creative/creative/upload',formdata)
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style scoped>
.index{
  width: 100%;
  height: 100%;
}
.index-tit{
  text-align: center;
  padding-top: 250px;
  font-size: 30px;
}
</style>