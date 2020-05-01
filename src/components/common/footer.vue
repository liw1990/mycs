<template>
<footer>
	<div>{{logo}}{{count}}</div>
	<div @click="plus">加</div>
	<div @click="cut">减</div>
	<ul>
		<li v-for="item in navs" v-html="item.title"></li>
	</ul>
</footer>
</template>

<script>
	export default {
		props: ["logo","navs","count"],
		methods : {
			plus(){
				this.$emit("plus");
			},
			cut () {
				this.$emit("cut");
			}
		}
	}
</script>

<style>
</style>