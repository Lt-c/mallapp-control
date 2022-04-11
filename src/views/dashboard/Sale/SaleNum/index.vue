<template>
  <div ref="charts" class="charts" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'SaleNum',
  props: {
    title: {
      type: String,
      default: '销售额'
    }
  },
  mounted() {
    var chartDom = this.$refs.charts
    var myChart = echarts.init(chartDom)
    var option = {
      title: {
        text: `${this.title}趋势`
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
          data: [10, 52, 200, 334, 390, 330, 220, 221, 200, 120, 100, 20]
        }
      ]
    }

    option && myChart.setOption(option)
  }

}
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}

</style>
