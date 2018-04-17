<template>
  <span class="aside">
    <el-radio-group class="toggle-show" v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu router default-active="/index/index" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-menu-item class="logo-tit" index="1">
        <i class="el-icon-setting"></i>
        <span class="home-tit" slot="title">智能投放系统</span>
      </el-menu-item>
      <el-menu-item class="create-guanggao" index="6">
        <i class="el-icon-setting"></i>
        <span class="aside-item-tit" slot="title">新建广告</span>
      </el-menu-item>
      <el-menu-item index="/index/index">
        <i class="el-icon-menu"></i>
        <span class="aside-item-tit" slot="title">首页概览</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span class="aside-item-tit" slot="title">广告管理</span>
        </template>
        <el-menu-item-group style="background: #1C2941;">
          <el-menu-item index="/index/plan">广告计划</el-menu-item>
          <el-menu-item index="1-2">广告单元</el-menu-item>
          <el-menu-item index="/index/creativity">广告创意</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4" disabled>
        <i class="el-icon-document"></i>
        <span class="aside-item-tit" slot="title">数据中心</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span class="aside-item-tit" slot="title">工具箱</span>
      </el-menu-item>
    </el-menu>

  </span>
</template>


<style>
.aside {
  height: 100%;
  background: #022050;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  float: left;
  position: relative;
}

.toggle-show {
  position: absolute;
  left: 100%;
  top: 10px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 260px;
  height: 100%;
  background: transparent;
}

.el-menu.el-menu-vertical-demo.el-menu--collapse {
  background: #022050;
}

.logo-tit {
  width: 100%;
  height: 65px;
  background: #1C2941;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}

.home-logo {
  width: 33.6px;
  height: 33.2px;
  background: #fff;
  margin: 0 20px;
}

.home-tit {
  font-family: MicrosoftYaHei-Bold;
  font-size: 20px;
  color: #FFFFFF;
  letter-spacing: 2px;
}

.aside-item-tit {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.65);
}

.el-menu-item {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.65);
}

.el-menu-item.is-active {
  background: #2873FF;
  color: #fff;
}

.el-radio-group {
  display: flex;
}

.create-guanggao {
  margin: 40px 0;
  background-image: linear-gradient(-90deg, #095DE1 0%, #081A6C 94%);
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #FFFFFF;
}
</style>

<script>
export default {
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
}
</script>
