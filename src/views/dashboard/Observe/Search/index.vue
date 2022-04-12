<template>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div class="search-header">
        <span>线上热门搜索</span>
        <!-- 下拉框 -->
        <el-dropdown>
          <i class="el-icon-more" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-row :gutter="10">
      <el-col :span="12"><LineCharts title="搜索用户数" /></el-col>
      <el-col :span="12"><LineCharts /></el-col>
    </el-row>
    <!-- table表格 -->
    <!-- :default-sort="{prop: 'date', order: 'descending'}" -->
    <el-table border :data="tableData" style="width: 100%;margin-top:10px">
      <el-table-column type="index" label="排名" width="80" />
      <el-table-column prop="date" label="搜素关键字" width="180" />
      <el-table-column prop="date" label="用户数" sortable />
      <el-table-column prop="date" label="周涨幅" sortable />
    </el-table>
    <!-- 分页器 -->
    <div class="block">
      <!-- <span class="demonstration">大于 7 页时的效果</span> -->
      <el-pagination
        class="pagination"
        layout="prev, pager, next"
        :total="100"
        small
      />
    </div>
  </el-card>
</template>
<script>
import LineCharts from './LineCharts'
export default {
  name: 'Search',
  components: { LineCharts },
  data() {
    return {
      tableData: [{}]
    }
  }

}
</script>

<style>
.search-header {
  display: flex;
  justify-content: space-between;
  height: 28px;
  line-height: 28px;
}
.pagination{
  float: right;
  margin: 5px 0px;
}

</style>
