<template>	
	<div>
		<el-row :span="24" :model="form" class="toolbar" style="margin-bottom: 10px;">
			借款人App上传<span style="margin-left:100px;"></span>
		    <el-button type="primary" size="small" @click="add" icon="plus">添  加</el-button>
		</el-row>

		<el-table
      :data="tableData"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="版本名称"
        >
      </el-table-column>
      <el-table-column
        prop="modeltype"
        label="设备">
        <template scope="scope">
         		<div v-if="scope.row.modeltype==1">安卓</div>
         		<div v-if="scope.row.modeltype==2">IOS</div>
         </template>
      </el-table-column>
      <el-table-column
        prop="mandatoryupdate"
        label="强制">
         <template scope="scope">
         		<div v-if="scope.row.mandatoryupdate==1">是</div>
         		<div v-if="scope.row.mandatoryupdate==2">否</div>
         </template>
      </el-table-column>
      <el-table-column
        prop="versionfull"
        label="大版本">
      </el-table-column>
      <el-table-column
        prop="versionnum"
        label="小版本">
      </el-table-column>
      <el-table-column
        prop="sizes"
        label="大小">
         <template scope="scope">
         		{{scope.row.sizes}}M
         </template>
      </el-table-column>
		<el-table-column
        prop="description"
        label="说明"
        width="400">
      </el-table-column>

         <el-table-column
        	label="操作"
        	width="120">
        	 <template scope="scope">
	          <el-button @click="Edit(scope.row)" type="text" size="small">编辑</el-button> 
	          <el-button @click="Delete(scope.row)" type="text" size="small">删除</el-button> 
	       </template>
      	</el-table-column>
    </el-table>

    <!-- 分页 -->
		<el-col :span="24" class="toolbar" style="text-align: right">

		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="pageIndex"
		      :page-sizes="[20, 50, 100]"
		      :page-size="pageSize"
		      layout="sizes, prev, pager, next"
		      :total="total">
		    </el-pagination>

		  </el-col>
		  <!-- 分页 end  -->

			<!-- 编辑框 -->
		  <el-dialog title="借款人App上传" v-model="showOperateManifest" size="small">
		  <el-form :model="form" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
				<el-form-item label="活动名称" prop="name">
				    <el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="设备类型" prop="modeltype">
				    <el-radio-group v-model="form.modeltype">
				      <el-radio label="1">安卓</el-radio>
				      <el-radio label="2">IOS</el-radio>
				    </el-radio-group>
				 </el-form-item>
				 <el-form-item label="是否强制升级" prop="mandatoryupdate">
				    <el-radio-group v-model="form.mandatoryupdate">
				      <el-radio label="0">常用升级</el-radio>
				      <el-radio label="1">强制升级</el-radio>
				    </el-radio-group>
				 </el-form-item>
				 <el-form-item label="全版本号" prop="versionfull">
				    <el-input v-model="form.versionfull"></el-input>
				</el-form-item>
				<el-form-item label="小版本号" prop="versionnum">
				    <el-input v-model="form.versionnum"></el-input>
				</el-form-item>
				<el-form-item label="APP升级包路径" prop="url">
				    <el-input v-model="form.url"></el-input>
				</el-form-item>
				<el-form-item label="文件大小(M)">
				    <el-input v-model="form.sizes"></el-input>
				</el-form-item>
				<el-form-item label="版本更新说明">
				    <el-input v-model="form.description"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="cancel">取 消</el-button>
		    		<el-button type="primary" @click="formsubmit" :loading="submitloading">确 定</el-button>
				</el-form-item>
		  </el-form>
		</el-dialog>


	</div>
</template>
<script>

	import {appversionlist,appversiondel,appversionupload} from '../../api/api';

	export default{
		data(){
			return {
				loading:true,
				isAdd:false,
				form:{},
				tableData:[],
				pageIndex: 0,
				 pageSize:20,
                    total: 1, 
   	  showOperateManifest:false,
   	  	submitloading:false,
   	  			rules:{
   	  				name: [
			            { required: true, message: '请填写版本名称', trigger: 'blur' }
			         ],
			         modeltype: [
			            { required: true, message: '请选择设备类型', trigger: 'blur' }
			         ],
			         mandatoryupdate: [
			            { required: true, message: '请选择是否强制升级', trigger: 'blur' }
			         ],
			         versionfull: [
			            { required: true, message: '请填写全版本号', trigger: 'blur' }
			         ],
			         versionnum: [
			            { required: true, message: '请填写小版本号', trigger: 'blur' }
			         ],
			         url: [
			            { required: true, message: '请填写APP升级包路径', trigger: 'blur' }
			         ],
   	  			}
   			}
		},
		mounted(){
			this.datalist();
		},
		methods:{
			handleCurrentChange(pageIndex){
				this.pageIndex = pageIndex;
                this.datalist();
			},
			handleSizeChange(pageSize){
				this.pageSize = pageSize;
                this.datalist();
			},
			datalist(){
				var params={
					'pageNum':this.pageIndex+1,
					'pageSize': this.pageSize

				}
				appversionlist(params).then(res=>{
					console.log(res)
					let { msg, code, data} = res;

					this.loading=false;

						if(code!==200){
							this.$message({
			                  message: msg,
			                  type: 'error'
			                });

						}else{
							this.tableData=data.list;
			                //this.$alert(msg, "提示", { type: "success" })
						}
				})
			},
			add(){
                this.form={
					name:'',
					modeltype:'1',
					mandatoryupdate:'0',
					versionfull:'',
					versionnum:'',
					url:'',
					sizes:'',
					description:''
				};
                this.isAdd = true;  
                this.showOperateManifest = true;
			},
			formsubmit(){
				this.$refs.ruleForm.validate((valid)=>{
					 if (valid) {
			            this.submitloading=true;
			            let params={
			            	appVersionJson:JSON.stringify(this.form),
			            	pwd:'!qazxsw@'
			            };
			            appversionupload(params).then((res)=>{
			            	console.log(res)
			            	this.submitloading=false;
							let { msg, code,data} = res;
							if(code!==200){
								this.$message({
				                  message: msg,
				                  type: 'error'
				                });

							}else{
								//this.tableData=res.setting;
				                this.$alert(msg, "提示", { type: "success" })
				                this.showOperateManifest=false;
				                this.datalist();
							}
			            })
			          } else {
			            console.log('error submit!!');
			            return false;
			          }
				})
			},
			Edit(el){
				this.form=JSON.parse(JSON.stringify(el));
				this.form.modeltype=JSON.stringify(this.form.modeltype);
				this.form.mandatoryupdate=JSON.stringify(this.form.mandatoryupdate);
				this.form.versionnum=JSON.stringify(this.form.versionnum);
				console.log(this.form)
				console.log(JSON.stringify(el))
				this.showOperateManifest=true;
			},
			Delete(el){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
			        let key={};
			        key.id=el.id;
					key.pwd='!qazxsw@';
					appversiondel(key).then(res=>{
						console.log(res)
						let { msg, code} = res;
							if(code!==200){
								this.$message({
				                  message: msg,
				                  type: 'error'
				                });

							}else{
				                this.$message({
						            type: 'success',
						            message: '删除成功!'
						          });

				                this.datalist();
							}
					})
		        }).catch(() => {

		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });


			},
			cancel(){
				this.form = {};
                this.showOperateManifest = false;
                this.submitloading=false;
			},

		}
	}
</script>
<style lang="less" scoped>
	.toolbar .el-input{
		width: auto;
	}
</style>