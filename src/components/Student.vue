<template>
	<div class="demo">
		<h2 class="title">学生姓名：{{name}}</h2>
		<h2 class="atguigu">学生性别：{{sex}}</h2>
		<button @click="sentStudentName">发送消息</button>
		<button @click="unbind">解绑</button>
		<button @click="death">销毁</button>
	</div>
</template>

<script>
	export default {
		name:'Student',
		data() {
			return {
				name:'张三',
				sex:'男'
			}
		},
		methods: {
			sentStudentName(){
				this.$emit('shang',this.name)
			},
			unbind(){
				this.$off('shang')
			},
			death(){
				this.$destroy()
			}
		},
	}
</script>

<style scoped>
	.demo{
		background-color: pink; 
	}
	.atguigu{
			font-size: 40px;
		}
</style>
