<template>
    <div class="a-detail">
        <div class="search-wrapper">
            <div class="search-item">
                <label>工号：</label><el-input placeholder="请输入工号" v-model="staffNo" size="mini"></el-input>
            </div>
            <div class="search-item">
                <label>姓名：</label><el-input placeholder="请输入姓名" v-model="name" size="mini"></el-input>
            </div>
            <div class="search-item">
                <label>加减分：</label><el-select v-model="addOrMin" placeholder="请选择" size="mini">
                    <el-option v-for="item in addOrMinOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="search-item">
                <label>考核日期：</label>
                 <el-date-picker v-model="checkDate" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" size="mini"></el-date-picker>
            </div>
        </div>

        <el-row class="button-wrapper">
            <el-button type="primary" plain size="mini" @click="getList(1)">查询</el-button>
            <el-upload action="default" :before-upload="beforeUpload" :http-request="importFile" :show-file-list="false" style="margin: 0 10px">
                <el-button type="primary" plain size="mini">导入</el-button>
            </el-upload>

            <el-button type="primary" size="mini" @click="exportFile" v-loading.fullscreen.lock="fullscreenLoading">导出</el-button>
            <el-button type="primary" plain size="mini" @click="editDetails()">批量编辑</el-button>
        </el-row>
        <div class="table-wrapper">
            <el-table :data="data" stripe height="400" style="margin-top: 20px" v-loading="loading" size="mini"
                        @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="JobId" label="工号" width="70"></el-table-column>
                <el-table-column prop="Name" label="姓名" width="100"></el-table-column>
                <el-table-column prop="DepartmentLv1" label="一级部门" width="180"></el-table-column>
                <el-table-column prop="DepartmentLv2" label="二级部门"></el-table-column>
                <el-table-column prop="DepartmentLv3" label="三级部门"></el-table-column>
                <el-table-column prop="Post" label="职务名称"></el-table-column>
                <el-table-column prop="BonusPoints" label="加分" width="80"></el-table-column>
                <el-table-column prop="MinusPoints" label="减分" width="80"></el-table-column>
                <el-table-column prop="Reason" label="加减分理由" width="240"></el-table-column>
                <el-table-column prop="FunctionalDepartment" label="职能部门/所在部门" width="120"></el-table-column>
                <el-table-column prop="checkDate" label="考核日期" width="100"></el-table-column>
                <el-table-column prop="Submit" label="提交部门" width="100"></el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" slot="reference" @click="editDetail(scope.row)">编辑</el-button>
                        <el-popconfirm title="确定删除此条记录吗？" @onConfirm="deleteDetail(scope.row)">
                            <el-button type="text" size="mini" slot="reference" style="margin-left:10px;color:red">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" style="margin-top:10px"></el-pagination>
        </div>

        <el-dialog title="修改管理明细" :visible.sync="dialogFormVisible">
            <el-form :model="editItem" label-width="120px" style="height:300px;overflow-y:auto;padding-right:20px">
                <el-form-item label="工号" size="mini"> 
                    <el-input v-model="editItem.JobId" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="姓名" size="mini">
                    <el-input v-model="editItem.Name" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="一级部门" size="mini">
                    <el-input v-model="editItem.DepartmentLv1" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="二级部门" size="mini">
                    <el-input v-model="editItem.DepartmentLv2" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="三级部门" size="mini">
                    <el-input v-model="editItem.DepartmentLv3" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="职务名称" size="mini">
                    <el-input v-model="editItem.Post" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="加分" size="mini">
                    <el-input v-model="editItem.BonusPoints" autocomplete="off" clearable oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="减分" size="mini">
                    <el-input v-model="editItem.MinusPoints" autocomplete="off" clearable oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="加减分理由" size="mini">
                    <el-input v-model="editItem.Reason" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="加减分依据" size="mini">
                    <el-input v-model="editItem.Proof" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="理由分类" size="mini">
                    <el-input v-model="editItem.ReasonType" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="职能部门/所在部门" size="mini">
                    <el-input v-model="editItem.FunctionalDepartment" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="考核日期" size="mini">
                    <!-- <el-input v-model="editItem.checkDate" autocomplete="off" clearable></el-input> -->
                     <el-date-picker v-model="editItem.checkDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="提交部门" size="mini">
                    <el-input v-model="editItem.Submit" autocomplete="off" clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="editRecord()">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="批量修改管理明细" :visible.sync="dialogFormVisibleTwo">
            <i class="el-icon-warning-outline" style="margin-right:10px"></i>
            <span>操作提示：</span>
            <div>1.若批量修改一级部门，先选择一级部门，再输入值，若输入空值，则字段清空；</div>
            <div>2.若是想批量修改多个字段，点击“新增”；</div>
            <div>3.不需要修改的字段，请勿添加到此页面，此页面出现的字段，均将被更新。</div>

            <el-divider></el-divider>
            <el-form style="height:180px;overflow-y:auto;padding-right:20px" :inline="true">
                <div v-for="(item, index) in editArray" :key="index" class="edit-item-wrapper">
                    <el-input size="mini" placeholder="请输入内容" v-model="item.value" class="input-with-select" >
                        <el-select v-model="item.label" slot="prepend" placeholder="请选择" style="width:100px">
                            <el-option label="工号" value="JobId"></el-option>
                            <el-option label="姓名" value="Name"></el-option>
                            <el-option label="一级部门" value="DepartmentLv1"></el-option>
                            <el-option label="二级部门" value="DepartmentLv2"></el-option>
                            <el-option label="三级部门" value="DepartmentLv3"></el-option>
                            <el-option label="职务名称" value="Post"></el-option>
                            <el-option label="加分" value="BonusPoints"></el-option>
                            <el-option label="减分" value="MinusPoints"></el-option>
                            <el-option label="加减分理由" value="Reason"></el-option>
                            <el-option label="加减分依据" value="Proof"></el-option>
                            <el-option label="理由分类" value="ReasonType"></el-option>
                            <el-option label="职能部门/所在部门" value="FunctionalDepartment"></el-option>
                            <el-option label="考核日期" value="checkDate"></el-option>
                            <el-option label="提交部门" value="Submit"></el-option>
                        </el-select>
                    </el-input>
                    <el-button @click.prevent="removeItem(index)" size="mini" v-if="index>0">删除</el-button>
                    <el-button @click.prevent="addItem()" size="mini">新增</el-button>
                </div>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogFormVisibleTwo = false">取消</el-button>
                <el-button type="primary" size="mini" @click="editRecords()">确定</el-button>
            </div>
        </el-dialog>

    </div>
