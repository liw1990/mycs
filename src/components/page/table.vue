<template>
	<div class="table">
		<div class="add">
			<ul>
				<li><label>姓名:</label><input type="text" v-model="people.name" /></li>
				<li><label>性别:</label><input type="text" v-model="people.sex" /></li>
				<li><label>年龄:</label><input type="text" v-model="people.age" /></li>
				<div @click="plus()">添加</div>
			</ul>
		</div>
		<dl>
			<dt>
				<p>id</p>
				<p>姓名</p>
				<p>性别</p>
				<p>年龄</p>
				<p>操作</p>
			</dt>
			<dd v-for="(item,index) in peoplelist">
				<p><label>{{item.id}}</label></p>
				<p><label v-if="!item.edit">{{item.name}}</label><input type="text" v-model="item.name" :class=" item.edit ? 'block':'none'" /></p>
				<p><label v-if="!item.edit">{{item.sex}}</label><input type="text" v-model="item.sex" :class=" item.edit ? 'block':'none'" /></p>
				<p><label v-if="!item.edit">{{item.age}}</label><input type="text" v-model="item.age" :class=" item.edit ? 'block':'none'" /></p>
				<p><span @click="edit(index)" v-if="!item.edit">编辑</span><span @click="okNo(index)" :class=" item.edit ? 'block':'none'">确定</span><span @click="del(index)">删除</span></p>
			</dd>
		</dl>
	</div>
</template>

<script>
	export default {
		data (){
			return {
				peoplelist:{},
				people :{
					"id" : 0,
					"name" : "",
					"sex" : "",
					"age" : 18,
					"edit": false
				}
			}
		},
		mounted () {
			this.getList()			
		},
		methods : {
			plus(){
				var length = this.peoplelist.length
				var t = 0;
				if(length==0){
					this.people.id = 1
				}
				for(var i=0; i<length;i++){
					if(t<this.peoplelist[i].id){
						t = this.peoplelist[i].id
					}
					this.people.id = t +1
				}	
				this.peoplelist.push(this.people);
				let data = this.people;
//				console.log(data)
				this.$axios.post("http://localhost:3001/peoplelist",data)
				.then(res=>{
					this.getList()
					console.log("添加成功")
//				    console.log(res);            
				}).catch((err) => {
					console.log("添加失败")
				})
				this.people ={"id" : 0,"name" : "","sex" : "","age" : 18,"edit":false}
			},
			del(index) {
				let sure = confirm("确定要这么狠心删除吗!");
				if (sure==true){
					let id = this.peoplelist[index].id
//					console.log(id)
					this.$axios.delete("http://localhost:3001/peoplelist/"+id).then( res => {
						console.log("删除成功")
						this.getList()
					}).catch((err) => {
						console.log("失败")
					})
				}
				else{
					return false;
				}
//				this.peoplelist.splice(index , 1)
			},
			edit(index){
				this.peoplelist[index].edit = true;
//				console.log(this.peoplelist)
			},
			okNo(index){
				let data = this.peoplelist[index]
//				console.log(data)
//				console.log(data.id)
				this.$axios.patch("http://localhost:3001/peoplelist/"+data.id,data).then( res => {
					this.getList()
//					console.log(res)
//					this.getList()
				}).catch((err) => {
					console.log("失败")
				})
				this.peoplelist[index].edit = false;
			},
			getList(){
				this.$axios.get("http://localhost:3001/peoplelist").then( res => {
//				 	this.peoplelist=res.data
//				   	console.log(this.peoplelist)
				   	var a = res.data
					var b = []
				   	var len = res.data.length-1
					for( var i=0; i<=len ;i++){
//						console.log(a[len-i])
						b.push(a[len-i])
//						console.log(b)
					}
//					console.log(b)
					this.peoplelist = b
				}).catch((err) => {
					console.log("失败")
				})
				
			}
		}
	}
</script>

<style>
	.table{
		width: 100%; height: auto;
	}
	.block{
		display: block;
	}
	.none{
		display: none;
	}
	dl{
		margin-bottom: 50px;
	}
	dl dt,dl dd{
		width: 100%; height: 50px; line-height: 50px; display: flex; justify-content: space-between; text-align: center;
		
	}
	dl dt p{
		justify-content: center;
	}
	dl dt p,dl dd p{
		flex: 1; display: inline-flex;
	}
	dl dt p label,dl dd p label{
		display: block; width: 80px;
	}
	dl dt p span,dl dd p span{
		display: block; flex: 1; cursor: pointer;
	}
	dl dt p input,dl dd p input{
		display: none; flex: 1;
	}
	.add{
		width: 660px; margin: 0 auto;
	}
	.add ul{
		display: flex;
	}
	.add ul li{
		height: 30px; line-height: 30px; display: inline-flex;
	}
</style>