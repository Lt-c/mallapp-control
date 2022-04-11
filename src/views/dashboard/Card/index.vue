<template>
  <div>

    <el-row :gutter="10">
      <el-col :span="6"><el-card>
        <Detail title="总销售额" count="¥ 125800">
          <template slot="charts">
            <span>
              周同比 &nbsp;&nbsp;7.5%&nbsp;&nbsp;<svg t="1649608829741" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8334" width="16" height="16"><path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3c-3.8 5.3-0.1 12.7 6.5 12.7h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" p-id="8335" fill="#d81e06" /></svg>
            </span>
            <span>
              日同比 &nbsp;&nbsp;7.5%&nbsp;&nbsp;<svg t="1649608993301" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8628" width="16" height="16"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3 0.1-12.7-6.4-12.7z" p-id="8629" fill="#1afa29" /></svg>
            </span>
          </template>
          <template slot="footer">
            <span>日销售额¥ 12580 </span>
          </template>
        </Detail>
      </el-card></el-col>
      <el-col :span="6"><el-card>
        <Detail title="访问量" count="1233412">
          <template slot="charts">
            <LineCharts />
          </template>
          <template slot="footer">
            <span>日访问量 12580 </span>
          </template>
        </Detail>
      </el-card></el-col>
      <el-col :span="6"><el-card>
        <Detail title="成交订单量" count="12313">
          <template slot="charts">
            <barCharts />
          </template>
          <template slot="footer">
            <span>日销售额¥ 12580 </span>
          </template>
        </Detail>
      </el-card></el-col>
      <el-col :span="6"><el-card> <Detail title="运营活动效果" count="70%">
        <template slot="charts">
          <span>
            周同比 &nbsp;&nbsp;7.5%&nbsp;&nbsp;<svg t="1649608829741" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8334" width="16" height="16"><path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3c-3.8 5.3-0.1 12.7 6.5 12.7h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" p-id="8335" fill="#d81e06" /></svg>
          </span>
          <span>
            日同比 &nbsp;&nbsp;7.5%&nbsp;&nbsp;<svg t="1649608993301" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8628" width="16" height="16"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3 0.1-12.7-6.4-12.7z" p-id="8629" fill="#1afa29" /></svg>
          </span>
        </template>
        <template slot="footer">
          <span>
            周同比 &nbsp;&nbsp;7.5%&nbsp;&nbsp;<svg t="1649608829741" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8334" width="16" height="16"><path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3c-3.8 5.3-0.1 12.7 6.5 12.7h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" p-id="8335" fill="#d81e06" /></svg>
          </span>
          <span>
            日同比 &nbsp;&nbsp;7.5%&nbsp;&nbsp;<svg t="1649608993301" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8628" width="16" height="16"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3 0.1-12.7-6.4-12.7z" p-id="8629" fill="#1afa29" /></svg>
          </span>
        </template>
      </Detail>
      </el-card></el-col>

    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import LineCharts from './LineCharts'
import BarCharts from './BarCharts'
export default {
  name: 'Card',
  components: { Detail, LineCharts, BarCharts }
}
</script>

<style>

</style>
