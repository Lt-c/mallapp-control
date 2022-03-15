<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      @click="showDialog"
    >添加</el-button>
    <!--
      表格组件
      data:表格组件将来要展示的数据------数据类型
      border:给表格添加边框
      label：设置显示标题
      width:设置宽度
      align：设置标题的对齐方式
      ！！！
        elementUI中的table数据
     -->
    <el-table style="width: 100%; margin-top: 20px" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center" />
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
        align="center"
      />
      <el-table-column
        prop="logoUrl"
        label="品牌LOGO"
        width="width"
        align="center"
      ><template slot-scope="{ row }">
        <img
          :src="row.logoUrl"
          style="max-height: 50px; max-width: 100px"
        >
      </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
          >修改</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--
      分页器
      当前第几页、数据总条数、每一页展示条数
      current-page：当前第几页
      total：总条目数
      page-sizes:单页展示多少条数据
      page-sizes：可以修改单页显示多少数据
      pager-count:页码按钮的数量，当总页数超过该值时会折叠，默认为7
      layout:分页器布局，文本的顺序，决定了内部的顺序 -> 后的数据显示在最右测
      触发事件
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"

    -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :pager-count="7"
      :page-sizes="[10, 20, 50]"
      layout="prev, pager, next, jumper, ->, sizes, total"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    />

    <!--
      对话框
      visible.sync：控制对话框显示和隐藏
    -->
    <!--
      Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可
     -->

    <el-dialog :title="tmFrom.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
      <!-- from表单
      elementUI会吧表单收集到一个对象上，此处收集到tmFrom
      -->
      <el-form ref="ruleFrom" style="width: 80%" :model="tmFrom" :rules="rules">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmFrom.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 这个组件不是from表单，不能使用v-model
          action:设置图片上传的地址
          :on-success ：当图片上传成功的时候，会执行一次
          :before-upload 在上传图片前，执行一次
           -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmFrom.logoUrl" :src="tmFrom.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    // 自定义事件，在此处编写
    var validateTmName = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error('长度在 2 到 10 个字符'))
      } else {
        callback()
      }
    }
    return {
      page: 1,
      limit: 10,
      total: 0,
      list: [],
      // 控制对话框显示与否
      dialogFormVisible: false,
      // 收集品牌信息，对象身上的属性名需要和服务器的要求统一
      tmFrom: {
        tmName: '',
        logoUrl: ''
      },
      // 验证规则
      rules: {
        // 品牌名称的验证规则
        // required 为必要校验字段 message 提示信息 trigger用户行为设置 常用blur、change
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          // { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
          // 自定义校验规则
          { validator: validateTmName, trigger: 'change' }
        ],
        // 品牌logo验证规则
        logoUrl: [{ required: true, message: '请上传品牌图片' }]
      }
    }
  },
  mounted() {
    this.getPageList()
    // console.log(this.list)
  },
  methods: {
    // 获取列表数据方法
    async getPageList(page = 1) {
      this.page = page
      const result = await this.$API.trademark.reqTradeMarkList(this.page, this.limit)
      // console.log(result)
      if (result.code === 200) {
        this.list = result.data.records
        this.total = result.data.total
      }
    },
    // 修改单页展示数量
    handleSizeChange(limit) {
      this.limit = limit
      this.getPageList()
    },
    // 添加按钮，展示dialog
    showDialog() {
      // 显示对话框
      this.dialogFormVisible = true
      // 清空数据
      this.tmFrom = { tmName: '', logoUrl: '' }
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      // 上传成功后，返回的地址
      // file上传成功后，服务器返回前端的数据
      // console.log(file)
      this.tmFrom.logoUrl = res.data
    },
    // 上传图片前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传品牌图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传品牌图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 添加按钮 确定或者修改品牌
    addOrUpdateTradeMark() {
      // 需要全部验证的字段通过，再去书写业务逻辑
      this.$refs.ruleFrom.validate(async(success) => {
        // 如果全部字段符合条件，success返回true
        if (success) {
          this.dialogFormVisible = false
          // 发请求 （添加|修改品牌）
          const result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmFrom)
          console.log(result)
          if (result.code === 200) {
            // 弹出一个信息
            this.$message({ message: this.tmFrom.id ? '品牌修改成功' : '品牌添加成功', type: 'success' })
            // 添加或者修改成功，就需要再次获取品牌列表进行展示
            // 如果是添加品牌，停留在第一页，修改品牌应该是停留在当前页面
            this.getPageList(this.tmFrom.id ? this.page : 1)
          }
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    // 修改品牌
    updateTradeMark(row) {
      // 显示信息框
      this.dialogFormVisible = true
      console.log(row.id, row.logoUrl, row.tmName)
      // this.tmFrom = { id: row.id, tmName: row.tmName, logoUrl: row.logoUrl }
      // 将已有服务器返回品牌的信息，直接赋值给了tmFrom
      // 使用浅拷贝
      this.tmFrom = { ...row }
      // console.log(this.list[row.id])
    },
    // 删除品牌
    deleteTradeMark(row) {
      // console.log(this.$confirm)
      this.$confirm(`你确定删除${row.tmName}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 用户点击删除，就会向服务器发起请求删除品牌
        const result = await this.$API.trademark.reqDeleteTradeMark(row.id)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 再次获取品牌列表
          this.getPageList(this.list.length > 1 ? this.page : this.page - 1)
        }
      }).catch(() => {
        // 用户取消删除
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      // this.$API.trademark.reqDeleteTradeMark(id)
      // this.getPageList()
    }

  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
