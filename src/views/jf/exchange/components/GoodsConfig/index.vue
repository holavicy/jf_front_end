<template>
    <div class="a-detail">
        <div class="search-wrapper">
            <div class="search-item">
                <label>商品名称：</label><el-input placeholder="请输入商品名称" v-model="goodsName" size="mini"></el-input>
            </div>
  
            <div class="search-item">
                <label>商品状态：</label><el-select v-model="goodsStatus" placeholder="请选择" size="mini">
                    <el-option v-for="item in goodsStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <el-row class="button-wrapper">
                <el-button type="primary" plain size="mini" @click="getList(1)">查询</el-button>
                <el-upload action="default" :before-upload="beforeUploadGoods" :http-request="importFileGoods" :show-file-list="false" style="margin: 0 10px">
                    <el-button type="primary" plain size="mini">导入</el-button>
                </el-upload>
            </el-row>
        </div>

        <div class="table-wrapper">
            <el-table :data="data" size="mini" stripe height="400" style="margin-top: 20px" v-loading="loading">
                <el-table-column type="index" width="55"></el-table-column>
                <el-table-column prop="GoodsCode" label="商品编码" width="80"></el-table-column>
                <el-table-column prop="JobId" label="商品图片" width="70">
                    <template slot-scope="scope">

                        <el-upload class="avatar-uploader" :before-upload="beforeUpload" :http-request="importFile" :show-file-list="false" action="default" @click.native="setID(scope.row)">
                            <img v-if="scope.row.PictureUrl" :src="scope.row.PictureUrl" class="avatar" style="width:60px; height:60px">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        
                    </template>
                </el-table-column>
                <el-table-column prop="Name" label="商品名称"></el-table-column>
                <el-table-column prop="PointCost" label="所需积分" width="120"></el-table-column>
                <el-table-column prop="goodsStatus" label="商品状态" width="120"></el-table-column>
                <el-table-column prop="stock" label="商品库存" width="120"></el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" slot="reference" @click="changeGoodsStatus(scope.row)">{{scope.row.Status == 0?'下架':'上架'}}</el-button>
                        <el-button type="text" size="mini" slot="reference" @click="getStockDetail(scope.row)">库存明细</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[5, 10, 20, 50, 100]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" style="margin-top:10px"></el-pagination>
        </div>

        <el-dialog title="库存明细" :visible.sync="stockDetailShow">
            <el-button type="primary" @click="showInnerVisible()" size="mini">修改库存</el-button>
            <el-table :data="stockList" size="mini" height="250">
                <!-- <el-table-column property="ChangeType" label="出库/入库" width="150"></el-table-column> -->
                <el-table-column label="出库/入库" width="100"
                :filters="[{ text: '出库', value: 2 }, { text: '入库', value: 1 }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                    <template slot-scope="scope">

                        {{scope.row.ChangeType == 1?'入库': scope.row.ChangeType == 2?'出库':''}}
                        
                    </template>
                </el-table-column>
                <el-table-column property="ChangeAmount" label="数量" width="100"></el-table-column>
                <el-table-column property="CreationDate" label="日期"></el-table-column>
                <el-table-column property="ChangeDesc" label="库存变化说明"></el-table-column>
            </el-table>
            <el-dialog width="30%" title="修改库存" :visible.sync="innerVisible" append-to-body>
                <div class="filter-item margin-bottom-10">
                    <span>变化类型： </span>
                    <el-select size="mini" v-model="newStockItem.stockChangeType" placeholder="请选择">
                        <el-option v-for="item in changeTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div class="filter-item margin-bottom-10"><span>变化数量：</span> <el-input size="mini" placeholder="请输入内容" v-model="newStockItem.stockChangeNum" style="width: 100px"></el-input></div>
                <div class="filter-item margin-bottom-10"><span>变化说明：</span> <el-input size="mini" placeholder="请输入内容" v-model="newStockItem.stockChangeDesc" style="width: 140px"></el-input></div>
                <el-button size="mini" type="primary" @click="submitStockChange()">确定</el-button>
            </el-dialog>
        </el-dialog>
    </div>
</template>