</template>


<script>
import axios from 'axios'
import js from './mixins/index'
import dayjs from 'dayjs'
import util from '@/libs/util.js'
import { domain } from '@/dataDic.js' 
export default {
    name: 'a-detail',
    mixins: [
        js
    ],
    data () {
        return {
            dialogFormVisible:false,
            dialogFormVisibleTwo: false,
            editItem: {},
            editArray: [],
            fullscreenLoading:false,
            domain,
            staffNo: '',
            name: '',
            addOrMin: '',
            isEnd: '',
            checkDate: null,
            editArray: [],
            file: null,
            operator: util.cookies.get('uuid'),
            selectedArray: []   
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
              name: this.name,
              jobid: this.staffNo? String(this.staffNo):'',
              isBonus: this.addOrMin,
              isAccounted: this.isEnd,
              beginDate: this.checkDate? dayjs(this.checkDate[0]).format('YYYY-M-D HH:mm:ss') :'',
              endDate: this.checkDate? dayjs(this.checkDate[1]).endOf('month').format('YYYY-M-D HH:mm:ss') :'',
              page: this.pagination.currentPage,
              pageSize: this.pagination.pageSize,
              rewardPointsType: '管理积分',
              onduty: 0
          }
          this.loading = true;
          this.$api.GET_DETAIL_LIST(data).then(res => {
              this.loading = false
              this.data = res.data.detail
              res.data.detail.map((item) => {
                item.checkDate = dayjs(item.AssessmentDate).format('YYYY-M-D')
              })
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

      beforeUpload (file) {
        this.file = file;
      },

        /**
         * 导出
         */
      exportFile () {
            let data = {
              name: this.name,
              jobid: this.staffNo? Number(this.staffNo):'',
              isBonus: this.addOrMin,
              isAccounted: this.isEnd,
              beginDate: this.checkDate? dayjs(this.checkDate[0]).format('YYYY-M-D HH:mm:ss') :'',
              endDate: this.checkDate? dayjs(this.checkDate[1]).endOf('month').format('YYYY-M-D HH:mm:ss') :'',
              rewardPointsType: '管理积分',
              Operator: String(this.operator),
              onduty: 0
          }
          this.fullscreenLoading = true;
          this.$api.EXPORT_DETAIL_LIST(data).then(res => {
              this.fullscreenLoading = false;
              if (res.code === 0) {
                  window.location.href = this.domain + res.data;
                  this.$message.success('导出成功')
              } else {
                  this.$message.error(res.msg || '导出失败，请联系管理员')
              }
          }).catch(err => {
              this.fullscreenLoading = false;
              console.log('err', err)
          })
        },

          /**
         * 删除
         */
        deleteDetail (val) {
            console.log(val);
            let data = {
                RewardPointsdetailID: val.RewardPointsdetailID
            }

            this.$api.DELETE_DETAIL_RECORD(data).then(res => {
                if (res.code === 0) {
                    this.$message.success('删除成功')
                    this.getList()
                } else {
                    this.$message.error(res.msg || '删除失败')
                }
            }).catch(err => {
                console.log(err)
            })
        },

        // 修改记录--显示弹框，赋值
        editDetail(row){
            this.editItem = {...row};
            this.dialogFormVisible = true;
        },

        // 修改记录--提交数据
        editRecord(){
            let data = {
                RewardPointsdetailID: this.editItem.RewardPointsdetailID,
                BonusPoints: this.editItem.BonusPoints,
                MinusPoints: this.editItem.MinusPoints,
                Reason: this.editItem.Reason,
                Proof: this.editItem.Proof,
                ReasonType: this.editItem.ReasonType,
                JobId: this.editItem.JobId,
                Name: this.editItem.Name,
                AssessmentDate: this.editItem.checkDate? dayjs(this.editItem.checkDate).format('YYYY-M-D HH:mm:ss') :'',
                DepartmentLv1: this.editItem.DepartmentLv1,
                DepartmentLv2: this.editItem.DepartmentLv2,
                DepartmentLv3: this.editItem.DepartmentLv3,
                FunctionalDepartment: this.editItem.FunctionalDepartment,
                Submit: this.editItem.Submit,
                Post: this.editItem.Post
            }
            console.log(data)
            this.$api.EDIT_RECORD(data).then(res => {
                if (res.code === 0) {
                    this.$message.success('修改成功')
                    this.dialogFormVisible = false
                    this.getList()
                } else {
                    this.$message.error(res.msg || '修改失败')
                }
            }).catch(err => {
                console.log(err)
            })
        },

        editDetails(){
            if(this.selectedArray.length<1){
                this.$message.error('请选择要编辑的数据')
                return
            }
            this.dialogFormVisibleTwo = true;
            this.editArray = [{
                label:'',
                value:''
            }]
        },
        editRecords(){
            console.log(this.editArray)
        },
        addItem(){
            this.editArray.push({
                label:'',
                value:''
            })
        },
        removeItem(index){
            this.editArray.splice(index,1)
            console.log(this.editArray)
        },

      importFile () {
        const _this = this;
        _this.source = axios.CancelToken.source();
        let fileData = new FormData();
        fileData.append('file', _this.file)
        fileData.append('Operator', String(this.operator))
        let url = '/import_rewardPoint';
        this.uploadFile(url, fileData, _this.source.token, (res) => {
            let loaded = res.loaded
            let total = res.total
            _this.$nextTick(() => {
                _this.uploadPercent = Math.floor(loaded/total*100)>1? Math.floor(loaded/total*100):1;
                })
                }).then((res) => {
                    if (res.data.code === 0) {
                        _this.$message.success('导入成功')
                        _this.uploadPercent = 0
                        _this.getList()
                    } else {
                        _this.$message.error(res.msg || '导入失败，请联系管理员')
                    }
                }, (rej) => {
                    if (rej === -2) {
                        _this.$message.info('取消上传成功')
                    } else {
                        _this.$message.error('上传失败')
                    }
                })
            },

            handleSelectionChange(val){
                console.log(val);
                this.selectedArray = val;
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

    .edit-item-wrapper{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        .input-with-select{
            width: 400px;
            margin-right: 10px;
        }
    }
}
</style>
