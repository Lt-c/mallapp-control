<template>
  <div ref="charts" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'VisiterNum',
  mounted() {
    var chartDom = this.$refs.charts
    var myChart = echarts.init(chartDom)
    var option = {
      title: {
        text: '门店销售额排名'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }

    option && myChart.setOption(option)
  }

}
</script>

<style>

</style>
