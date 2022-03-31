<template>
  <el-form ref="form" :model="skuInfo" label-width="80px">
    <el-form-item label="SPU名称">
      {{ spu.spuName }}
    </el-form-item>
    <el-form-item label="SKU名称">
      <el-input v-model="skuInfo.skuName" placeholder="SKU名称" />
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input v-model="skuInfo.price" type="number" placeholder="价格(元)" />
    </el-form-item>
    <el-form-item label="重量(千克)">
      <el-input v-model="skuInfo.weight" placeholder="重量(千克)" />
    </el-form-item>
    <el-form-item label="规格描述">
      <el-input v-model="skuInfo.skuDesc" type="textarea" rows="3" />
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="屏幕尺寸">
          <el-select v-model="form" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
          </el-select>
        </el-form-item>
        <el-form-item label="无线通信">
          <el-select v-model="form" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="颜色">
          <el-select v-model="form" placeholder="请选择">
            <el-option label="label" value="value" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片列表">
      <el-table style="width: 100%" border>
        <el-table-column type="selection" label="序号" width="80">1 </el-table-column>
        <el-table-column label="图片" width="width">1 </el-table-column>
        <el-table-column label="名称" width="width">1 </el-table-column>
        <el-table-column label="操作" width="width">1 </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      form: {},
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      skuInfo: {
        // 第一类 从父组件中获取
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类 数据双向绑定获取的
        skuName: '',
        price: 0,
        weight: '',
        skuDesc: '',
        // 第三类 自己收集统计，使用自建的数组之类的
        // 默认图片
        skuDefaultImg: '',
        skuImageList: []
      },
      spu: { }
    }
  },
  methods: {
    async getData(category1Id, category2Id, spu) {
      console.log(spu)
      // 获取sput图片
      const imgResult = await this.$API.sku.reqSpuImgList(spu.id)
      console.log(imgResult)
      if (imgResult.code === 200) {
        this.spuImageList = imgResult.data
      }
      // 获取spu销售属性
      const saleResult = await this.$API.sku.reqSpuSaleAttrList(spu.id)
      if (saleResult.code === 200) {
        this.spuSaleAttrList = saleResult.data
      }
      // 获取spu销售属性信息
      const attrResult = await this.$API.sku.reqAttrInfoList(category1Id, category2Id, spu.category3Id)
      if (attrResult.code === 200) {
        this.attrInfoList = attrResult.data
      }
      // 获取到的数据，传递给此元素
      // 从父组件中获取的数据
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.spu = spu
    },
    // 取消按钮的回调
    cancel() {
      this.$emit('changeScreen', { screen: 0, flag: '' })
      console.log(111)
    }
  }
}
</script>

<style>

</style>
