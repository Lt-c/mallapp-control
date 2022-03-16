<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <!-- 没有三级分类id的时候不可点击 -->
        <el-button type="primary" icon="el-icons-puls" :disabled="!category3Id" @click="controlTableShow">添加属性</el-button>
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
            <!-- 此处的template 的slot-scope需要使用花括号 -->
            <template slot-scope="{row}">
              <el-tag v-for="attrValue in row.attrValueList" :key="attrValue.id" type="success">{{ attrValue.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="150"
          >
            <template slot-scope="{row}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="controlTableShow">{{ row }} </el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini">{{ row }} </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--
        修改属性的结构
       -->
      <div v-show="!isShowTable">
        <el-form ref="form" :inline="true">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" />
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus">添加属性值</el-button>
        <el-button @click="controlTableShow">取消</el-button>
        <el-table style="width: 100%">
          <el-table-column prop="date" label="序号" width="80" align="center" />
          <el-table-column prop="name" label="属性值名称" width="width" />
          <el-table-column prop="address" label="操作" width="width" />
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="controlTableShow">取消</el-button>
      </div>
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
      attrList: [],
      // 控制table表格显示与隐藏
      isShowTable: true,
      // 收集新增属性|修改属性使用
      attrInfo: {
        attrName: '', // 属性名
        attrValueList: [ // 属性值，可以有多个，所以使用数组，每一个值都是对象，有attrId和valueName
          {
            attrId: 0,
            id: 0,
            valueName: ''
          }
        ],
        categoryId: 0, // 三级分类的id
        categoryLevel: 3, // 区分几级目录
        id: 0 }
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
    },
    // 修改table显示
    controlTableShow() {
      this.isShowTable = !this.isShowTable
    }
  }
}
</script>

<style scoped>
</style>
