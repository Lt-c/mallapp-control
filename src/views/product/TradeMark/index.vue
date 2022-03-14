<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" @click="showDialog">添加</el-button>
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
    <el-table style="width: 100%; margin-top:20px" border :data="list">
      <el-table-column
        type="index"
        label="序号"
        width="80px"
        align="center"
      />
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
        <img :src="row.logoUrl" alt="" style="max-height: 50px;max-width:100px">
      </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark"
          >修改</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
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
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <!-- from表单
      elementUI会吧表单收集到一个对象上，此处收集到tmFrom
      -->
      <el-form style="width :80%" :model="tmFrom">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input v-model="tmFrom.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
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
    return {
      page: 1,
      limit: 5,
      total: 0,
      list: [],
      // 控制对话框显示与否
      dialogFormVisible: false,
      // 收集品牌信息，对象身上的属性名需要和服务器的要求统一
      tmFrom: {
        tmName: '',
        logoUrl: ''
      }
    }
  },
  mounted() {
    this.getPageList()
    // console.log(this.list)
  },
  methods: {
    // 修改单页展示数量
    handleSizeChange(limit) {
      this.limit = limit
      this.getPageList()
    },
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
    // 添加按钮，展示dialog
    showDialog() {
      // 显示对话框
      this.dialogFormVisible = true
      // 清空数据
      this.tmFrom = { tmName: '', logoUrl: '' }
    },
    // 修改某品牌
    updateTradeMark() {
      this.dialogFormVisible = true
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      // 上传成功后，返回的地址
      // file上传成功后，服务器返回前端的数据
      this.tmFrom.logoUrl = URL.createObjectURL(file.raw)
    },
    // 上传图片前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 添加按钮 确定或者修改品牌
    async addOrUpdateTradeMark() {
      this.dialogFormVisible = false
      // 发请求 （添加|修改品牌）
      const result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmFrom)
      if (result.code === 200) {
        // 弹出一个信息
        this.$message(this.tmFrom.id ? '品牌修改成功' : '品牌添加成功')
        // 添加或者修改成功，就需要再次获取品牌列表进行展示
        this.getPageList()
      }
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
    border-color: #409EFF;
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
