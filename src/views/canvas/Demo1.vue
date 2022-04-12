<template>
  <!-- canvas
  有默认的宽高 300*150
  浏览器认为 canvas 是一张图片
  canvas 不能自结束，其中添加任何文本内容没有意义，无法添加子节点
  对canvas的任何操作，都必须使用js来操作
  canvas 的宽高 不能使用样式来操作 必须是用标签属性来操作 width|height

   -->
  <div>
    <!-- 线段 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>canvas-绘制 线段</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="draw1">绘制</el-button>
      </div>
      <canvas ref="canvas1" height="200px" width="400px">demo1 </canvas>
    </el-card>
    <!-- 矩形 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>canvas-绘制 矩形</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="draw2">绘制</el-button>
      </div>
      <canvas ref="canvas2" height="200px" width="400px">demo2 </canvas>
    </el-card>
    <!-- 园 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>canvas-绘制 园</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="draw3">绘制</el-button>
      </div>
      <canvas ref="canvas3" height="200px" width="400px">demo3 </canvas>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'Demo1',
  mounted() {

  },
  methods: {
    // 线段
    draw1() {
      // 获取dom节点
      const canvas = this.$refs.canvas1
      // 获取画布的笔，上下文
      const ctx = canvas.getContext('2d')
      // console.log(ctx)
      // 绘制线段:绘制线段的起点设置
      ctx.moveTo(100, 100)
      // 其他点的设置
      ctx.lineTo(200, 150)
      ctx.lineTo(100, 150)
      // 起点和终点链接在一起
      ctx.closePath()
      // 设置图形填充的颜色
      ctx.fillStyle = 'red'
      ctx.fill()
      // 设置线段的颜色
      ctx.strokeStyle = 'blue'
      // 设置线段的宽度
      ctx.lineWidth = '5'
      // stroke 方法绘制线段,这个命令运行，就是在页面汇总画出这个图
      ctx.stroke()
    },
    // 矩形
    draw2() {
      const canvas = this.$refs.canvas2
      const ctx = canvas.getContext('2d')
      // 绘制矩形的第一种方式，参数为 x,y,w,h
      ctx.strokeRect(50, 100, 50, 50)
      // 第二种方式
      // 绘制前可以修改颜色
      ctx.fillStyle = 'red'
      // ctx.fill()
      ctx.fillRect(150, 100, 100, -100) // 默认填充默认为black
    },
    // 园
    draw3() {
      const canvas = this.$refs.canvas3
      const ctx = canvas.getContext('2d')
      // 绘制圆形
      ctx.beginPath()
      // 参数内容，x,y,半径，起始度数，结束度数，是否逆时针绘制
      ctx.arc(50, 50, 30, 0, 2 * Math.PI, true)
      // 2 Math.Pi 弧度 等于260度
      // 填充颜色
      ctx.fillStyle = 'red'
      ctx.fill()
      ctx.stroke()
    }
    // 清除画布
    // clear(){

    // }

  }
}
</script>

<style scoped>
 canvas {
   border: 1px solid black;
 }
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

  .box-card {
    width: 480px;
  }
</style>
