<template>
	<li>
		<label>
			<input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)"/>
			<!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
			<!-- <input type="checkbox" v-model="todo.done"/> -->
			<span v-show="!todo.isEdit">{{todo.title}}</span>
			<input
			 type="text" 
			 v-show="todo.isEdit"
			 :value="todo.title"
			 ref="inputTltle"
			 @blur="handleBlur(todo,$event)"
			 >
		</label>
		<button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
		<button v-show="!todo.isEdit" class="btn btn-editor" @click="handleEditor(todo)">编辑</button>
	</li>
</template>

<script>
	export default {
		name:'MyItem',
		//声明接收todo、checkTodo、deleteTodo 
		props:['todo'],
		methods: {
			handleCheck(id){
				this.$bus.$emit('checkTodo',id)
			},
			handleDelete(id){
				if(confirm('确定删除吗？')){ 
					this.$bus.$emit('deleteTodo',id) 
				} 
			},
			handleEditor(todo){
				if(todo.hasOwnProperty('isEdit')){ 
					todo.isEdit = true
				}else{
					// console.log(this)
					this.$set(todo,'isEdit',true) 
				} 
				this.$nextTick(function(){
					this.$refs.inputTltle.focus()
				})
			},
			handleBlur(todo,e){
				todo.isEdit = false  
				if(!e.target.value.trim()) return alert('内容不能为空！')
				this.$bus.$emit('updateTodo',todo.id,e.target.value) 
			}
		},
	}
</script>

<style scoped>
	/*item*/
	li {
		list-style: none;
		height: 36px;
		line-height: 36px;
		padding: 0 5px;
		border-bottom: 1px solid #ddd;
	}

	li label {
		float: left;
		cursor: pointer;
	}

	li label li input {
		vertical-align: middle;
		margin-right: 6px;
		position: relative;
		top: -1px;
	}

	li button {
		float: right;
		display: none;
		margin-top: 3px;
	}

	li:before {
		content: initial;
	}

	li:last-child {
		border-bottom: none;
	}

	li:hover{
		background-color: #ddd;
	}
	
	li:hover button{
		display: block;
	}
</style>