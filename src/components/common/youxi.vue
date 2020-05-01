<template>
	<div class="youxi">
		<div class="mubiao" :style="left" @click="cgleft()"></div>
	</div>
</template>

<script>
	export default {
		name:'youxi',
		data(){
			return {
				youwin:'恭喜您成功了',
				left:{"left":10,"top":10}
			}
		},
		computed:{
			
		},
//		mounted(){
//			setInterval(cgleft,3000)
//		},
		methods:{
			cgleft(){
				var left = Math.round(Math.random()*480/10)*10
				var top = Math.round(Math.random()*580/10)*10
				console.log(left)
				this.left.left=left+"px"
				this.left.top=top+"px"
				console.log(this.left.left)
			},			
		}
	}
</script>

<style>
	.youxi{
		width: 500px; height: 600px; margin: 0 auto; background: #333; position: relative;
	}
	.youxi .mubiao{
		position: absolute; left: 50px; top: 50px; width: 20px; height: 20px; background: #fff;
	}
</style>