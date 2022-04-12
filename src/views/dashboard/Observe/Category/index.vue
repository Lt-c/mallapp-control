<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div class="search-header">
        <span>销售类别占比</span>
        <el-radio-group v-model="value" size="mini">
          <el-radio-button label="全部渠道" />
          <el-radio-button label="线上" />
          <el-radio-button label="门店" />
        </el-radio-group>
      </div>
    </div>
    <div>
      <div ref="charts" class="charts" />
    </div>

  </el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Category',
  data() {
    return {
      value: '全部渠道'
    }
  },
  mounted() {
    var myChart = echarts.init(this.$refs.charts)
    var option = {
      title: {
        text: '',
        subtext: 0,
        top: 'center',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside'
          },
          labelLine: {
            show: true
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    }
    option && myChart.setOption(option)
    // 给charts绑定事件
    myChart.on('mouseover', (params) => {
      const { name, value } = params
      myChart.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
  }

}
</script>

<style>
.search-header span{
  text-align: center;
}
.charts {
  width: 100%;
  height: 300px;
}

</style>
