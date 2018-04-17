<template>
  <div class="header">
    <el-dropdown placement="bottom">
      <span class="el-dropdown-link">
        <i class="el-icon-star-off"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item disabled>
          <span>现金余额</span>
          <p>￥ 156132165</p>
        </el-dropdown-item>
        <el-dropdown-item disabled>
          <span>今日消耗</span>
          <p>￥ 156132165</p>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown placement="bottom">
      <span class="el-dropdown-link">
        {{userInfo.user}}
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <template>
            <el-button type="text" @click="exit">退出登录</el-button>
          </template>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span style="paddingRight: 40px;"></span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      user: ''
    }
  },
  created() {
    
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    exit() {
      this.$confirm('确定要离开么', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已退出'
        });
        this.$router.push({
          path: '/login'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '就知道你舍不得走'
        });
      });
    }
  }
}
</script>

<style scoped>
.header {
  min-width: 800px;
  width: 100%;
  height: 64px;
  background: #FFFFFF;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #ccc;
  text-align: right;
  line-height: 64px;
}

.el-dropdown {
  margin: 0 50px;
}

.el-dropdown-link{
  padding: 0 20px;
}
</style>