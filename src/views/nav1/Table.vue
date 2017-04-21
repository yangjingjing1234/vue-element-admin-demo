<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="margin-bottom: 10px;">
			<el-form :inline="true" >
				 开始日期：
        <el-date-picker v-model="start_time" type="datetime" placeholder="选择日期"></el-date-picker>
        结束日期：
        <el-date-picker v-model="end_time" type="datetime" placeholder="选择日期"></el-date-picker>
        <span style="display: inline-block;width:20%;">
            <el-input v-model="version" icon="search" placeholder="请输入查询内容"></el-input>
        </span>
        
        <el-button type="primary" size="small" v-on:click="searchDate" icon="search">查  询</el-button>
        <el-button type="primary" size="small" v-on:click="add" icon="plus">添  加</el-button>
        <el-button type="primary" size="small" v-on:click="del" icon="delete">删  除</el-button>

			</el-form>
		</el-col>

		<!--列表-->
		<!-- 数据列表 -->

      <el-table
      :data="manifests"
      border
      v-loading="loading"
      element-loading-text="拼命加载中"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="version" label="版本配置" width="100"></el-table-column>
      <el-table-column prop="ison" label="开启挡板" :formatter="formatison" width="100"></el-table-column>
      <el-table-column prop="interfacename" label="全部开启" :formatter="formatisall" >
          <template scope="scope">
          <div v-for="(item,index) in scope.row.interfacename" :key="index" v-if="scope.row.interfacename!=[]">
              ({{index+1}}),{{item.interfaceurl}}<br>
              开始时间：{{item.start_time}}<br>
              结束时间：{{item.end_time}}<br>
          </div>
          <div v-else>
          	  是
          </div>
          </template>
      </el-table-column>
      </el-table-column>
      <el-table-column prop="start_time" label="开始时间" ></el-table-column>
      <el-table-column prop="end_time" label="结束时间" ></el-table-column>
      <el-table-column prop="type" label="返回类型" :formatter="formattype" width="100"></el-table-column>
      <el-table-column prop="msg" label="提示信息" width="100"></el-table-column>
      <el-table-column prop="urlto" label="跳转地址" ></el-table-column>
      <el-table-column label="操作" width="80" >
       <template scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button> 
       </template>
      </el-table-column>
    </el-table>


		<!--工具条-->
		<el-col :span="24" class="toolbar" style="text-align: right">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="pageIndex"
		      :page-sizes="pageSizes"
		      :page-size="pageSize"
		      layout="sizes, prev, pager, next"
		      :total="total">
		    </el-pagination>
		</el-col>

		<!--编辑界面-->
<el-dialog v-bind:title="title" v-model="showOperateManifest" class="edit_box" v-on:close="cancel">
            <el-form 
            v-bind:model="manifest"  
            :rules="rules"
            ref="formManifest" 
            label-position="right" label-width="100px" >
                <el-form-item label="配置版本" prop="version">
                    <el-input v-model="manifest.version"></el-input>
                </el-form-item>

                <el-form-item label="开启挡板" prop="ison">
                    <el-radio-group v-model="manifest.ison">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="全部开启" required>
                    <!-- <el-switch on-text="是" off-text="否" v-model="manifest.isall" @change="dateChange"></el-switch> -->
                     <el-radio-group v-model="manifest.isall" @change="dateChange">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
            
                <!-- 添加域名表单 end -->

                <div v-if="manifest.isall==0">
                    

                  <el-form-item
                    
                    v-for="(domain, index) in manifest.interfacename"
                    :label="'域名' + index"
                    :key="index"
                   
                  >

<el-form-item  
 :prop="'interfacename.' + index + '.interfaceurl'"
 :rules="{
            required: true, message: '域名不能为空', trigger: 'blur'
 }">
                  <el-col :span="16">
                    <el-input v-model="domain.interfaceurl"></el-input>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align:center">-</el-col>
                <el-col :span="6">
                    <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                </el-col>