<script>
import axios from 'axios'
import js from './mixins/index'
import util from '@/libs/util.js'
import { goodsStatusDic } from '@/dataDic.js' 
export default {
    name: 'a-detail',
    mixins: [
        js
    ],
    data () {
        return {
            changeGoodsCode: '',
            goodsStatusDic,
            goodsName: '',
            goodsStatus: '',
            file: null,
            goodsFile: null,
            operator: util.cookies.get('uuid'),
            stockDetailShow: false,
            innerVisible: false,
            changeTypeOptions: [{
                label: '入库',
                value: 1
            }, {
                label: '出库',
                value: 2
            }],
            newStockItem: {}
        }
    },
    mounted () {
        this.getList()
    },
  methods: {
      /**
       * 获取列表数据
       */
      getList (page) {
          if(page){
            this.pagination.currentPage = page
          }
          let data = {
              Name: this.goodsName,
              Status: this.goodsStatus,
              page: this.pagination.currentPage,
              pageSize: this.pagination.pageSize,
          }
          this.loading = true;
          this.$api.GET_GOODS_LIST(data).then(res => {
              this.loading = false
              res.data.detail.map((item) => {
                  item.goodsStatus = goodsStatusDic[item.Status]
                  item.stock = item.TotalIn - item.TotalOut - item.TotalLock
                  item.PictureUrl = 'http://'+this.HOST+item.PictureUrl
              })
              this.data = res.data.detail
              this.pagination.total = res.data.total
          }).catch(err => {
              console.log('err', err);
              this.loading = false
          })
      },

      /**
       * 分页
       */
      paginationCurrentChange (currentPage) {
        this.pagination.currentPage = currentPage
        this.getList()
      },

      beforeUpload (file) {
        this.file = file;
      },

      beforeUploadGoods (file) {
        this.goodsFile = file;
      },

      setID(data){
          this.changeGoodsCode = data.GoodsCode
      },

        /**
        * 导出
        */
      exportFile () {
        let data = {
            goodsName: this.goodsName,
            isBonus: this.addOrMin,
            isAccounted: this.isEnd,
            beginDate: this.checkDate? dayjs(this.checkDate[0]).format('YYYY-M-D HH:mm:ss') :'',
            endDate: this.checkDate? dayjs(this.checkDate[1]).endOf('month').format('YYYY-M-D HH:mm:ss') :'',
            rewardPointsType: 'A分',
            Operator: this.operator
        }
        this.$api.EXPORT_DETAIL_LIST(data).then(res => {
            if (res.code === 0) {
                window.location.href = res.data
            } else {
                this.$message.error(res.msg || '导出失败，请联系管理员')
            }
            
        }).catch(err => {
            console.log('err', err)
        })
    },

      importFile () {
        const _this = this;
        _this.source = axios.CancelToken.source();
        let fileData = new FormData();
        fileData.append('file', _this.file)
        fileData.append('Operator', String(this.operator))
        fileData.append('GoodsCode', this.changeGoodsCode)
        let url = '/upload_goodsImage';
        this.uploadFile(url, fileData, _this.source.token, (res) => {
            let loaded = res.loaded
            let total = res.total
            _this.$nextTick(() => {
                _this.uploadPercent = Math.floor(loaded/total*100)>1? Math.floor(loaded/total*100):1;
                })
                }).then((res) => {
                    if (res.data.code === 0) {
                        _this.uploadPercent = 0;
                        _this.getList();
                       
                    } else {
                        console.log(res)
                        _this.$message.error(res.msg || '操作失败，请联系管理员')
                    }
                }, (rej) => {
                    if (rej === -2) {
                        _this.$message.info('取消上传成功')
                    }
                })
            },

      importFileGoods () {
        const _this = this;
        _this.source = axios.CancelToken.source();
        let fileData = new FormData();
        fileData.append('file', _this.goodsFile)
        fileData.append('Operator', String(this.operator))

        let url = '/import_goods';
        this.uploadFile(url, fileData, _this.source.token, (res) => {
            let loaded = res.loaded
            let total = res.total
            _this.$nextTick(() => {
                _this.uploadPercent = Math.floor(loaded/total*100)>1? Math.floor(loaded/total*100):1;
                })
                }).then((res) => {
                    if (res.data.code === 0) {
                        _this.uploadPercent = 0;
                        _this.$message.success('导入成功')
                        _this.getList();
                       
                    } else {
                        console.log(res)
                        _this.$message.error(res.msg || '操作失败，请联系管理员')
                    }
                }, (rej) => {
                    if (rej === -2) {
                        _this.$message.info('取消上传成功')
                    }
                })
            },

      // 商品上下架
      changeGoodsStatus(row){
            console.log(row)
            let data = {
                GoodsCode: String(row.GoodsCode),
                Status: row.Status == 0?1:0
            }
            this.$api.CHANGE_GOODS_STATUS(data).then((res) => {
                console.log(res)

                if(res.code == 0){
                    this.getList()
                }
            })
      },

      // 查看库存明细
      getStockDetail (row) {
          console.log(row)
          const data = {
              goodsId: row.GoodsID
          }
          this.stockChangeGoodsId = row.GoodsID
          this.stockChangeUnit = row.MeasureUnit
           this.$api.GET_GOODS_STOCK_DETAIL(data).then(res => {
               console.log(res)
               this.stockDetailShow = true
               this.stockList = res.data
           })
      },

      //表格出入库筛选
      filterTag(value, row) {
        return row.ChangeType === value;
      },

      // 修改库存
      showInnerVisible () {
          this.innerVisible = true
          this.newStockItem = {
              GoodsID: this.stockChangeGoodsId,
              MeasureUnit: this.stockChangeUnit,
              stockChangeType: 1,
              stockChangeNum: 0,
              stockChangeDesc: '',
              CreatedBy: this.operator
          }
      },

      // 提交修改库存
      submitStockChange () {
          console.log(this.newStockItem)
          this.$api.CHANGE_GOODS_STOCK_DETAIL(this.newStockItem).then(res => {
              console.log(res)
              if(res.code == 0) {
                  this.$message.success('修改库存成功')
                  this.stockDetailShow = false
                  this.innerVisible = false
                  this.getList()
              } else {
                 this.$message.error(res.msg || '修改失败') 
              }
          })
      }

  }
}

</script>

<style scoped lang="scss">
.a-detail {
    .search-wrapper{
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .search-item{
            display: flex;
            align-items: center;
            margin-right: 10px;

            label{
                flex-shrink: 0;
                font-size: 14px;
                color: #101010;
            }
        }
    }

    .button-wrapper{
        display: flex;
        align-items: center;
    }
}
</style>
