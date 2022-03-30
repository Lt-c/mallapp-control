<template>
  <el-form ref="form" :model="spu" label-width="80px">
    <el-form-item label="SPU名称">
      <el-input v-model="spu.spuName" placeholder="SPU名称" />
    </el-form-item>
    <el-form-item label="品牌">
      <el-select v-model="spu.tmId" placeholder="请选择品牌">
        <el-option v-for="tm in tmList" :key="tm.id" :label="tm.tmName" :value="tm.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input v-model="spu.description" rows="4" type="textarea" placeholder="SPU描述" />
    </el-form-item>
    <el-form-item label="SPU图片">
      <!-- 使用element中的额照片墙
      action提交给谁上传的地址
      list-type 文件列表类型
      file-list 上传文件列表 需要有name 和 url 属性
      :on-preview 照片的预览功能  不需要收集数据
      on-remove 删除照片
      -->
      <el-upload
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :file-list="spuImgList"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleUploadSuccess"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select v-model="attrIdAndAttrName" :placeholder="`还有${unSelectSaleAttr.length}个未选择的属性`">
        <el-option v-for="item in unSelectSaleAttr" :key="item.id" :label="item.name" :value="`${item.id}:${item.name}`" />
      </el-select>
      <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
      <!-- 展示的是当前spu属于自己的销售属性 -->
      <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
        <el-table-column type="index" label="序号" width="80px" align="center" />
        <el-table-column prop="saleAttrName" label="属性名" width="width: 10%" />
        <el-table-column prop="prop" label="属性值名称列表" width="width: 60%">
          <template slot-scope="{row}">
            <!-- el-tag 用于展示已有属性值数据   close回调，删除tag数据-->
            <el-tag v-for="tag,index in row.spuSaleAttrValueList" :key="tag.id" closable :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index,1)">
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.inputVisible"
              ref="saveTagInput"
              v-model="row.inputValue"
              class="input-new-tag"
              size="mini"
              @blur="handleInputConfirm(row)"
              @keyup.enter.native="handleInputConfirm(row)"
            />
            <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width: 20%">
          <template slot-scope="{row,$index}">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)" />
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addOrUpdateSku">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      // 照片墙相关
      dialogImageUrl: '',
      // dialog 控制显示大图
      dialogVisible: false,
      // 存储spu属性
      // 存储spu信息属性,在修改spu时，可以利用服务器返回的这个对象数据，再次提交给服务器
      // 但是，在添加spu时，并没有向服务器发请求，添加时，又需要提供数据，
      spu: {
        category3Id: 0,
        // spu描述
        description: '',
        // spu名称
        spuName: '',
        // 品牌id
        tmId: '',
        // spu图片列表
        spuImageList: [],
        // {
        //   id: 0,
        //   imgName: 'string',
        //   imgUrl: 'string',
        //   spuId: 0
        // }
        // spu售卖属性与属性值
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: 'string',
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: 'string',
          //       saleAttrName: 'string',
          //       saleAttrValueName: 'string',
          //       spuId: 0
          //     }
          //   ]
          // }
        ]
      },
      tmList: [], // 存储品牌信息
      spuImgList: [], // 存储spu图片属性
      saleAttrList: [], // 存储销售属性
      attrIdAndAttrName: '' // 销售属性的id  发送请求前，把数据整理好即可
      // inputVisible: true // 控制切换
    }
  },
  computed: {
    // 计算还未选择的销售属性
    unSelectSaleAttr() {
      // 整个平台的销售书型盒一共三个，颜色尺寸，版本 ---> saleAttrList
      // 当前spu拥有的属于自己的销售属性SPU,spuSaleAttrList  --->  颜色
      return this.saleAttrList.filter(item1 => {
        return this.spu.spuSaleAttrList.every(item2 => {
          return item1.name !== item2.saleAttrName
        })
      })
    }
  },
  methods: {
    // 照片墙相关的 两个methods
    // 照片墙删除某一个照片会触发
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      // 收集照片墙的数据，fileList是删除某一张图之后的数据，含有 name url，是因为照片墙需要
      // 对于服务器,不需要这个数据,在上传时,需要进行处理
      this.spuImgList = fileList
    },
    handlePictureCardPreview(file) {
      // console.log(file)
      this.dialogImageUrl = file.url
      // 显示对话框，显示图片
      this.dialogVisible = true
    },
    // 收集图片信息
    handleUploadSuccess(response, file, fileList) {
      // const imgInfo = {
      //   spuId: this.spu.id,
      //   imgUrl: response.data,
      //   imgName: file.name,
      //   url: response.data,
      //   name: file.name
      // }

      // console.log(fileList,response,file);
      this.spuImgList = fileList
    },
    // 初始化SpuForm数据 修改的按钮
    async initSpuData(spu) {
      console.log('发数据', spu)
      // 获取spu信息的数据
      const spuResult = await this.$API.spu.reqSpuInfo(spu.id)
      if (spuResult.code === 200) {
        this.spu = spuResult.data
      }
      // 获取品牌的信息
      const tmResult = await this.$API.spu.reqTradeMarkList()
      if (tmResult.code === 200) {
        this.tmList = tmResult.data
      }
      // 获取spu图片
      const imgResult = await this.$API.spu.reqSpuImageList(spu.id)
      if (imgResult.code === 200) {
        // 照片墙显示照片列表是数组，先进行简单的处理，需要name 和 url 两个字段
        const imgList = imgResult.data
        imgList.forEach(element => {
          // console.log(element)
          element.name = element.imgName
          element.url = element.imgUrl
        })
        this.spuImgList = imgList
      }
      // 获取平台全部的销售属性
      const saleResult = await this.$API.spu.reqBaseSaleAttrList()
      if (saleResult.code === 200) {
        this.saleAttrList = saleResult.data
      }
    },
    // 添加需要收集的销售属性
    addSaleAttr() {
      // 把收集到的属性数据进行 处理
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(':')
      // 向spu对象中的spuSaleAttrList添加新的销售属性
      this.spu.spuSaleAttrList.push({ baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] })
      // 清空input框中的数据
      this.attrIdAndAttrName = ''
    },
    // 添加销售属性值的回调
    addSaleAttrValue(row) {
      // 点击销售属性当中的添加按钮，button变为input，给当前的属性添加一个inputVisible控制显示 ，使用this.$set使vue能够检测这个数据
      this.$set(row, 'inputVisible', true)
      // input框的中数据，需要进行收集,用 inputValue 字段收集新增的销售属性值
      this.$set(row, 'inputValue', '')
      // 自动获取焦点
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // el-input 也就是输入完成的回调
    handleInputConfirm(row) {
      // 以上数据并不会显示出来，结构出row中的inputValue
      const { baseSaleAttrId, inputValue } = row
      // 新增的销售属性值不能为空
      if (inputValue.trim() === '') {
        this.$message('属性值不能为空')
        return
      }
      // 属性值不能重复
      if (!row.spuSaleAttrValueList.every(item => item.saleAttrValueName !== inputValue.trim())) {
        this.$message('属性值不能重复')
        return
      }
      // 新增的销售属性值
      const newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue }
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      // 不显示input框，显示button
      row.inputVisible = false
    },
    // 点击保存的回调，向服务器发起请求
    async addOrUpdateSku() {
      // 整理图片
      this.spu.spuImageList = this.spuImgList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl || item.response.data
        }
      })
      // 发请求
      const result = await this.$API.spu.reqAddOrUpdateSku(this.spu)
      console.log(result)
      if (result.code === 200) {
        this.$message({ type: 'success', message: 'SPU修改成功' })
        // 跳转到spulist页面
        this.$emit('changeScreen', { screen: 0, flag: '' })
      }
    },
    // 点击添加sku按钮的回调，请求数据，需要收集两个数据
    async addSpuData(category3Id) {
      // 收集三级分类id
      this.spu.category3Id = category3Id
      // 获取品牌的信息
      const tmResult = await this.$API.spu.reqTradeMarkList()
      if (tmResult.code === 200) {
        this.tmList = tmResult.data
      }
      // 获取平台全部的销售属性
      const saleResult = await this.$API.spu.reqBaseSaleAttrList()
      if (saleResult.code === 200) {
        this.saleAttrList = saleResult.data
      }
    },
    // 取消按钮，不保存，不修改
    cancel() {
      this.$emit('changeScreen', { screen: 0, flag: '' })
      // 清理数据
      // Object.assign合并对象
      // console.log(this._data) // 是目前的响应式数据
      // console.log(this.$options.data())
      Object.assign(this._data, this.$options.data())
      // this.$options可以获取配置对象，这个data()就是原始的对象
    }

  }
}
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
