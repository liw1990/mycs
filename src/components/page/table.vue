<template>
	<div class="table">
		<div class="search">
			<input type="text" v-model="search_nr" @focus="search_focus()" @blur="search_blur()" @keyup.13="find_key()" :class="search_opacity ? 'opacity_10':'opacity_5'"  />
			<div class="btn_scarch" @click="find()" >搜索</div>
		</div>
		<div class="add">
			<ul>
				<li><label>姓名:</label><input type="text" v-model="people.name" /></li>
				<li><label>性别:</label><input type="text" v-model="people.sex" /></li>
				<li><label>喜欢:</label><input type="text" v-model="people.like" /></li>
				<div @click="plus()">添加</div>
			</ul>
		</div>
		<dl>
			<dt>
				<p>id</p>
				<p>姓名</p>
				<p>性别</p>
				<p>喜欢</p>
				<p>操作</p>
			</dt>
			<dd v-for="(item,index) in peoplelist" v-if="search_hide">
				<p><label>{{item.id}}</label></p>
				<p><label v-if="!item.edit">{{item.name}}</label><input type="text" v-model="item.name" :class=" item.edit ? 'block':'none'" /></p>
				<p><label v-if="!item.edit">{{item.sex}}</label><input type="text" v-model="item.sex" :class=" item.edit ? 'block':'none'" /></p>
				<p><label v-if="!item.edit" @click="addLike(index)">{{item.like}}</label><input type="text" v-model="item.like" :class=" item.edit ? 'block':'none'" /></p>
				<p><span @click="edit(index)" v-if="!item.edit">编辑</span><span @click="okNo(index)" :class=" item.edit ? 'block':'none'">确定</span><span @click="del(index)">删除</span></p>
			</dd>
			<dd v-for="(item,index) in searchlist">
				<p><label>{{item.id}}</label></p>
				<p><label v-if="!item.edit">{{item.name}}</label><input type="text" v-model="item.name" :class=" item.edit ? 'block':'none'" /></p>
				<p><label v-if="!item.edit">{{item.sex}}</label><input type="text" v-model="item.sex" :class=" item.edit ? 'block':'none'" /></p>
				<p><label v-if="!item.edit" @click="addLike(index)">{{item.like}}</label><input type="text" v-model="item.like" :class=" item.edit ? 'block':'none'" /></p>
				<p><span @click="search_edit(index)" v-if="!item.edit">编辑</span><span @click="search_okNo(index)" :class=" item.edit ? 'block':'none'">确定</span><span @click="search_del(index)">删除</span></p>
			</dd>
		</dl>
	</div>
</template>
<script>
	export default {
		data (){
			return {
				peoplelist:{},
				search_nr:"请输入您想查询的内容",
				searchlist:{},
				search_hide: true,
				search_opacity: false,
				people :{
					"id" : 0,
					"name" : "",
					"sex" : "",
					"like" : 0,
					"edit": false
				}
			}
		},
		mounted () {
			this.getList()	
		},
		methods : {
			//数据添加
			plus(){
				var length = this.peoplelist.length //获取列表长度
				var t = 0;
				if(length==0){
					this.people.id = 1 
				}
				for(var i=0; i<length;i++){
					if(t<this.peoplelist[i].id){
						t = this.peoplelist[i].id
					}
					this.people.id = t +1 //获取最大id并设置新添加项id
				}	
//				this.peoplelist.push(this.people);//添加新项
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
				this.people ={"id" : 0,"name" : "","sex" : "","like" : 0,"edit":false} //重置新项
			},
			//搜索框的焦点事件
			search_focus(){
				if(this.search_nr==="请输入您想查询的内容"){
					this.search_opacity = true
					this.search_nr = ""
				}
			},
			//搜索框的焦点离开事件
			search_blur(){
				if(this.search_nr===""){
					this.search_opacity = false
					this.search_nr = "请输入您想查询的内容"
				}				
			},
			//删除数据
			del(index) {
				let sure = confirm("确定要这么狠心删除吗!");
				if (sure==true){
					let id = this.peoplelist[index].id
					console.log(id)
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
			//搜索后删除数据
			search_del(index) {
				var sure = confirm("确定要这么狠心删除吗!");
				if (sure==true){
					let id = this.searchlist[index].id
					this.searchlist.splice(index , 1)
					console.log(id)
					this.$axios.delete("http://localhost:3001/peoplelist/"+id).then( res => {
						this.getList()
						console.log("删除成功")
					}).catch((err) => {
						console.log("失败")
					})
				}
				else{
					return false;
				}
				
			},
			//编辑数据
			edit(index){
				this.peoplelist[index].edit = true;
//				console.log(this.peoplelist)
			},
			//搜索后编辑数据
			search_edit(index){
				this.searchlist[index].edit = true;
			},
			//确定是否编辑数据
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
			//搜索后确定是否编辑数据
			search_okNo(index){
				let data = this.searchlist[index]
//				console.log(data)
//				console.log(data.id)
				this.$axios.patch("http://localhost:3001/peoplelist/"+data.id,data).then( res => {
					this.getList()
					this.find()
//					console.log(res)
//					this.getList()
				}).catch((err) => {
					console.log("失败")
				})
				this.searchlist[index].edit = false;
			},
			//搜索
			find(){
				this.search_hide = false; //是否隐藏原始列表
				var search_nr = this.search_nr;
		        if (search_nr) {
		        	if(search_nr==="请输入您想查询的内容"){
//		        		console.log(search_nr)
		        		this.searchlist = this.peoplelist
		        	}else{
			        	this.searchlist = this.peoplelist.filter( (v)=> {
				          // 每一项数据
	//			           console.log(v)
				            return Object.keys(v).some((key)=> {
				            // 每一项数据的参数名
	//			                console.log(key)
					            return (
					                String(v[key])
					                // toLowerCase() 方法用于把字符串转换为小写。
					                .toLowerCase()
					                // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
					                .indexOf(search_nr) > -1
					            );
				            });
				        });
		        	}
		        }else if(search_nr.length===0){
//		        	console.log(search_nr)
		        	this.searchlist = this.peoplelist
		        }else{
		        	return this.searchlist
		        }
			},
			//键盘回车键搜索
			find_key(){
				this.find()
			},
			//添加喜欢
			addLike(index){
				this.peoplelist[index].like ++
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
			},
			//搜索后添加喜欢
			search_addLike(index){
				this.searchlist[index].like ++
				let data = this.searchlist[index]
//				console.log(data)
//				console.log(data.id)
				this.$axios.patch("http://localhost:3001/searchlist/"+data.id,data).then( res => {
					this.getList()
//					console.log(res)
//					this.getList()
				}).catch((err) => {
					console.log("失败")
				})
			},
			//获取列表
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
	.opacity_10{
		opacity: 1;
	}
	.opacity_5{
		opacity: 0.5;
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
	.search{
		width: 660px; margin: 0 auto; display: flex; margin-bottom: 25px; border:1px solid #333;
	}
	.search input{
		display: block; width: 500px; height: 30px; font-size: 18px; border:none;
	}
	.search .btn_scarch{
		flex: 1; background: #000; color: #fff; text-align: center; line-height: 30px;
	}
	.add{
		width: 660px; margin: 0 auto; margin-bottom: 25px;
	}
	.add ul{
		display: flex;
	}
	.add ul li{
		height: 30px; line-height: 30px; display: inline-flex;
	}
</style>