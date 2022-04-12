<template>
  <div>
    <div class="header">
      <span class="search-header">{{ title }}</span>
      <svg t="1649607480481" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2217" width="24" height="24"><path d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z" p-id="2218" fill="#bfbfbf" /></svg>

    </div>
    <div class="main">
      <span class="main-title">1231</span>&nbsp;&nbsp;
      <span class="main-content">17.1</span>
      <span>
        <svg t="1649608829741" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8334" width="16" height="16"><path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3c-3.8 5.3-0.1 12.7 6.5 12.7h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" p-id="8335" fill="#d81e06" /></svg>
      </span>
      <span>
        <svg t="1649608993301" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8628" width="16" height="16"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3 0.1-12.7-6.4-12.7z" p-id="8629" fill="#1afa29" /></svg>
      </span>
    </div>
    <div class="footer">
      <div ref="charts" class="charts" />
    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineCharts',
  props: ['title'],
  mounted() {
    const myChart = echarts.init(this.$refs.charts)
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
          type: 'line',
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44],
          smooth: true,
          // 拐点的样式
          itemStyle: {
            opacity: 0
          },
          // 线条的样式
          lineStyle: {
            color: 'blue'
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
                offset: 0, color: 'blue' // 0% 处的颜色
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
        left: 10,
        top: 10,
        width: '90%', height: '85%'
      }
    }
    myChart.setOption(options)
  }
}
</script>

<style scoped>
 .header{
   display: flex;
   justify-content: space-between;
   color:#d9d9d9;
 }
 .main {
   margin: 10px 0px;
 }
 .main-title {
   margin-right: 30px;
 }
 .main-content{
   margin-right: 10px;
 }
 .charts{
   height: 50px;
   widows: 100%;
 }

</style>
