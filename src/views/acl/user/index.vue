<template>
  <div class="app-container">
    <!-- 查询和清空 -->
    <el-form ref="form" inline :model="form" label-width="80px">
      <el-form-item>
        <el-input v-model="tempSearchObj.username" placeholder="用户名" />
      </el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="clearUserName">清空</el-button>
    </el-form>
    <!-- 添加和批量删除 -->
    <div>
      <el-button type="primary" @click="addUser">添加</el-button>
      <el-button type="danger" @click="search">批量删除</el-button>
    </div>
    <!-- table -->
    <el-table :data="userInfoList" style="width: 100%;margin-top:20px" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="username" label="用户名" width="width" />
      <el-table-column prop="nickName" label="用户昵称" width="width" />
      <el-table-column prop="roleName" label="权限列表" width="width" />
      <el-table-column prop="gmtCreate" label="创建时间" width="width" />
      <el-table-column prop="gmtModified" label="更新时间" width="width" />
      <el-table-column label="操作" width="width">
        <template slot-scope="{row}">
          <HintButton type="info" size="mini" icon="el-icon-user" title="分配角色" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      align="center"
      :current-page="page"
      :page-sizes="[10, 20, 50]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="total"
    >1
      <!-- @size-change="handleSizeChange"
      @current-change="handleCurrentChange" -->
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      form: {
        user: ''
      },
      tempSearchObj: { // 搜集相关信息
        username: ''
      },
      userInfoList: [],
      total: 0, // userlist总条数
      page: 1, // 默认页码
      limit: 5// 单页显示展示数量

    }
  },
  methods: {
    // 获取列表信息
    async getUserList(page = 1) {
      this.page = page
      const { limit } = this
      const result = await this.$API.user.reqUserList(page, limit)
      console.log(result)
      if (result.code === 20000) {
        this.total = result.data.total
        this.userInfoList = result.data.items
      }
    },
    // 查询
    search() {
      console.log('查询')
      this.getUserList()
    },
    // 清空input；
    clearUserName() {
      this.tempSearchObj.username = ''
    },
    // 添加按钮
    addUser() {
      console.log('添加')
    }
  }

}
</script>

<style>
.app-container {
  margin-left: 24px;
}

</style>
