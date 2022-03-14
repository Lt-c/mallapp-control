<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus">添加</el-button>
    <!--
      表格组件
      data:表格组件将来要展示的数据------数据类型
      border:给表格添加边框
      label：设置显示标题
      width:设置宽度
      align：设置标题的对齐方式
     -->
    <el-table style="width: 100%" border>
      <el-table-column
        prop="prop"
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="prop"
        label="品牌名称"
        width="width"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="prop"
        label="品牌LOGO"
        width="width"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="prop"
        label="操作"
        width="width"
        align="center"
      ></el-table-column>
    </el-table>

    <!--
      分页器
      当前第几页、数据总条数、每一页展示条数
      current-page：当前第几页
      total：总条目数
      page-sizes:单页展示多少条数据
      page-sizes：可以修改单页显示多少数据
      pager-count:页码按钮的数量，当总页数超过该值时会折叠，默认为7
      layout:分页器布局，文本的顺序，决定了内部的顺序 -> 后的数据显示在最右测
      触发事件
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"

    -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="5"
      :total="120"
      :page-size="5"
      :pager-count="7"
      :page-sizes="[10, 20, 50]"
      layout="prev, pager, next, jumper, ->, sizes, total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      list: []
    }
  },
  mounted() {
    
  }
}
</script>