</el-form-item>

                  <el-row style="margin-top:20px;">
                <el-col :span="11">
                  <el-date-picker 
                  type="datetime" 
                  placeholder="选择开始日期" 
                  v-model="domain.start_time" 
                  style="width: 100%;">
                  </el-date-picker>
                </el-col>
                <el-col class="line" :span="2" style="text-align:center">-</el-col>
                <el-col :span="11">
                    <el-date-picker
                    v-model="domain.end_time"
                    type="datetime"
                    placeholder="选择结束日期"
                    style="width: 100%;">
                    </el-date-picker>

                </el-col>
                </el-row>

                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="addDomain">新增域名</el-button>
                  </el-form-item>
                  </div>

                <!-- 添加域名表单 -->

             
                <el-form-item label="开启时间" >
                <el-row>
                <el-col :span="11">
                  <el-date-picker 
                  type="datetime" 
                  placeholder="选择开始日期" 
                  v-model="manifest.start_time" 
                  :picker-options="pickerOptions0"
                  style="width: 100%;">
                  </el-date-picker>
                </el-col>
                <el-col class="line" :span="2" style="text-align:center">-</el-col>
                <el-col :span="11">
                    <el-date-picker
                     v-model="manifest.end_time"
                     :picker-options="pickerOptions1"
                    type="datetime"
                    placeholder="选择结束日期"
                    style="width: 100%;">
                    </el-date-picker>

                </el-col>
                </el-row>
              </el-form-item>

                <el-form-item label="返回类型" prop="type">
                    <el-select v-model="manifest.type" placeholder="请选返回类型">
                      <el-option label="msg" value="1"></el-option>
                      <el-option label="url" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                <el-form-item label="提示信息" prop="msg">
                    <el-input v-model="manifest.msg"></el-input>
                </el-form-item>
                <el-form-item label="跳转页面" prop="urlto">
                    <el-input v-model="manifest.urlto"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="save" :loading="submitloading">确 定</el-button>
                    <el-button type="primary" v-on:click="cancel">取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

		<!--编辑界面-->

	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { getUserList, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	import '../../common/js/Dateformat';
	export default {
		data() {
			let currentDate = new Date();
			return {
				isshow: false,
                projectPath:'',
                isshowcontent:'block',
                submitloading:false,//提交按钮未加载状态
                multipleSelection: [],//选中的值
                pageIndex: 0,
                total: 0, //总共多少页
                pageSizes: [20, 50, 100],
                pageSize: 20,
                loading: false,
                start_time: '',
                end_time: '',
                version:'',
                manifests: [],//列表信息‘
                title: "",   //编辑框title
                manifest: {},//编辑框里的值
                showOperateManifest: false,//是否显示编辑框
                isAdd: false,//是编辑还是添加在保存按钮处有区别
                pickerOptions0: {

                  disabledDate:function(time){
                    let end_time=this.manifest.end_time;
                        if(end_time){
                            return time.getTime() > end_time;
                        }
                      }.bind(this)
                },
                pickerOptions1: {

                  disabledDate:function(time){
                     let start_time=this.manifest.start_time;
                        if(start_time){
                            return time.getTime() < start_time;
                        }
                      }.bind(this)
                },
                rules: {   //form表单校验规则
                    version: [
                        {  required: true, message: "请填写版本号", trigger: "blur" }
                    ],
                    ison: [
                        { required: true, message: "是否开启挡板", trigger: "blur" }
                    ],
         
                    start_time: [
                        { required: true, message: "请填写开始时间", trigger: "change" }
                    ],
                    end_time: [
                        { required: true, message: "请填写结束时间", trigger: "change" }
                    ],
                    type: [
                        { required: true, message: "请填写返回类型", trigger: "blur" }
                    ],
                    msg: [
                        { required: true, message: "请填写提示信息", trigger: "blur" }
                    ],
                    urlto: [
                        { required: true, message: "请填写跳转地址", trigger: "blur" }
                    ]
                }

			}
		},
		methods: {
			  formatison(row, column){
                return row.ison == 1 ? '是' : row.ison == 0 ? '否' : '未知';
              },
              formattype(row){
                return row.type == 1 ? 'msg' : row.type == 2 ? 'url' : '未知';
              },
              formatisall(row){
                if(row.interfacename == []){
                    return '是'
                }else{
                    return row.interfacename 
                }

              },
              handleSelectionChange(val) {
                console.log(val)
                this.multipleSelection = val;
              },
              handleSizeChange(pageSize) {
                console.log(`每页 ${pageSize} 条`);
                 this.pageSize = pageSize;
                this.fetchData();
              },
              handleCurrentChange(pageIndex) {
                 console.log(`当前页: ${pageIndex}`);
                this.pageIndex = pageIndex;
                this.fetchData();

              },
              searchDate:function(){
                let issearch=this.start_time||this.end_time||this.version;
                if(issearch){
                   this.fetchData() 
               }else{
                this.$alert('请输入查询内容', "提示", { type: "warning" })
                return false;
               }
                
              },
              fetchData: function () {
                this.manifests = [];
                this.loading=true;
                let para = {
					start_time: this.start_time?this.start_time.Format("yyyy-MM-dd hh:mm:ss"):'',
                    end_time: this.end_time?this.end_time.Format("yyyy-MM-dd hh:mm:ss"):'',
                    version: this.version,
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
				};
                getUserList(para).then((res) => {
                	console.log(res)

					this.loading=false;
                    if(res.data.code=="200"){
                         this.manifests = res.data.data.list;
                         this.total = res.data.data.totalNumber;
                         this.loading=false;
                         this.start_time='';
                         this.end_time='';
                    }else{
                        this.$alert(res.data.msg, "提示", { type: "error" })
                    }

				});

              },
              add: function () {
                this.title = "添加版本控制";
                this.manifest = {
                        version:'',
                        ison:'1',
                        isall:'0',
                        start_time:'',
                        end_time:'',
                        type:'',
                        msg:'',
                        urlto:'',
                        interfacename: [{
                        interfaceurl: '',
                        start_time: '',
                        end_time: '',
                      }]

                };
                this.isAdd = true;  
                this.showOperateManifest = true;
            },
            save: function () {
                this.$refs.formManifest.validate(function(valid){

                    if (valid) {
  
                        let operateManifest = JSON.parse(JSON.stringify(this.manifest));
                        operateManifest.start_time = this.manifest.start_time?this.manifest.start_time.Format("yyyy-MM-dd hh:mm:ss"):'';
                        operateManifest.end_time = this.manifest.end_time?this.manifest.end_time.Format("yyyy-MM-dd hh:mm:ss"):'';
                        operateManifest.interfacename=JSON.stringify(arrtimeformat(this.manifest.interfacename));
                        this.submitloading=true;
                        if (this.isAdd) {

                            addUser(operateManifest).then((res) => {
								 this.loading=false;
                                    if(res.data.code=="200"){
                                         this.showOperateManifest = false;
                                         this.fetchData();
                                         this.$message({
                                            message: "添加成功",
                                            type: "success"
                                        });


                                    }else{
                                        this.$alert(res.data.msg, "提示", { type: "error" })
                                    }
                                    this.submitloading=false;
							});

                        }
                        else {
                        	editUser(operateManifest).then((res)=>{
                        			this.submitloading=false;
                                    if(res.data.code=="200"){
                                         this.showOperateManifest = false;
                                         this.fetchData();
                                         this.$message({
                                            message: "修改成功",
                                            type: "success"
                                        });

                                    }else{
                                        this.$alert(res.data.msg, "提示", { type: "error" })
                                    }
                        	})
                 
                        }
                    }else {
                        return false;
                    }

                }.bind(this));
            },
            cancel: function () {
                this.manifest = {};
                this.showOperateManifest = false;
                this.submitloading=false;
            },
            edit: function (id) {
                this.manifest = JSON.parse(JSON.stringify(id));
                this.manifest.start_time = new Date(this.manifest.start_time);
                this.manifest.end_time = new Date(this.manifest.end_time);
                this.manifest.isall = JSON.stringify(this.manifest.isall);
                this.manifest.ison = JSON.stringify(this.manifest.ison);
                this.manifest.type = JSON.stringify(this.manifest.type);
                this.manifest.interfacename = arrtimeformat2(this.manifest.interfacename);

                this.title = "编辑版本配置";
                this.isAdd = false;
                this.showOperateManifest = true;
            },
            del: function () {
                this.$confirm("是否删除？", "警告", { type: "warning" })
                .then(function(){
                    let deleteparams=arridtostring(this.multipleSelection);
                    this.loading=true;

                    removeUser({damids:deleteparams}).then((res)=>{
                    	 if(res.data.code=='200'){
                                this.$message({
                                    message: "删除成功",
                                    type: "success"
                                });
                                this.fetchData()
                            }else{
                               this.$alert(res.data.msg, "提示", { type: "success" }) 
                            }
                            this.loading=false;
                    })
                    
                }.bind(this)).catch(function(){
                  this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });  
                }.bind(this))
            },
              removeDomain(item) {
                var index = this.manifest.interfacename.indexOf(item)
                if (index !== -1) {
                  this.manifest.interfacename.splice(index, 1)
                }
              },
              addDomain() {
                this.manifest.interfacename.push({
                  interfaceurl: '',
                  start_time: '',
                  end_time: '',
                });
              },
              dateChange(){
                if(!this.manifest.isall){
                    this.manifest.interfacename=[{
                    interfaceurl: '',
                    start_time: '',
                    end_time: '',
                  }]
                }
              }
		},
		mounted() {
			this.fetchData();
		}
	}



function arridtostring(arrobj){
    var arr = [];
    for(var i = 0, len = arrobj.length; i < len; i++){
           var obj = arrobj[i];
               arr.push(obj.id);

    };
    return arr.join()
}

function arrtimeformat(arrobj){
    var arr=[];
    for(var i=0,len=arrobj.length;i<len;i++){
        var obj=arrobj[i];
        obj.start_time=obj.start_time?new Date(obj.start_time).Format("yyyy-MM-dd hh:mm:ss"):'';
        obj.end_time=obj.end_time?new Date(obj.end_time).Format("yyyy-MM-dd hh:mm:ss"):'';
        arr.push(obj)
    }
     return arr;
}

function arrtimeformat2(arrobj){
    var arr=[];
    for(var i=0,len=arrobj.length;i<len;i++){
        var obj=arrobj[i];
        obj.start_time=obj.start_time?new Date(obj.start_time):'';
        obj.end_time=obj.end_time?new Date(obj.start_time):'';
        arr.push(obj)
    }
     return arr;
}
</script>

<style scoped>

</style>