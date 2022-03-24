<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="SPU名称">
      <el-input v-model="spu.spuName" placeholder="SPU名称" />
    </el-form-item>
    <el-form-item label="品牌">
      <el-select v-model="tmList" placeholder="请选择品牌">
        <el-option v-for="tm in tmList" :key="tm.id" :label="tm.tmName" value="shanghai" />
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input v-model="form.desc" rows="4" type="textarea" placeholder="SPU描述" />
    </el-form-item>
    <el-form-item label="SPU图片">
      <!-- 使用element中的额照片墙  action提交给谁-->
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select v-model="model" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
      <el-table style="width: 100%" border>
        <el-table-column type="index" label="序号" width="80px" align="center">1 </el-table-column>
        <el-table-column prop="prop" label="属性名" width="width: 10%">1 </el-table-column>
        <el-table-column prop="prop" label="属性值名称列表" width="width: 60%">1 </el-table-column>
        <el-table-column prop="prop" label="操作" width="width: 20%">1 </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="$emit('changeScreen',0)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      form: {

      },
      // 照片墙相关
      dialogImageUrl: '',
      // dialog 控制显示大图
      dialogVisible: false,
      // 存储spu属性
      spu: {}, // 存储spu信息属性
      tmList: [], // 存储品牌信息
      spuImgList: [], // 存储spu图片属性
      saleAttrList: [] // 存储销售属性

    }
  },
  methods: {
    // 照片墙相关的 两个methods
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 初始化SpuForm数据
    async initSpuData(spu) {
      console.log('发数据', spu)
      // 获取spu信息的数据
      const spuResult = await this.$API.spu.reqSpuInfo(spu.id)
      if (spuResult.code === 200) {
        this.spu = spuResult.data
      }
      // 获取品牌的信息
      const tmResult = await this.$API.spu.reqTradeMarkList()
      if (tmResult.code === 200) {
        this.tmList = tmResult.data
      }
      // 获取spu图片
      const imgResult = await this.$API.spu.reqSpuImageList(spu.id)
      if (imgResult.code === 200) {
        this.spuImgList = imgResult.data
      }
      // 获取平台全部的销售属性
      const saleResult = await this.$API.sku.reqBaseSaleAttrList()
      if (saleResult.code === 200) {
        this.saleAttrList = saleResult.data
      }
    }

  }
}
</script>

<style>

</style>
