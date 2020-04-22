<!-- 这是Home页面下的一个组件Header -->
<template>
		<me-navbar class="header" title="title" v-show="visible">
			<i class="iconfont icon-scan" slot="left"></i>	<!-- 会替换子组件中name为left的插槽的内容 -->
			<div slot="center">搜索框</div>	<!-- 会替换子组件中name为center的插槽的内容 -->
			<i class="iconfont icon-msg" slot="right"></i>
		</me-navbar>
</template>
<script>
	//把base目录下的MeNavbar引入进来
	import MeNavbar from '@/base/navbar'
	//暴露接口使得外部可以引用到它
	export default{
		name: 'HomeHeader',
		components:{
			MeNavbar
		},
		data(){
			return{
				visible:false	/*自己控制自己的显示或隐藏*/
			}
		},
		methods:{
			show(){
				this.visible=true;
			},
			hide(){
				this.visible=false;
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "~@/assets/scss/mixins";
  .header {
    &.mine-navbar {
      background-color: transparent;
      transition: background-color 0.5s;
    }
    &.header-transition {
      background-color: $header-bgc-translucent;
    }

    .iconfont {
      color:$icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>