<template>
	<div class="getmessage">
	<el-form ref="form" :model="form" :rules="rules" label-width="150px">
		<el-form-item label="请输入手机号码：" prop="mobile">
			<el-input type="text" v-model="form.mobile" placeholder="请输入手机号码"></el-input>
		</el-form-item>
		<el-form-item label="请输入密码：" prop="password">
			<el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
		</el-form-item>
		<el-form-item label="验证码类型：" prop="region" >
		    <el-select v-model="form.region" placeholder="请选择验证码类型" style="width:100%">
		      <el-option label="登录验证码" value="1"></el-option>
		      <el-option label="注册验证码" value="2"></el-option>
		      <el-option label="找回密码验证码" value="3"></el-option>
		      <el-option label="修改交易密码验证码" value="4"></el-option>
		      <el-option label="找回交易密码验证码" value="5"></el-option>
		      <el-option label="绑定银行代扣卡验证码" value="6"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">立即创建</el-button>
		    <el-button @click="handleReset">重置</el-button>
		  </el-form-item>
	</el-form>	
	</div>	
</template>
<script >
	import {getMessage} from '../../api/api';
	export default{
		data(){
			return {
				form:{
					mobile:'',
					password:'',
					region:''
				},
				rules:{
					mobile:[
						{required:true,message:"请输入手机号码",trigger:"blur"}
					],
					password:[
						{required:true,message:"请输入密码",trigger:"blur"}
					],
					region:[
						{required:true,message:"请选择验证码类型",trigger:"blur"}
					]
				}
			}
		},
		mounted(){

		},
		methods:{
			onSubmit(){
				this.$refs.form.validate((valid)=>{
					console.log(valid)
					if(valid){

						getMessage(this.form).then(data=>{
							console.log(data)
							let { msg, code} = data;
							if(code!==200){
								this.$message({
				                  message: msg,
				                  type: 'error'
				                });

							}else{
								
				                this.$alert(msg, "提示", { type: "success" })
							}
						})
					}else{
            			return false;
					}
				})
				console.log('submit!');
			},
			handleReset(){

				this.$refs.form.resetFields();
			}
		},

	}
</script>

<style lang="less" scoped>
	.getmessage{
		border-top: 1px solid #ccc;
		padding-top:80px;
		margin-top: 10px;
		form{
			width: 500px;
		}
	}
</style>