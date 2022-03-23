<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect :show="!show" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <!-- 底部将会有三部分进行切换 -->
      <div>
        <!-- 展示spu列表 -->
        <el-button type="primary" icon="el-icon-plus">添加Spu</el-button>
        <el-table style="width: 100%" border :data="list">
          <el-table-column type="index" label="序号" align="center" width="80" />
          <el-table-column prop="prop" label="Sku名称" width="width" />
          <el-table-column prop="prop" label="Sku描述" width="width" />
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row, $index}">
              {{ scope.row.status }}
              <!-- 按钮，这里按钮将来用hintbutton替代 因为鼠标hover时需要有提示 -->
              <el-button type="success" icon="el-icon-plus" size="mini">1</el-button>
              <el-button type="warning" icon="el-icon-edit" size="mini">2</el-button>
              <el-button type="info" icon="el-icon-info" size="mini">3</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini">4</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align:center"
          :current-page="page"
          :page-sizes="[5, 10, 20]"
          :page-size="limit"
          layout=" prev, pager, next, jumper, ->,sizes,total"
          :total="total"
        />
        <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange" -->
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Spu',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      // 控制三级联动可操作性
      show: true,
      // 分页器需要的数据
      page: 1,
      limit: 5,
      total: 0,
      // table中需要展示的数据
      list: []

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
    async getSpuList() {
      const { page, limit, category3Id } = this
      const result = await this.$API.spu.reqSkuList(page, limit, category3Id)
      if (result.code === 200) {
        this.list = result.data.records
        this.total = result.data.total
      }
    }
  }
}
</script>

<style scoped>
</style>
