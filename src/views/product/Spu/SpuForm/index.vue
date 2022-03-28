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
      <el-select v-model="attrId" :placeholder="`还有${unSelectSaleAttr.length}个未选择的属性`">
        <el-option v-for="item in unSelectSaleAttr" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button type="primary" icon="el-icon-plus" :disabled="!attrId">添加销售属性</el-button>
      <!-- 展示的是当前spu属于自己的销售属性 -->
      <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
        <el-table-column type="index" label="序号" width="80px" align="center" />
        <el-table-column prop="saleAttrName" label="属性名" width="width: 10%" />
        <el-table-column prop="prop" label="属性值名称列表" width="width: 60%">
          <template slot-scope="{row}">
            <el-tag v-for="tag in row.spuSaleAttrValueList" :key="tag.id" closable :disable-transitions="false" @close="handleClose(tag)">
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.inputVisible"
              ref="saveTagInput"
              v-model="row.inputValue"
              class="input-new-tag"
              size="mini"
            />
            <!-- @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm" -->
            <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>

          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width: 20%">
          <template slot-scope="{row}">
            <el-button type="danger" icon="el-icon-delete" size="mini" />
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="$emit('changeScreen', 0)">取消</el-button>
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
        tmId: 0,
        // spu图片列表
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: 'string',
          //   imgUrl: 'string',
          //   spuId: 0
          // }
        ],
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
      attrId: '' // 销售属性的id  发送请求前，把数据整理好即可
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
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleUploadSuccess(response, file, fileList) {
      const imgInfo = {
        spuId: this.spu.id,
        imgUrl: response.data,
        imgName: file.name,
        url: response.data,
        name: file.name
      }
      this.spuImgList.push(imgInfo)
    },
    // 初始化SpuForm数据
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
          console.log(element)
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
