<template>
	<header>
		<!--<div class="header_top">
			<div class="header_top_"></div>
		</div>
		<div class="header_bot">
			<div class="header_bot_"></div>
		</div>-->
		<ul>
			<li v-for="nav in navs">
				{{nav.title}}
			</li>
		</ul>
		<input type="button" :value="count" @click="count +=1" />
		<input v-on:keydown.enter="count +=1" :value="count" >
		<input type="button" @click.once="say('hi')" value="say hi" />
		<input type="button" @click="say('no')" value="say no" />
		
		<input v-on:keyup.enter="say('zhe shi enterout')">
		<input v-on:keyup.up="say('zhe shi up')">
		<input v-on:keyup.down="say('zhe shi down')">
		<input v-on:keyup.left="say('zhe shi left')">
		<input v-on:keyup.right="say('zhe shi right')">
		
		<!--<div class="dianji" @click="say('这是父级')"><p @click.stop="say('这是子级')">阻止冒泡事件</p></div>
		<form @submit.prevent="onSubmit">
			<input type="text" value="姓名" />
			<input type="password" value="密码" />
			<input type="submit" value="提交" @click="onSubmit" />
		</form>
		<input type="text" v-model="dis" />
		<p @click="tc">{{dis}}</p>-->
	</header>
</template>

<script>
	export default {
		data(){
			return {
				logo:".",
				dis:"这是一个头部文件,请认真看",
				navs:[
					{"title":"首页","url":"http://www.baidu.com","list":[]},
					{"title":"医院环境","url":"#2","list":[]},
					{"title":"来院简介","url":"#1","list":[{"title":"医院简介1"},{"title":"医院简介2"}]},
					{"title":"医院地址","url":"#3","list":[]},
				],
				count:0,
			}
		},
		methods: {
			say(message) {
		    	console.log(message)
		    },
		    tc(){
			   	var a = 1
			   	var b = 2
			   	var c = 3
			   	alert(a+b*c)
		   	}
			
		}
	}
</script>

<style>
	
</style>