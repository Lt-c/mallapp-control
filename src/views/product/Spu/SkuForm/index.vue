<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="SPU名称">
      {{ 'haimian baobao' }}
    </el-form-item>
    <el-form-item label="SKU名称">
      <el-input v-model="model">ces </el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input v-model="model">ces </el-input>
    </el-form-item>
    <el-form-item label="重量(千克)">
      <el-input v-model="model">ces </el-input>
    </el-form-item>
    <el-form-item label="规格描述">
      <el-input v-model="model" type="textarea" rows="3">ces </el-input>
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
          <el-select v-model="model" placeholder="请选择">
            <el-option label="label" value="value" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片列表">
      <el-table :data="data" style="width: 100%" border>
        <el-table-column type="selection" label="序号" width="80">1 </el-table-column>
        <el-table-column label="图片" width="width">1 </el-table-column>
        <el-table-column label="名称" width="width">1 </el-table-column>
        <el-table-column label="操作" width="width">1 </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      form: {}
    }
  }
}
</script>

<style>

</style>
