<template>
  <div ref="charts" class="charts" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'TrendChart',
  props: ['title'],
  data() {
    return {
      myChart: null
    }
  },
  watch: {
    title() {
      // this.updateCanvas()
      // 当title发生改变时,重新设置option，原来的数值不会发生改变，也就是可以对部分内容进行修改
      this.myChart.setOption({
        title: {
          text: `${this.title}趋势`
        }
      })
    }
  },
  mounted() {
    this.updateCanvas()
  },
  methods: {
    updateCanvas() {
      this.myChart = echarts.init(this.$refs.charts)
      const option = {
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

      option && this.myChart.setOption(option)
    }
  }

}
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}

</style>
