<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="SPU名称">
      <el-input v-model="form.name" placeholder="SPU名称" />
    </el-form-item>
    <el-form-item label="品牌">
      <el-select v-model="form.region" placeholder="请选择品牌">
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
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
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button>取消</el-button>
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
      dialogVisible: false
    }
  },
  // 照片墙相关的 两个methods
  handleRemove(file, fileList) {
    console.log(file, fileList)
  },
  handlePictureCardPreview(file) {
    this.dialogImageUrl = file.url
    this.dialogVisible = true
  }
}
</script>

<style>

</style>
