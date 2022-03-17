<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <!-- 没有三级分类id的时候不可点击 -->
        <el-button type="primary" icon="el-icons-puls" :disabled="!category3Id" @click="addAttr">添加属性</el-button>
        <!-- 表格；展示平台属性 -->
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column label="序号" width="80" type="index" align="center" />
          <el-table-column prop="attrName" label="属性名称" width="150" align="center" />
          <el-table-column prop="prop" label="属性值列表" width="width">
            <!-- 此处的template 的st-scope需要使用花括号 -->
            <template slot-scope="{row}">
              <el-tag v-for="attrValue in row.attrValueList" :key="attrValue.id" type="success">{{ attrValue.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{row}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)" />
              <el-button type="danger" icon="el-icon-delete" size="mini">{{ row }} </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--
        添加|修改属性的结构
       -->
      <div v-show="!isShowTable">
        <el-form ref="form" :inline="true" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" />
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrInfo.attrName" @click="addAttrValue">添加属性值</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table style="width: 100%; margin:20px 0" border :data="attrInfo.attrValueList">
          <el-table-column label="序号" width="80" align="center" type="index" />
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{row}">
              <el-input v-model="row.valueName" placeholder="请输入属性名称" size="mini" />
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="width">
            <template slot-scope="{row}">
              <el-button type="danger" icon="el-icon-delete" size="mini" />
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="controlTableShow">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import deepclone from 'lodash/cloneDeep'
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
        ],
        categoryId: 0, // 三级分类的id
        categoryLevel: 3 // 区分几级目录
      }
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
    // 控制table显示与否
    controlTableShow() {
      this.isShowTable = !this.isShowTable
    },
    // 添加属性按钮的回调 ,清楚数据，并隐藏
    addAttr() {
      // 切换table的显示和隐藏
      this.isShowTable = !this.isShowTable
      // 清楚原有的数据
      this.attrList = {
        attrName: '',
        attrValueList: [
        ],
        categoryId: this.category3Id,
        categoryLevel: 3
      }
    },
    // 添加属性值的回调
    addAttrValue() {
      // 向attrInfo.attrValueList 数组添加数据
      // attrId 是相应的属性id，目前而言我们是添加属性的操作，没有相应属性的id，
      // valueName 相应的属性值的名称
      this.attrInfo.attrValueList.push({
        attrId: undefined,
        valueName: ''
      })
    },
    // 修改某一个属性
    updateAttr(row) {
      // 隐藏table
      this.isShowTable = !this.isShowTable
      // 由于数据当中有数组套对象，所以需要使用deepclone
      // this.attrInfo = row
      this.attrInfo = deepclone(row)
    }
  }
}
</script>

<style scoped>
</style>
