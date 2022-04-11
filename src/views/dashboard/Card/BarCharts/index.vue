<template>
  <div ref="charts" class="charts">1</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'BarCharts',
  mounted() {
    const dom = this.$refs.charts
    console.log(dom.childNodes)
    const myChart = echarts.init(dom)
    const options = {
      xAxis: {
        // 隐藏x轴
        show: false,
        type: 'category'

      },
      yAxis: {
        show: false,
        gridIndex: 0
      },
      series: [
        {
          type: 'bar',
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44],
          smooth: true,
          // 拐点的样式
          itemStyle: {
            opacity: 0
          },
          // 线条的样式
          lineStyle: {
            color: 'purple'
          },
          // 填充颜色设置
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'purple' // 0% 处的颜色
              },
              {
                offset: 1, color: '#fff' // 100% 处的颜色
              }],
              global: false
            }
          }
        }
      ],
      // 布局设置
      // gird: {
      //   left: 0,
      //   top: 0,
      //   right: 0,
      //   bottom: 0
      // }
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

<style>

</style>
