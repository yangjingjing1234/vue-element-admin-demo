<template>
	<div>
		<el-row :span="24" :model="form" class="toolbar" style="margin-bottom: 10px;">
			产业链配置<span style="margin-left:100px;"></span>
		    <el-button type="primary" size="small" @click="editAll" icon="edit">批量修改</el-button>
		</el-row>
				<el-table
      :data="tableData"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="chanyelianname"
        label="名称"
        >
      </el-table-column>

      <el-table-column
        prop="haschecked"
        label="是否开启">
         <template scope="scope">
   <!--       		<div v-if="scope.row.haschecked==0">否</div>
         		<div v-if="scope.row.haschecked==1">是</div> -->

			
			<label  class="el-switch el-switch--wide show_switch_on show_switch_dis" v-if="scope.row.haschecked==0">
				<span class="el-switch__core"><span class="el-switch__button" ></span></span>
				<div class="el-switch__label el-switch__label--right" style="width: 58px;">
					<span>否</span>
				</div>
			</label>
			<label  class="el-switch el-switch--wide show_switch_on" v-if="scope.row.haschecked==1">
				<span class="el-switch__core"><span class="el-switch__button" ></span></span>
				<div class="el-switch__label el-switch__label--left" style="width: 58px;">
					<span >是</span>
				</div>
			</label>
         </template>
      </el-table-column>
      <el-table-column
        prop="chanyeliancode"
        label="code">
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
	import {industryChainlist} from '../../api/api';

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
			formathaschecked(row){
				// console.log(row.haschecked)
				// if(row.haschecked=='0'){
				// 	return false;
				// }else if(row.haschecked=='1'){
				// 	return true;
				// }
			},
			datalist(){
				var params={
					'pageIndex':this.pageIndex+1,
					'pageSize': this.pageSize
				}
				let  res={
    "code": 200,
    "msg": "OK",
    "data": {
        "totalNumber": 20,
        "list": [
            {
                "chanyelianname": "佳沃-水果",
                "enterpriceid": 1,
                "haschecked": 0,
                "chanyeliancode": "JW-SG-01"
            },
            {
                "chanyelianname": "佳沃-瓜子",
                "enterpriceid": 2,
                "haschecked": 1,
                "chanyeliancode": "JW-GZ-01"
            },
            {
                "chanyelianname": "恰恰-瓜子",
                "enterpriceid": 3,
                "haschecked": 0,
                "chanyeliancode": "QQ-GZ-01"
            },
            {
                "chanyelianname": "恰恰-啤酒",
                "enterpriceid": 5,
                "haschecked": 0,
                "chanyeliancode": "QQ-PJ-01"
            },
            {
                "chanyelianname": "供应链-农产品批发市场01",
                "enterpriceid": 6,
                "haschecked": 0,
                "chanyeliancode": "GYL-NCP01"
            },
            {
                "chanyelianname": "佳沃-白酒1",
                "enterpriceid": 7,
                "haschecked": 0,
                "chanyeliancode": "JW-BJ-01"
            },
            {
                "chanyelianname": "佳沃-红酒",
                "enterpriceid": 10,
                "haschecked": 0,
                "chanyeliancode": "JW-HJ"
            },
            {
                "chanyelianname": "加我-求求",
                "enterpriceid": 11,
                "haschecked": 0,
                "chanyeliancode": "jw-qq-01"
            },
            {
                "chanyelianname": "佳沃-酒类-黄酒",
                "enterpriceid": 12,
                "haschecked": 0,
                "chanyeliancode": "JW-JL-01-02"
            },
            {
                "chanyelianname": "高兴-草莓",
                "enterpriceid": 14,
                "haschecked": 0,
                "chanyeliancode": "GCF-WJ-01"
            },
            {
                "chanyelianname": "佳沃-各个",
                "enterpriceid": 15,
                "haschecked": 0,
                "chanyeliancode": "JW-GG-01"
            },
            {
                "chanyelianname": "海峰-炒货",
                "enterpriceid": 16,
                "haschecked": 0,
                "chanyeliancode": "JC-RB-01"
            },
            {
                "chanyelianname": "金创-企业标",
                "enterpriceid": 17,
                "haschecked": 0,
                "chanyeliancode": "JC-YB-01"
            },
            {
                "chanyelianname": "金创-渤海",
                "enterpriceid": 18,
                "haschecked": 0,
                "chanyeliancode": "JC-BH-01"
            },
            {
                "chanyelianname": "佳沃-特产",
                "enterpriceid": 19,
                "haschecked": 0,
                "chanyeliancode": "JW-TC-01"
            }
        ]
    }
};
				this.tableData=res.data.list;
				this.total=res.data.totalNumber;
				this.loading=false;
				// industryChainlist(params).then(res=>{
				// 	console.log(res)
				// 	let { msg, code, data} = res;

				// 	this.loading=false;

				// 		if(code!==200){
				// 			this.$message({
			 //                  message: msg,
			 //                  type: 'error'
			 //                });

				// 		}else{
				// 			this.tableData=data.list;
			 //                //this.$alert(msg, "提示", { type: "success" })
				// 		}
				// })
			},
			editAll(){
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