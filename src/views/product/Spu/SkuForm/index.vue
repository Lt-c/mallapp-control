<template>
  <el-form ref="form" :model="skuInfo" label-width="80px">
    <el-form-item label="SPU名称">
      {{ spu.spuName }}
    </el-form-item>
    <el-form-item label="SKU名称">
      <el-input v-model="skuInfo.skuName" placeholder="SKU名称" />
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input v-model.number="skuInfo.price" type="number" placeholder="价格(元)" />
    </el-form-item>
    <el-form-item label="重量(千克)">
      <el-input v-model="skuInfo.weight" placeholder="重量(千克)" />
    </el-form-item>
    <el-form-item label="规格描述">
      <el-input v-model="skuInfo.skuDesc" type="textarea" rows="3" />
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form ref="form" :inline="true" label-width="80px">
        <el-form-item v-for="attr in attrInfoList" :key="attr.id" :label="attr.attrName">
          <!-- 把数据放在attr对象的各自的attr上 -->
          <el-select v-model="attr.attrIdAndValueId" placeholder="请选择">
            <el-option v-for="item in attr.attrValueList" :key="item.id" :label="item.valueName" :value="`${attr.id}:${item.id}`" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form ref="form" :inline="true" label-width="80px">
        <el-form-item v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id" :label="saleAttr.saleAttrName">
          <el-select v-model="saleAttr.attrIdAndValueId" placeholder="请选择">
            <el-option v-for="item in saleAttr.spuSaleAttrValueList" :key="item.id" :label="item.saleAttrValueName" :value="`${saleAttr.id}:${item.id}`" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片列表">
      <el-table style="width: 100%" border :data="spuImageList" @selection-change="handleSelectionChange">
        <!-- selection-change 当选择项发生变化时会触发该事件 -->
        <el-table-column type="selection" prop="prop" width="80" align="center" />
        <el-table-column label="图片" width="width">
          <template slot-scope="{row}">
            <img :src="row.imgUrl" style="width:100px;height:100px" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="imgName" label="名称" width="width" />
        <el-table-column label="操作" width="width">
          <template slot-scope="{row, $index}">
            <el-button v-if="!row.isDefault" type="primary" @click="changDefault(row)">设为默认</el-button>
            <el-button v-else>默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveSku">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      skuInfo: {
        // 第一类 从父组件中获取
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类 数据双向绑定获取的
        skuName: '',
        price: 0,
        weight: '',
        skuDesc: '',
        // 第三类 自己收集统计，使用自建的数组之类的
        // 默认图片
        skuDefaultImg: '',
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   attrName: '',
          //   id: 0,
          //   skuId: 0,
          //   valueId: 0,
          //   valueName: ''
          // }
        ],
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: '',
          //   imgUrl: '',
          //   isDefault: '',
          //   skuId: 0,
          //   spuImgId: 0
          // }
        ],
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: 'string',
          //   saleAttrValueId: 0,
          //   saleAttrValueName: 'string',
          //   skuId: 0,
          //   spuId: 0
          // }
        ]

      },
      spu: {},
      // 收集图片的数据字段，判断是否为默认图片等
      imageList: []
    }
  },
  methods: {
    async getData(category1Id, category2Id, spu) {
      console.log(spu)
      // 获取spu图片
      const imgResult = await this.$API.spu.reqSpuImgList(spu.id)
      console.log(imgResult)
      if (imgResult.code === 200) {
        const list = imgResult.data
        list.forEach(item => {
          item.isDefault = 0
        })
        this.spuImageList = list
      }
      // 获取spu销售属性
      const saleResult = await this.$API.spu.reqSpuSaleAttrList(spu.id)
      if (saleResult.code === 200) {
        this.spuSaleAttrList = saleResult.data
      }
      // 获取spu销售属性信息
      const attrResult = await this.$API.spu.reqAttrInfoList(category1Id, category2Id, spu.category3Id)
      if (attrResult.code === 200) {
        this.attrInfoList = attrResult.data
      }
      // 获取到的数据，传递给此元素
      // 从父组件中获取的数据
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.spu = spu
    },
    // table表格复选框的事件
    handleSelectionChange(selection) {
      // selection是已经选择图片的数组，需要注意，这个缺少设为默认的图片，也就是没有默认的isDefault字段
      // console.log(selection)
      this.imageList = selection
    },
    // 修改默认图片
    changDefault(row) {
      // 排他
      this.spuImageList.forEach(item => {
        item.isDefault = 0
      })
      // 选中的图片设为默认
      row.isDefault = 1
      // 收集默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    // 取消按钮的回调
    cancel() {
      this.$emit('changeScreens', 0)
      console.log(111)
      // 清除数据
      Object.assign(this._data, this.$options.data())
    },
    async saveSku() {
      // 整理参数
      const { attrInfoList, skuInfo, spuSaleAttrList, imageList } = this
      // 平台属性 attrId 和 valueId
      // 方式一 直接使用foreach

      // 方式二 使用reduce函数
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(':')
          prev.push({ attrId, valueId })
        }
        return prev
      }, [])

      // 整理销售属性
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(':')
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])

      // 整理图片数据
      skuInfo.skuImageList = imageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      const result = await this.$API.spu.reqSavaSkuInfo(this.skuInfo)
      if (result.code === 200) {
        this.$message({ type: 'success', message: '添加SKU成功' })
        this.$emit('changeScreens', 0)
        // 此处不用再次发送请求，并没哟新增spu，查看sku界面就可以看到新增的sku
      }
    }
  }
}
</script>

<style>

</style>
