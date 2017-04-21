<template>	
	<div>
		<el-row :span="24" :model="form" class="toolbar" style="margin-bottom: 10px;">
			<el-form :inline="true" >

				 	配置key:<span style="color: red">[默认添加前缀:jkapp_setting_]</span>

		        	<el-input v-model="form.key" type="text" placeholder="填写key" width='200'></el-input>
	
		        	配置value:

		        	<el-input v-model="form.value" type="text" placeholder="填写value" width='200'></el-input>

		        	<el-button type="primary" size="small" @click="add" icon="plus">添  加</el-button>
		

			</el-form>
		</el-row>

		<el-table
      :data="tableData"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="key"
        label="配置key">
      </el-table-column>
      <el-table-column
        prop="value"
        label="配置value">
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
	</div>
</template>
<script>

	import {allsettingList,allsettingdel,allsettingsave} from '../../api/api';

	export default{
		data(){
			return {
				loading:true,
				form:{
					key:'',
					value:''
				},
				tableData:[],
				pageIndex: 0,
				 pageSize:20,
                    total: 1, //总共多少页
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
					'name':'jkapp',
					'password':'jkappadmin123456',
					'pageIndex':this.pageIndex,
					'pageSize': this.pageSize
				}
				allsettingList(params).then(res=>{

					let { msg, code, data} = res;

					this.loading=false;

						if(code!==200){
							this.$message({
			                  message: msg,
			                  type: 'error'
			                });

						}else{
							this.tableData=data.setting;
			                //this.$alert(msg, "提示", { type: "success" })
						}
				})
			},
			add(){
				if(!this.form.key){
					this.$alert('请输入配置键名', "提示", { type: "warning" })
					return false;
				}else if(!this.form.value){
					this.$alert('请输入配置键值', "提示", { type: "warning" })
					return false;
				}
				this.form.name='jkapp'
				this.form.password='jkappadmin123456'
				allsettingsave(this.form).then(res=>{
					let { msg, code} = res;
							if(code!==200){
								this.$message({
				                  message: msg,
				                  type: 'error'
				                });

							}else{
				                this.$alert(msg, "提示", { type: "success" });
				                this.form.key="";
				                this.form.value="";
				                this.datalist();
							}
				})
			},
			Edit(el){
				this.form=JSON.parse(JSON.stringify(el));
			},
			Delete(el){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
			        //let key=JSON.parse(JSON.stringify(el));
			        let key={};
			        key.key=JSON.parse(JSON.stringify(el.key));
					key.name='jkapp';
					key.password='jkappadmin123456';

					allsettingdel(key).then(res=>{
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
				                // let deleindex=this.tableData.findIndex(x=>x.key==key.key);
				                // console.log(deleindex)
				                // this.tableData.splice(deleindex,1)
				                this.datalist();
							}
					})
		        }).catch(() => {

		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });


			}

		}
	}
</script>
<style lang="less" scoped>
	.toolbar .el-input{
		width: auto;
	}
</style>