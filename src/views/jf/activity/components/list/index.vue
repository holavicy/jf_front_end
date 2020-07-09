<template>
    <div class="a-detail">
        <div class="search-wrapper">
            <div class="search-item">
                <label>活动名称：</label><el-input placeholder="请输入活动名称" v-model="title" size="mini"></el-input>
            </div>

            <el-row class="button-wrapper">
                <el-button type="primary" plain size="mini" @click="getList">查询</el-button>
                <el-button type="primary" size="mini" @click="addActivity">新增</el-button>
            </el-row>
        </div>

        <div class="table-wrapper">
            <el-table :data="data" size="mini" stripe height="400" style="margin-top: 20px" v-loading="loading">
                <el-table-column type="index" width="55"></el-table-column>
                <el-table-column prop="Title" label="活动名称"></el-table-column>
                <el-table-column prop="BeginDate" label="活动开始时间"></el-table-column>
                <el-table-column prop="EndDate" label="活动结束时间"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" slot="reference" @click="editActivity(scope.row)">编辑</el-button>
                        <el-popconfirm title="确定删除此条活动吗？" @onConfirm="deleteActivity(scope.row)">
                            <el-button type="text" size="mini" slot="reference">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[5, 10, 20, 50, 100]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" style="margin-top:10px"></el-pagination>
        </div>
    </div>
</template>


<script>
import js from './mixins/index'
import dayjs from 'dayjs'
export default {
    name: 'activity-list',
    mixins: [
        js
    ],
    data () {
        return {
            dayjs,
            title: ''
        }
    },
    mounted () {
        this.getList()
    },
  methods: {
      /**
       * 获取列表数据
       */
      getList () {
          let data = {
              title: this.title,
              page: this.pagination.currentPage,
              pageSize: this.pagination.pageSize,
          }
          this.loading = true;
          this.$api.GET_ACTIVITY_LIST(data).then(res => {
              this.loading = false
            res.data.detail.map((item) => {
                  item.BeginDate = dayjs(item.BeginDateTime).format('YYYY-M-D')
                  item.EndDate = dayjs(item.EndDateTime).format('YYYY-M-D')
              })
              this.data = res.data.detail
              this.pagination.total = res.data.totalLength
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

      /**
       * 编辑活动
       */
      editActivity (row) {
          this.$emit('editActivity',row.ActivitiesID)
      },

      /**
       * 新增活动
       */
      addActivity () {
          this.$emit('addActivity')
      },

          /**
         * 删除
         */
        deleteActivity (val) {
            console.log(val);
            let data = {
                ActivitiesID: val.ActivitiesID
            }

            this.$api.DELETE_ACTIVITY_RECORD(data).then(res => {
                if (res.code === 0) {
                    this.$message.success('删除成功')
                    this.getList()
                } else {
                    this.$message.error(res.msg || '删除失败')
                }
            }).catch(err => {
                console.log(err)
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
