<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <el-button type="primary" icon="el-icons-puls">添加属性</el-button>
      <!-- 表格；展示平台属性 -->
      <el-table
        :data="attrList"
        style="width: 100%"
        border
      >
        <el-table-column
          label="序号"
          width="80"
          type="index"
          align="center"
        />
        <el-table-column
          prop="attrName"
          label="属性名称"
          width="150"
          align="center"
        />
        <el-table-column
          prop="prop"
          label="属性值列表"
          width="width"
        >
          <template slot-scope="row" @change="console.log(row)">
            <el-tag v-for="attrValue in row.attrValueList" :key="attrValue.id" type="success">{{ attrValue.valueName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="prop"
          label="操作"
          width="150"
        />
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Attr',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrList: []
    }
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      // 区分三级分类相应的id，以及父组件进行存储
      if (level === 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      } else if (level === 2) {
        this.category2Id = categoryId
        this.category3Id = ''
      } else {
        this.category3Id = categoryId
        // 发起请求
        this.getAttrList()
      }
    },
    // 获取平台属性数据
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this
      console.log(category1Id, category2Id, category3Id)
      const result = await this.$API.attr.reqAttrInfoList(category1Id, category2Id, category3Id)
      // console.log(result.data) 是一个数组
      if (result.code === 200) {
        this.attrList = result.data
      }
    }
  }
}
</script>

<style scoped>
</style>
