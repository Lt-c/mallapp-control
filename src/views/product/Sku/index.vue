<template>
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="skuList">
      <el-table-column type="index" align="center" label="序号" width="80" />
      <el-table-column prop="skuName" label="名称" width="width" />
      <el-table-column prop="skuDesc" label="描述" width="width" />
      <el-table-column label="默认图片" width="110">
        <template slot-scope="{row}">
          <img :src="row.skuDefaultImg" alt="" style="width: 100px; height:100px">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80" />
      <el-table-column prop="price" label="价格" width="80" />
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row}">
          <el-button v-if="row.isSale" type="info" icon="el-icon-sort-down" size="small" @click="cancelSale(row)" />
          <el-button v-else type="success" icon="el-icon-sort-up" size="small" @click="sale(row)" />
          <el-button type="warning" icon="el-icon-edit" size="small" @click="edit" />
          <el-button type="info" icon="el-icon-info" size="small" @click="getSkuInfo(row)" />
          <el-button type="danger" icon="el-icon-delete" size="small" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="text-align:center"
      :current-page="page"
      :page-sizes="[10, 20, 50]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 抽屉框 -->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :show-close="false"
      size="45%"
    >
      <el-row>
        <el-col :span="4">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">价格</el-col>
        <el-col :span="16">{{ skuInfo.weight }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">平台属性</el-col>
        <el-col :span="16">
          <el-tag v-for="attr in skuInfo.skuAttrValueList" :key="attr.id" type="success">{{ attr.attrId }} -{{ attr.valueId }}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="600px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <!-- <h3 class="small">{{ item }}</h3> -->
              <img :src="item.imgUrl" alt="" height="600px">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      skuList: [],
      skuInfo: {},
      // 控制抽屉框
      drawer: false,
      direction: 'rtl'
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    async getSkuList() {
      const { page, limit } = this
      const result = await this.$API.sku.reqSkuList(page, limit)
      console.log(result)
      if (result.code === 200) {
        this.total = result.data.total
        this.skuList = result.data.records
      }
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getSkuList()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getSkuList()
    },
    // 上下架处理
    async sale(row) {
      const result = await this.$API.sku.reqSale(row.id)
      if (result.code === 200) {
        row.isSale = 1
        this.$message({ type: 'success', message: '上架成功' })
      }
    },
    async cancelSale(row) {
      const result = await this.$API.sku.reqCancelSale(row.id)
      if (result.code === 200) {
        row.isSale = 0
        this.$message({ type: 'success', message: '下架成功' })
      }
    },
    edit() {
      this.$message('编辑SKU功能正在开发中...')
    },
    // 获取sku详情信息
    async getSkuInfo(row) {
      const result = await this.$API.sku.reqSkuInfo(row.id)
      if (result.code === 200) {
        this.skuInfo = result.data
        this.drawer = true
      }
    }
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>

<style scoped>
  .el-row .el-col-4{
    font-size: 18px;
    text-align: right;
  }
  .el-row {
    margin: 10px 10px;
  }
  .el-col {
    margin: 0px 10px;
  }
</style>
