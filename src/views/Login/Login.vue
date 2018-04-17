<template>
  <div class="login">
    <img src="../../../static/img/logo.png" alt="">
    <div class="login-form">
      <el-form label-position="top" label-width="80px" :model="formLabelAlign">
        <el-form-item label="账号" :rules="userRule">
          <el-input v-model="formLabelAlign.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" :rules="psRule">
          <el-input v-model="formLabelAlign.ps"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="loginFn" type="primary"> 登录 </el-button>
      <span style="margin: 0 20px;"></span>
      <el-button type="primary"> 注册 </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        user: 'svip',
        ps: '123'
      },
      userRule: [{
        required: true, message: '请输入您的账号'
      }],
      psRule: [{
        required: true,
        message: '请输入您的密码'
      }]
    }
  },
  methods: {
    loginFn() {
      let that = this
      if (this.formLabelAlign.user && this.formLabelAlign.ps) {
        this.$store.dispatch('login', {
          userInfo: {
            user: this.formLabelAlign.user,
            ps: this.formLabelAlign.ps
          },
          prompt: this.$notify,
          error() {
            Object.assign(that.formLabelAlign, {
              user: '',
              ps: ''
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgb(28, 41, 65);
  position: relative;
}

.login img {
  position: absolute;
  left: 1;
  top: 1;
}

.login-form {
  position: absolute;
  padding: 20px;
  width: 400px;
  height: 300px;
  background: #fff;
  z-index: 333;
  top: 200px;
  left: 800px;
}
</style>