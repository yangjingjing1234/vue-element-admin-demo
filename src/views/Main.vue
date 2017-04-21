<template>
<div>
	<el-row>
	  <el-col :span="24"><h1>欢迎进入借款人后台管理系统！</h1></el-col>
	</el-row>
	<el-row	>
		<el-col :span="24">
			<h2>请认真阅读以下内容</h2>
			<ul>
				<li>1,查询接口不做登录校验，基本请求参数pageIndex=0,pageSize  返回  totalNumber 数据 </li>
				<li>2,修改保存接口做token校验，md5(户名+密码)前后台对比</li>
				<li class="red">3,请保证渲染参数字段与保存修改字段的一致性</li>
				<li class="red">4,开关变量统一为0,1</li>
			</ul>
		</el-col>
	</el-row>
</div>
</template>

<script>
	export default {
	}

</script>

<style lang="less" scoped>

h1{
	font-size: 40px;
	width: 100%;
	margin-top: 100px;
	text-align: center;
}
.red{
	color: red;
}
</style>