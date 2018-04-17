<template>
  <div class="idea-box">
    <div class="uploading-img">
      <p :style="{display: hah}" style="lineHeight: 5; textAlign:center">640*240 像素</p>
      <p :style="{display: hah}" @click="uploadingFn" style="cursor:pointer;;textAlign:center;font-family: MicrosoftYaHei;font-size: 14px;color: #2873FF;letter-spacing: 0;">点击上传</p>
      <el-upload class="avatar-uploader" action="http://localhost:9999/dsp-creative/creative/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <p style="font-family: MicrosoftYaHei;font-size: 12px;color: #606266;letter-spacing: 0;">JPG/JPEG，小于30KB</p>
    <div style="marginTop: 10px">
      <span style="font-family: MicrosoftYaHei;font-size: 14px;color: rgba(0,0,0,0.65);">广告文案：</span>
      <input maxlength="18" v-model="opt.text1" placeholder="请设置广告名称" style="textIndent:1em;width: 432px; height: 32px;background: #FFFFFF;border: 1px solid #D9D9D9;border-radius: 2px;" type="text" name="" id="">
      <span style="marginLeft: 10px;font-family: MicrosoftYaHei;font-size: 14px;color: rgba(0,0,0,0.65);">{{`${inputLen}/18`}}</span>
    </div>
    <div style="marginTop: 10px ">
      <span style="font-family: MicrosoftYaHei;font-size: 14px;color: rgba(0,0,0,0.65);">监控链接：</span>
      <input v-model="opt.text2" placeholder="请设置广告名称" style="textIndent:1em;width: 432px; height: 32px;background: #FFFFFF;border: 1px solid #D9D9D9;border-radius: 2px;" type="text" name="" id="">
    </div>
  </div>
</template>

<script>
export default {
  props: ['opt'],
  data() {
    return {
      imageUrl: '',
      inputLen: 0,
      hah: 'block'
    }
  },
  watch: {
    ['opt.text1'](newVal, oldVal) {
      this.inputLen = newVal.length;
      if (newVal && this.opt.text2 && this.imageUrl) {
        this.opt.submit = true
      } else {
        this.opt.submit = false
      }
    },
    ['opt.text2'](newVal, oldVal) {
      if (newVal && this.opt.text1 && this.imageUrl) {
        this.opt.submit = true
      } else {
        this.opt.submit = false
      }
    }
  },
  methods: {
    uploadingFn() {
      document.querySelector('.el-icon-plus.avatar-uploader-icon').click()
      this.hah = 'none'
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file)
      this.imageUrl = "http://localhost:9999/" + res.data.value
      this.opt.img = "http://localhost:9999/" + res.data.value
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped>
.uploading-img {
  width: 180px;
  height: 180px;
  margin: 10px 0;
  border-radius: 6px;
  border: 1px dashed #ccc
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  display: none;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>