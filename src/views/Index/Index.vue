<template>
  <div class="index">
    <Header/>
    <div class="index-money-box">
      <div class="index-money-item">
        <span class="index-money-icon"></span>
        <div class="index-money-right">
          <p class="index-money-icon-tit">账户余额</p>
          <span class="index-money-num">￥165315</span>
        </div>
      </div>
      <div class="index-money-item">
        <span class="index-money-icon"></span>
        <div class="index-money-right">
          <p class="index-money-icon-tit">今日消耗</p>
          <span class="index-money-num">￥165315</span>
        </div>
      </div>
    </div>
    <div class="index-info-box">
      <div class="index-info-header">
        <p class="index-info-header-left">整体情况</p>
        <div class="index-info-header-right">
          <span :class="time === 'week' ? 'active time' : 'time'" @click="changeTime('week')">近7天</span>
          <span :class="time === 'month' ? 'active time' : 'time'" @click="changeTime('month')">近30天</span>
          <el-date-picker format value-format="yyyy/MM" v-model="startTime" type="month" placeholder="选择月">
          </el-date-picker>
          <el-date-picker format value-format="yyyy/MM" v-model="endTime" type="month" placeholder="选择月">
          </el-date-picker>
        </div>
      </div>
      <div class="cards">
        <el-row :gutter="12">
          <el-col :span="4">
            <el-card shadow="hover">
              总是显示
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              鼠标悬浮时显示
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              从不显示
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              从不显示
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="select-container">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div ref="map" class="map-container"></div>
    </div>
  </div>
</template>

<script>
import { echarts, init } from 'echarts'
import Header from '@/components/Header'
export default {
  data() {
    return {
      time: 'week',
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      echartsData: {
        xAxis: {
          type: 'category',
          data: ['a', 'a', 'a', 'a', 'a', 'a']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      },
      startTime: '',
      endTime: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }],
      value: '曝光量',
      myEcharts: null
    }
  },
  watch: {
    startTime(val) {
      if (this.startTime && this.endTime) {
        this.farmatData()
      }
    },
    endTime(val) {
      if (this.startTime && this.endTime) {
        this.farmatData()
      }
    }
  },
  methods: {
    changeTime(str) {
      this.time = str
    },
    farmatData() {
      let startArr = this.startTime.split('/')
      let endArr = this.endTime.split('/')
      let arr = [];
      let num = 0;
      if (startArr[0] === endArr[0]) {
        num = endArr[1] * 1 - startArr[1] * 1 + 1
      } else if (endArr[0] - startArr[0] === 1) {
        num = 12 - startArr[1] * 1 + 1 + endArr[1] * 1
      } else {
        num = 12 - startArr[1] * 1 + 1 + endArr[1] * 1 + (endArr[0] - startArr[0] - 1) * 12
      }
      for (let i = 0; i < num; i++) {
        if (startArr[1] > 12) {
          startArr[1] = 1;
          ++startArr[0]
        }
        arr.push(`${startArr[0]}/${startArr[1]++}`)
      }
      this.echartsData.xAxis.data = arr
      this.myEcharts.setOption(this.echartsData);
    }
  },
  mounted() {
    this.myEcharts = init(this.$refs.map)
    this.myEcharts.setOption(this.echartsData);
    window.onresize = () => {
      this.myEcharts.resize()
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>
.index {
  width: 100%;
  min-width: 1200px;
  height: 100%;
  flex: 1;
  background: rgb(245, 245, 245);
}

.index-money-box {
  padding: 20px 22px;
  display: flex;
}

.index-money-item {
  width: 368px;
  height: 111px;
  background: #FFFFFF;
  border-radius: 2px;
  margin-right: 25px;
}

.index-money-icon {
  display: inline-block;
  width: 60px;
  height: 60px;
  background: #FFFFFF;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.05);
  border-radius: 50px;
  margin: 25.5px 20px 0 25.5px;
}

.index-money-right {
  display: inline-block;
  transform: translateY(-10px)
}

.index-money-icon-tit {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  padding-bottom: 10px;
}

.index-info-box {
  width: 97%;
  height: 70%;
  background: #fff;
  margin-left: 20px;
}

.index-money-num {
  font-family: HelveticaNeue;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.85);
}

.index-info-header {
  width: 100%;
  height: 62px;
  border-bottom: 1px solid #ccc;
}

.index-info-header-left {
  font-family: MicrosoftYaHei;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.85);
  letter-spacing: 0;
  height: 100%;
  line-height: 62px;
  padding-left: 50px;
  display: inline-block;
}

.index-info-header-right {
  float: right;
  height: 100%;
  width: 710px;
}

.time {
  display: inline-block;
  height: 100%;
  line-height: 62px;
  margin: 0 15px;
  cursor: pointer;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  letter-spacing: 0;
  position: relative;
  padding: 0 3px;
}

.time::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  left: 0;
  bottom: 0;
  background: transparent;
}

.time.active {
  color: #2873FF;
}

.time.active:after {
  background: #2873FF;
}

.cards {
  padding: 20px 0 20px 20px;
}

.map-container {
  width: 1450px;
  height: 370px;
}

.select-container {
  padding: 0px 0 0 30px;
}
</style>