<template>
  <div ref="charts" class="charts">1</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'BarCharts',
  mounted() {
    const dom = this.$refs.charts
    // console.log(dom.childNodes)
    const myChart = echarts.init(dom)
    const options = {
      xAxis: {
        // 隐藏x轴
        show: false,
        type: 'category',
        // 两侧是否留空
        boundaryGap: false

      },
      yAxis: {
        show: false,
        gridIndex: 0
      },
      series: [
        {
          type: 'bar',
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44],
          // 拐点的样式
          itemStyle: {
            color: 'red'
            // opacity: 0
          }

        }
      ],
      grid: {
        left: 10,
        top: 0,
        width: '90%', height: '85%'
      }
    }
    myChart.setOption(options)
  }

}
</script>

<style scoped>
  .charts {
    height: 100%;
    width: 100%;
  }
</style>
