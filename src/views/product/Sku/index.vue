<template>
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%" border>
      <el-table-column type="index" align="center" label="序号" width="80"> 1 </el-table-column>
      <el-table-column prop="prop" label="名称" width="width"> 2 </el-table-column>
      <el-table-column prop="prop" label="描述" width="width"> 3 </el-table-column>
      <el-table-column prop="prop" label="默认图片" width="110"> 4 </el-table-column>
      <el-table-column prop="prop" label="重量" width="80"> 5 </el-table-column>
      <el-table-column prop="prop" label="价格" width="80"> 6 </el-table-column>
      <el-table-column prop="prop" label="操作" width="width"> 7 </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="text-align:center"
      :current-page="1"
      :page-sizes="[10, 20, 50]"
      :page-size="10"
      layout="prev, pager, next, jumper,->,sizes, total"
      :total="20"
    >
      <!-- @size-change="handleSizeChange"
      @current-change="handleCurrentChange" -->
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      // 控制三级联动可操作性
      show: true
    }
  },
  methods: {
    // 三级联动的自定义时间，把子组件的id传递给父组件，
    getCategoryId({ categoryId, level }) {
      // getCategoryId 各层级id， level 判断层级
      if (level === 1) {
        this.category1Id = categoryId
        // 清除二三级id，置空
        this.category2Id = ''
        this.category3Id = ''
      } else if (level === 2) {
        this.category2Id = categoryId
        this.category3Id = ''
      } else {
        this.category3Id = categoryId
        // 获取spu的列表
        this.getSpuList()
      }
    },
    // 获取spu列表数据的方法
    getSpuList() {

    }
  }
}
</script>

<style scoped>
</style>
