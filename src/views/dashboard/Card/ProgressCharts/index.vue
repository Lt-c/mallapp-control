<template>
  <div ref="charts" class="charts">1</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'ProgressCharts',
  mounted() {
    const dom = this.$refs.charts
    // console.log(dom.childNodes)
    const myChart = echarts.init(dom)
    const options = {
      xAxis: {
        // 隐藏x轴
        show: false,
        // 两侧是否留空
        boundaryGap: false,
        // 最大值和最小值
        min: 0,
        max: 100

      },
      yAxis: {
        type: 'category',
        show: false
      },
      series: [
        {
          type: 'bar',
          data: [70],
          color: 'green',
          barWidth: '20%',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
          label: {
            show: true,
            formatter: '|',
            position: 'right'
          }

        }
      ],
      grid: {
        left: 0,
        top: 0,
        width: '100%', height: '85%'
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
