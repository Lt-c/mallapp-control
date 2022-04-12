<template>
  <el-row :gutter="30">
    <el-col :span="12">
      <Search />

    </el-col>
    <el-col :span="12">
      <Categoty />
    </el-col>

  </el-row>
</template>

<script>
import Search from './Search'
import Categoty from './Category'
export default {
  name: 'Observe',
  components: {
    Search, Categoty
  }

}
</script>

<style scoped>

</style>
