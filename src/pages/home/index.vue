<template>
	<div class="home">
		<header class="g-header-container">
			<home-header :class="{'header-transition':isHeaderTransition}" ref="header"></home-header>
			<!-- 是否开启头部切换效果 -->
		</header>
		<me-scroll :data="recommends" pullDown 
		@pull-down="pullToRefresh" 
		@pull-up="pullToLoadMore" 
		@scroll="scroll" 
		@scroll-end="scrollEnd" 
		@pull-down-transition-end="pullDownTransitionEnd"
		ref="scroll">	<!-- 把recommends传出去 -->
			<!-- 以下内容被填到slot插槽中 -->
			<home-slider ref="slider"/>
			<home-nav></home-nav>
			<home-recommend @loaded="getRecommends" ref="recommend"></home-recommend><!-- 接收子组件发来的loaded事件 -->
		</me-scroll>
			
		<div class="g-backtop-container">
			<me-backtop :visible="isBacktopVisible" @backtop="backToTop"></me-backtop>
		</div>
		<!-- home下的二级路由在这里切换 -->
		<router-view></router-view>
	</div>
</template>
<script>
	import HomeHeader from './header'	/*引入同一目录下的header组件*/
	import HomeSlider from './slider'	/*引入同一目录下的slider组件*/
	import MeScroll from '@/base/scroll'
	import HomeNav from './nav'
	import HomeRecommend from './recommend'
	import MeBacktop from '@/base/backtop'
	import {HEADER_TRANSITION_HEIGHT} from './config'
	//暴露接口使得外部可以引用到它
	export default{
		name: 'Home',
		components:{
			HomeHeader,	//不起别名就直接注册
			HomeSlider,
			MeScroll,
			HomeNav,
			HomeRecommend,
			MeBacktop
		},
		data(){
			return{
				recommends:[],
				isBacktopVisible:false,
				isHeaderTransition:false
			};
		},
		created(){
			setTimeout(()=>{
				this.isBacktopVisible=true;
			},1000);
		},
		methods:{
			updateScroll(){

			},
			getRecommends(recommends){
				this.recommends = recommends;
			},
			pullToRefresh(end){
				this.$refs.slider.update().then(end);
/*				setTimeout(()=>{
					console.log('下拉刷新');
					end();
				},1000)*/
			},
			pullToLoadMore(end){
				this.$refs.recommend.update().then(end).catch(err=>{
					/*没有更多怎么做*/
					if(err){
						console.log(err);
					}
					end();
					//处理没有更多数据的情况
					//禁止继续加载更多数据
					//替换上拉时的loading，改为没有更多数据了
				});
/*				setTimeout(()=>{
					console.log('下拉刷新');
					end();
				},1000)*/
			},
			scroll(translate){	/*只有手拖动时触发*/
				this.changeHeaderStatus(translate);
			},
			scrollEnd(translate,scroll,pulling){
				if(!pulling){	/*不在加载时才执行*/
					this.changeHeaderStatus(translate);	/*拖动完还要改*/
				}
				/*一屏高度内不显示返回顶部按钮*/
				this.isBacktopVisible=translate<0&&-translate>scroll.height;
				
			},
			pullDownTransitionEnd(){
				this.$refs.header.show();
			},
			backToTop(){
				this.$refs.scroll&&this.$refs.scroll.scrollToTop();
			},
			changeHeaderStatus(translate){	/*滚动条滚过的距离*/
				if(translate>0){	/*正在上拉*/
					this.$refs.header.hide();
					return;
				}
				this.$refs.header.show();
				this.isHeaderTransition=-translate>HEADER_TRANSITION_HEIGHT;
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "~@/assets/scss/mixins";
	.home{
		overflow:hidden;
		width:100%;
		height:100%;
		background-color:$bgc-theme;
	}
</style>