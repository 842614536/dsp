<template>
  <div class="creativity">
    <Header />
    <el-container style="height: 100%">
      <el-aside width="144px"></el-aside>
      <el-main>
        <h2 class="idea-tit">广告创意</h2>
        <h5 class="idea-kao">落地页</h5>
        <p class="idea-add-box">着陆页地址：<input type="text" placeholder="请设置广告名称" name="" id=""></p>
        <h5 class="idea-kao">上传创意</h5>
        <div class="idea-tab border">
          <span class="idea-tab-item" v-bind:class="{'active' : i == idx}" @click="tabFn(i)" :key="i" v-for="(item, i) in ideaArr">
            {{`创意${i+1}`}}
          </span>
          <el-button class="add-idea" type="text" @click="open">+添加创意</el-button>
        </div>
        <Kao :key="i" v-for="(item, i) in ideaArr" :opt="item" v-show="i === idx" />
        <keep-alive>
          
        </keep-alive>
        <hr style="marginTop: 40px" />
        <p @click="submit" class="submit" :class="ideaArr[idx].submit?'active':''">提交</p>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Kao from './kao'
import Vue from 'vue'
export default {
  name: "Creativity",
  data() {
    return {
      idx: 0,
      ideaArr: [{
        text1: '',
        text2: '',
        img: '',
        submit: false
      }]
    }
  },
  methods: {
    open() {
      this.$alert("<div class='idea-type' style='width: 180px;height: 147px;border:1px solid #ccc;display:inline-block'>单图</div><div class='idea-type' style='width: 180px;height: 147px;border:1px solid #ccc;display:inline-block;margin-left: 20px'>多图</div>", '选择模板', {
        dangerouslyUseHTMLString: true,
        showClose: false
      });
    },
    tabFn (i) {
      this.idx = i
    },
    submit () {
      if (this.ideaArr[this.idx].submit) {
        this.$store.dispatch('upCreative', this.ideaArr[this.idx])
      }
    }
  },
  created() {
    const that = this;
    document.body.onclick = function(e) {
      if (e.path[0].className === 'idea-type') {
        that.ideaArr.push({
          text1: '',
          text2: '',
          submit: false
        })
        that.idx = that.ideaArr.length - 1
        let btn = document.querySelector('.el-button.el-button--default.el-button--small.el-button--primary')
        btn.click()
      }
    }
  },
  components: {
    Header,
    Kao
  }
}
</script>

<style scoped>
.creativity {
  width: 100%;
  height: 100%;
}

.el-aside {
  background: #F5F5F5;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #fff;
  color: #333;
}

.idea-tit {
  font-family: MicrosoftYaHei;
  font-size: 30px;
  color: rgba(0, 0, 0, 0.85);
  letter-spacing: 0;
}

.idea-kao {
  font-family: MicrosoftYaHei-Bold;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.85);
  letter-spacing: 0;
  margin-top: 18px;
  font-weight: 800;
  padding-bottom: 20px;
}

.idea-add-box {
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.65);
}

.idea-add-box input {
  background: #FFFFFF;
  width: 432px;
  height: 32px;
  border: 1px solid #D9D9D9;
  border-radius: 2px;
  text-indent: 10px;
}

.add-idea {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #2873FF;
  letter-spacing: 0;
  padding-top: 20px;
  transform: translateY(-20px);
  cursor: pointer;
  display: inline-block;
}

.submit {
  width: 166px;
  height: 52px;
  background: #E8E8E8;
  border-radius: 2px;
  text-align: center;
  line-height: 52px;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.25);
}

.submit.active {
  background: #2873FF;
  color: #fff
}

.idea-tab {
  display: flex;
  height: 30px;
}

.idea-tab.border {
  border-bottom: 2px solid #cccccc;
}

.idea-tab-item {
  display: inline-block;
  height: 100%;
  border-bottom: transparent 2px solid;
  margin-right: 20px;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  letter-spacing: 0;
  cursor: pointer;
}

.idea-tab-item.active {
  border-bottom: #FA8C16 2px solid;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #FA8C16;
  letter-spacing: 0;
}
</style>