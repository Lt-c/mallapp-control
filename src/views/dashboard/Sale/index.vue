<template>
  <el-card class="box-card" style="margin:10px 0px">
    <div slot="header" class="clearfix">
      <!-- 头部左侧内容 -->
      <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="sale" />
        <el-tab-pane label="访问量" name="visite" />
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="right">
        <span @click="toDay">今日</span>
        <span @click="toWeek">本周</span>
        <span @click="toMouth">本月</span>
        <span @click="toYear">本年</span>

        <!-- v-model="value1" -->
        <el-date-picker
          v-model="date"
          class="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          size="mini"
        />
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <TrendChart :title="title" style="width:100%;height:100%" />
        </el-col>
        <el-col :span="6">
          <TrendList :title="title" />
        </el-col>
      </el-row>
    </div>

  </el-card>
</template>

<script>
import TrendChart from './TrendChart'
import TrendList from './TrendList'
import dayjs from 'dayjs'
export default {
  name: 'Sale',
  components: { TrendChart, TrendList },
  data() {
    return {
      activeName: 'sale',
      date: []
    }
  },
  computed: {
    // 计算标题
    title() {
      return this.activeName === 'sale' ? '销售额' : '访问量'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 当天
    toDay() {
      const day = dayjs().format('YYYY-MM-DD')
      this.date = [day, day]
    },
    // 本周
    toWeek() {
      const week1 = dayjs().day(1).format('YYYY-MM-DD')
      const week2 = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [week1, week2]
    },
    // 当月
    toMouth() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start, end]
    },
    // 本年
    toYear() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start, end]
    }
  }
}
</script>

<style lang="scss" scoped>

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .clearfix {
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  .tabs {
    width: 100%;
  }
  .right {
    position: absolute;
    right: 0px;
  }
  .right span{
    font-size: 14px;
    margin: 0px 10px;
  }
  .date {
    width: 222px;
    margin: 0px 20px;
  }
  .el-row {
    /* 设置ehcarts高度，需要在他父级设置 */
    height: 300px;
  }
  .el-col {
    height: 100%;
  }
  // 深度选择器
  ::v-deep .el-card__header{
      border-bottom: none;
    }
</style>
