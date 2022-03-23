<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect :show="!show" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <!-- 底部将会有三部分进行切换 -->
      <div v-show="screen==0">
        <!-- 展示spu列表  :disabled="!category3Id" -->
        <el-button type="primary" icon="el-icon-plus" @click="addSku">添加Spu</el-button>
        <el-table style="width: 100%" border :data="list">
          <el-table-column type="index" label="序号" align="center" width="80" />
          <el-table-column prop="spuName" label="Sku名称" width="width" />
          <el-table-column prop="description" label="Sku描述" width="width" />
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row, $index}">
              <!-- {{ row }} -->
              <!-- 按钮，这里按钮将来用hintbutton替代 因为鼠标hover时需要有提示 -->
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加Sku">1</hint-button>
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改Sku" @click="updataSku(row)">2</hint-button>
              <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前Spu全部Sku列表">3</hint-button>
              <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除Spu">4</hint-button>
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
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
      <SpuForm v-show="screen==1" />
      <SkuForm v-show="screen==2" />
    </el-card>
  </div>
</template>

<script>
import SkuForm from './SkuForm'
import SpuForm from './SpuForm'
export default {
  name: 'Spu',
  components: { SpuForm, SkuForm },
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
      list: [],
      // 控制三个展示内容
      screen: 1 // 0表示展示spu列表数据 1表示展示添加|修改spu数据 2表示展示添加sku页面

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
    },
    // 点击分页器页码按钮的回调
    handleCurrentChange(page) {
      this.page = page
      this.getSpuList()
    },
    // 修改分页器单页显示页数的回调
    handleSizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    },
    // 添加spu
    addSku() {
      this.screen = 1
    },
    // 修改某一个spu
    updataSku(row) {
      console.log(row)
      this.screen = 1
    }
  }
}
</script>

<style scoped>
</style>
