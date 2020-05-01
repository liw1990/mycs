<template>
  <div id="app">
  	<v-header></v-header>
  	<div v-html="count" @click="count += 1"></div>
  	<!--<youxi></youxi>-->
  	<v-table></v-table>
  	<!--<v-footer :logo="logo" :navs="navs" :count="count" @plus="pluscount" @cut="cutcount" @func="getMsgFormSon" ></v-footer>-->
    
  </div>
</template>

<script>

import header from './components/common/header'
import footer from './components/common/footer'
//import youxi from './components/common/youxi'
import table from './components/page/table'

export default {
  name: 'app',
  components: {
    'v-header':header,
    'v-footer':footer,
//  'youxi':youxi,
    'v-table':table,
    
  },
  data(){
  	return {
  		logo:".",
			dis:"这是一个头部文件,请认真看",
			count:6,
			navs:[
				{"title":"首页","url":"http://www.baidu.com","list":[]},
				{"title":"医院环境","url":"#2","list":[]},
				{"title":"来院简介","url":"#1","list":[{"title":"医院简介1"},{"title":"医院简介2"}]},
				{"title":"医院地址","url":"#3","list":[]},
			],
  	}
  },
  methods : {
		getMsgFormSon(data){
      this.child = data
      console.log(this.child)
    },
    pluscount(){
      this.count++;
    },
    cutcount(){
      this.count--;
    }
    
  }
  
}
</script>
<style>
	#app{
		width: 750px; height: auto; margin: 0 auto;
	}
</style>
