<template>
  <el-card class="box-card" style="margin:10px 0px">
    <div slot="header" class="clearfix">
      <!-- 头部左侧内容 -->
      <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="sale"><SaleNum :key="1" :title="title" style="height:300px;width:100%" /></el-tab-pane>
        <el-tab-pane label="访问量" name="visi"><SaleNum :key="2" :title="title" style="height:300px;width:100%" /></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="right">
        <span>今日</span>
        <span>本周</span>
        <span>本月</span>
        <span>本年</span>

        <!-- v-model="value1" -->
        <el-date-picker
          class="date"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
        />

      </div>

    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="16"><SaleNum /></el-col>
        <el-col :span="8">1</el-col>
      </el-row>
    </div>

  </el-card>
</template>

<script>
import SaleNum from './SaleNum'
import VisiterNum from './VisiterNum'
export default {
  name: 'Sale',
  components: { SaleNum, VisiterNum },
  data() {
    return {
      activeName: 'sale'
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
    }
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

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
    height:300px;
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
    width: 100px;
    margin: 0px 20px;
  }
</style>
