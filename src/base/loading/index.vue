<template>
	<div class="mine-loading" :class="{'mine-loading-inline':inline}"><!-- 有没有这个class取决于inline -->
		<span class="mine-loading-indicator" v-if="indicator==='on'">
			<slot><img src="./loading.gif"></slot>
		</span>	<!-- indicator为on时才渲染-->
		<span class="mine-loading-text" v-if="loadingText">{{loadingText}}</span>
	</div>
</template>
<script>
	//暴露接口使得外部可以引用到它
	export default{
		name: 'MeLoading',
		/*接收父组件传来的参数*/
		props:{
			indicator:{
				type:String,
				default:'on',
				validator(value){
					return ['on','off'].indexOf(value)>-1;	/*只允许on和off两种输入*/
				}
			},
			text:{
				type:String,
				default:'加载中……'
			},
			inline:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			setText(text){
				this.loadingText=text;
			}
		},
		data(){
			return {
				loadingText:this.text
			}
		},
		watch:{
			text(text){/*发生变化时执行*/
				this.loadingText=text;
			}
		}
	}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
.mine-loading{
	overflow:hidden;
	width:100%;
	height:100%;
	@include flex-center(column);
	&.mine-loading-inline{
		flex-direction:row;
		.mine-loading-indicator ~ .mine-loading-text{
		margin-top:0px;
		margin-left:6px;
		}
	}
}
.mine-loading-indicator ~ .mine-loading-text{
	margin-top:6px;
}
</style>