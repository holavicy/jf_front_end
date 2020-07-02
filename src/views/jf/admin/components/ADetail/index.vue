<template>
    <div class="a-detail">
        <div class="search-wrapper">
            <div class="search-item">
                <label>工号：</label><el-input placeholder="请输入工号" v-model="staffNo" size="mini"></el-input>
            </div>
            <!-- <div class="search-item">
                一级部门：<el-input placeholder="请选择部门" v-model="depFirst"></el-input>
            </div>
            <div class="search-item">
                二级部门：<el-input placeholder="请选择部门" v-model="depSecond"></el-input>
            </div>
            <div class="search-item">
                三级部门：<el-input placeholder="请选择部门" v-model="depThird"></el-input>
            </div> -->
            <div class="search-item">
                <label>姓名：</label><el-input placeholder="请输入姓名" v-model="name" size="mini"></el-input>
            </div>
            <div class="search-item">
                <label>加减分：</label><el-select v-model="addOrMin" placeholder="请选择" size="mini">
                    <el-option v-for="item in addOrMinOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="search-item">
                <label>是否结算：</label><el-select v-model="isEnd" placeholder="请选择" size="mini">
                    <el-option v-for="item in isEndOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>

            <div class="search-item">
                <label>考核日期：</label>
                 <el-date-picker v-model="checkDate" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" size="mini"></el-date-picker>
            </div>
        </div>

        <el-row class="button-wrapper">
            <el-button type="primary" plain size="mini" @click="getList">查询</el-button>
            <el-upload action="default" :before-upload="beforeUpload" :http-request="importFile" :show-file-list="false" style="margin: 0 10px">
                <el-button type="primary" plain size="mini">导入</el-button>
            </el-upload>

            <el-button type="primary" size="mini">导出</el-button>
            <el-button type="primary" plain size="mini">结算</el-button>
        </el-row>
        <div class="table-wrapper">
            <d2-crud :columns="columns" :data="data" :loading="loading" :pagination="pagination" @pagination-current-change="paginationCurrentChange"/>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
export default {
    name: 'a-detail',
    data () {
        return {
            staffNo: '',
            name: '',
            file: null,
            operator: {
                Operator: '100297'
            },
            addOrMin: '',
            isEnd: '',
            checkDate: null,
            addOrMinOptions: [{
                value: '',
                label: '全部'
            }, {
                value: '1',
                label: '加分'
            }, {
                value: '2',
                label: '减分'
            }],
            isEndOptions: [{
                value: '',
                label: '全部'
            }, {
                value: '1',
                label: '是'
            }, {
                value: '0',
                label: '否'
            }],
    columns: [
        {
          title: '卡密',
          key: 'key',
          width: 320
        },
        {
          title: '面值',
          key: 'value'
        },
        {
          title: '管理员',
          key: 'admin'
        },
        {
          title: '创建时间',
          key: 'dateTimeCreat'
        },
        {
          title: '使用时间',
          key: 'dateTimeUse'
        }
      ],
      data: [],
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      }
        }
    },

    mounted () {
        this.fetchData()
  },
  methods: {

      getList () {
          console.log('查询开始')
      },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      this.$api.DEMO_BUSINESS_TABLE_1_LIST({
        ...this.pagination
      }).then(res => {
        this.data = res.list
        this.pagination.total = res.page.total
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    },

    beforeUpload (file) {
        this.file = file;
    },

    importFile () {
        const _this = this;
        _this.source = axios.CancelToken.source();
        let fileData = new FormData();
        //   fileData.append('file', _this.$refs.file.files[0])
        // fileData.append('file', _this.file)
        fileData.append('Operator', '100297')
        // let url = '/api/import_rewardPoint';
        let url = '/api/test';
        this.uploadFile(url, fileData, _this.source.token, (res) => {
            let loaded = res.loaded
            let total = res.total
            _this.$nextTick(() => {
                _this.uploadPercent = Math.floor(loaded/total*100)>1? Math.floor(loaded/total*100):1;
                })
                }).then((res) => {
                    if (res.data.code === 0) {
                        alert('上传成功');
                        _this.uploadPercent = 0;
                    }
                }, (rej) => {
                    if (rej === -2) {
                        alert('取消上传成功')
                    } else {
                        alert('上传失败')
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
        justify-content: space-between;
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
