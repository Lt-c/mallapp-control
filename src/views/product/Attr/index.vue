<template>
  <div>
    <el-card style="margin: 20px 0">
      <!-- show 传递isShowTable 控制下拉框是否可选 跳转到属性界面时，不可选-->
      <CategorySelect :show="!isShowTable" @getCategoryId="getCategoryId" />
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
            <template slot-scope="{row, $index}">
              <!-- 这里需要sapn和input切换  此处的$index用于区分input，实现自动聚焦这个input-->
              <el-input v-if="row.flag" :ref="$index" v-model="row.valueName" autofocus placeholder="请输入属性名称" size="mini" @blur="changeFlag(row)" @keyup.native.enter="changeFlag(row)" />
              <span v-else style="display:block" @click="toEdit(row,$index)">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <!-- 删除操作 气泡确认框popconfirm  title使用模板字符串-->
              <el-popconfirm :title="`确定删除${row.valueName}?`" @onConfirm="deleteAttrValue($index)">
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini">删除 </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 按钮和三级联动的配合，当没有属性值时，不能保存 -->
        <el-button type="primary" :disabled="attrInfo.attrValueList.length < 1" @click="addOrUpdateArrt">保存</el-button>
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
    // 自定义时间，接收子组件传递来的数据
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
      this.attrInfo = {
        attrName: '',
        attrValueList: [],
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
        attrId: this.attrInfo.id, // 对于修改某一个属性时，可以在已有的属性基础之上新增新的属性值（新增属性值时，需要把已有的属性id带上）
        valueName: '',
        flag: true // 用于判断显示span或input  服务器是不需要这个字段，所以在上传的时候去掉
      })
      // flag属性，给每一个属性值新增一个flag属性，用户切换查看或者是编辑，用于每一个属性值，可以自己控制
      // 当前flag属性是响应式的，可以被vue检测到

      // 添加属性时候，也应该实现自动聚焦。添加属性，是在数组的最后一个元素
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },
    // 修改某一个属性
    updateAttr(row) {
      // 隐藏table
      this.isShowTable = !this.isShowTable
      // 由于数据当中有数组套对象，所以需要使用deepclone
      // this.attrInfo = row
      this.attrInfo = deepclone(row)
    },
    // 切换属性值flag 查看模式|修改模式
    changeFlag(row) {
      // 由编辑模式切换为查看模式
      // 属性值不能为空，，控制不能作为新的属性值，需要输入一个其他的值
      if (row.valueName.trim() === '') {
        this.$message('属性值不能为空，请输入一个有效值!')
        return
      }
      // 属性值不能与已有的重复
      const isRepeat = this.attrInfo.attrValueList.some(item => {
        // 需要判断row和item是否为两个对象  ,row为新增的元素
        if (row !== item) {
          return item.valueName === row.valueName.trim()
        }
      })
      if (isRepeat) {
        this.$message('属性值不能重复，请输入一个有效值!')
        return
      }
      row.flag = false
    },
    // 标签切换到编辑模式 点击span的回调
    toEdit(row, index) {
      // row.flag = true
      // 不能直接使用添加flag属性，需要使用set方法，vue 才能检测这个属性
      this.$set(row, 'flag', true)
      // console.log(this.$refs)
      // console.log(row)
      // 需要注意，再点击span的时候，切换为input 编辑模式，需要注意，浏览器重绘和重排，是需要时间的
      // 因此，在点击span的时候，重排重绘input需要时间，所以我们不能一点击就立刻获取到input
      // 所以执行完毕后再执行这个focus
      this.$nextTick(() => {
        // 自动聚焦到这个点击的焦点
        this.$refs[index].focus()
      })
    },
    // 气泡确认框，确定删除属性值回调
    deleteAttrValue(index) {
      // 删除数组中的属性值
      // 当前删除属性值的操作，是不需要发送请求，原因，使用保存按钮，统一发送请求
      this.attrInfo.attrValueList.splice(index, 1)
    },
    // 保存按钮 新增或者修改属性和属性值
    async addOrUpdateArrt() {
      // 整理提交参数， 服务器不需要flag
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        // 过滤属性值是否为空
        if (item.valueName !== '') {
          // 删除flag
          delete item.flag
          return true
        }
      })
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        // 跳转到数据展示页面
        this.isShowTable = true
        // 提示消息框
        this.$message({ type: 'success', message: '保存成功' })
        // 保存成功后，需要再次获取平台属性用于展示
        this.getAttrList()
      } catch (error) {
        // console.log('##', error)
      }
    }
  }
}
</script>

<style scoped>
</style>
