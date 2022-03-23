<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect :show="!show" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div />
    </el-card>
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
