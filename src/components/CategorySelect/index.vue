<template>
  <!--
    inline 表示行内表单，一行可以防止多个表单元素
   -->
  <el-form :inline="true" class="demo-form-inline" :model="cForm">
    <el-form-item label="一级分类">
      <el-select v-model="cForm.category1Id" placeholder="请选择" @change="handler1">
        <el-option v-for="c1 in list1" :key="c1.id" :label="c1.name" :value="c1.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select v-model="cForm.category2Id" placeholder="请选择" @change="handler2">
        <el-option v-for="c2 in list2" :key="c2.id" :label="c2.name" :value="c2.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select v-model="cForm.category3Id" placeholder="请选择" @change="handler3">
        <el-option v-for="c3 in list3" :key="c3.id" :label="c3.name" :value="c3.id" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CategorySelect',
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      // 收集响应的一级，二级，三级分类的id
      cForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  },
  mounted() {
    this.getCategory1()
    // console.log(this.$API.attr)
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    async getCategory1() {
      const result = await this.$API.attr.reqGetCategory1List()
      // console.log('一级', result)
      if (result.code === 200) {
        this.list1 = result.data
      }
    },
    // 获取二级分类
    async handler1() {
      // 当重新选择一级分类时候，需要清除
      this.list2 = []
      this.list3 = []
      this.cForm.category2Id = ''
      this.cForm.category3Id = ''
      const result = await this.$API.attr.reqGetCategory2List(this.cForm.category1Id)
      // console.log('二级', result)
      if (result.code === 200) {
        this.list2 = result.data
      }
      const { category1Id } = this.cForm
      this.$emit('getCategoryId', { categoryId: category1Id, level: 1 })
    },
    // 获取三级分类
    async handler2() {
      this.list3 = []
      this.cForm.category3Id = ''
      const result = await this.$API.attr.reqGetCategory3List(this.cForm.category2Id)
      // console.log('三级', result)
      if (result.code === 200) {
        this.list3 = result.data
      }
      const { category2Id } = this.cForm
      this.$emit('getCategoryId', { categoryId: category2Id, level: 2 })
    },
    // 三级选择
    handler3() {
      const { category3Id } = this.cForm
      this.$emit('getCategoryId', { categoryId: category3Id, level: 3 })
    }
  }
}
</script>

<style>

</style>
