<template>
	<swiper :options="swiperOption" ref="swiper">
		<div class="mine-scroll-pull-down" v-if="pullDown">
			<me-loading :text="pullDownText" inline ref="pullDownLoading"></me-loading>
		</div>
		<swiper-slide>
			<slot></slot><!-- 所有可以滚动的内容都在swiperslide里，所以我们在这里用slot插槽放要滚动的内容 -->
		</swiper-slide>
		<div class="mine-scroll-pull-up" v-if="pullUp">
			<me-loading :text="pullUpText" inline ref="pullUpLoading"></me-loading>
		</div>
		<div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div><!-- 是否有滚动条根据v-if -->
	</swiper>
</template>
<script>
	import {swiper,swiperSlide} from 'vue-awesome-swiper'
	import MeLoading from '@/base/loading'
	import {
		PULL_DOWN_HEIGHT,
		PULL_DOWN_TEXT_INIT,
		PULL_DOWN_TEXT_START,
		PULL_DOWN_TEXT_ING,
		PULL_DOWN_TEXT_END,
		PULL_UP_HEIGHT,
		PULL_UP_TEXT_INIT,
		PULL_UP_TEXT_START,
		PULL_UP_TEXT_ING,
		PULL_UP_TEXT_END,
	} from './config'
	//暴露接口使得外部可以引用到它
	export default{
		name: 'MeScroll',
		components:{
			swiper,swiperSlide,MeLoading
		},
		/*获取从父组件传来的参数*/
		props:{
			scrollbar:{
				type:Boolean,
				default:true
			},
			data:{
				type:[Array,Object]
			},
			pullDown:{
				type:Boolean,
				default:false
			},
			pullUp:{
				type:Boolean,
				default:false
			}
		},
		created(){
			this.init();
		},

			watch:{
				data(){
					this.update();
				}
			},
			methods:{
				/*供外部调用的API*/
				update(){
					this.$refs.swiper && this.$refs.swiper.swiper.update();
				},
				/*内部自己使用的*/
				scrollToTop(speed,runCallbacks){
					this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0,speed,runCallbacks);
					/*slideTo返回到第几个幻灯片，这里我们只有一个幻灯片*/
				},
				init(){
					this.pulling=false;
					this.pullDownText=PULL_DOWN_TEXT_INIT;
					this.pullUpText=PULL_UP_TEXT_INIT;
					this.swiperOption={
						direction:'vertical',
						slidesPerView:'auto',
						freeMode:true,
						setWrapperSize:true,
						scrollbar:{
							el:this.scrollbar?'.swiper-scrollbar':null,
							hide:true	/*是否自动隐藏*/
						},
						on:{
						/*滑动*/
						sliderMove:this.scroll,
						touchEnd:this.touchEnd,
						transitionEnd:this.scrollEnd
						}
					};
				},
				scroll(){
					const swiper = this.$refs.swiper.swiper;

					this.$emit('scroll',swiper.translate,this.$refs.swiper.swiper);

					if(this.pulling){	/*如果正在拉就直接返回*/
						return;
					}
					/*如果没有正在拉*/
					if(swiper.translate>0){	/*下拉*/
						if(!this.pullDown){	/*判断用户是否需要下拉，不需要就直接返回*/
							return;
						}
						if(swiper.translate>PULL_DOWN_HEIGHT){/*若大于文本高度*/
							this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
						}else{
							this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT);
						}
					}
					else if(swiper.isEnd){
						if(!this.pullUp){
							return;
						}
						const isPullUp=Math.abs(swiper.translate)+swiper.height-PULL_UP_HEIGHT>parseInt(swiper.$wrapperEl.css('height'));
						if(isPullUp){
							this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START);
						}else{
							this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT);
						}
					}
				},
				scrollEnd(){
					this.$emit('scroll-end',this.$refs.swiper.swiper.translate,this.$refs.swiper.swiper,this.pulling);

				},
				touchEnd(){
					if(this.pulling){	/*如果正在拉就直接返回*/
						return;
					}
					const swiper = this.$refs.swiper.swiper;
					/*判断是否超过限定高度*/
					if(swiper.translate > PULL_DOWN_HEIGHT){
						if(!this.pullDown){	/*判断用户是否需要下拉，不需要就直接返回*/
							return;
						}
						this.pulling=true;	//设为正在拉
						swiper.allowTouchMove=false;	//禁止触摸
						swiper.setTransition(swiper.params.speed);
						swiper.setTranslate(PULL_DOWN_HEIGHT);
						swiper.params.virtualTranslate=true;	//定住不给回弹
						this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING);
						this.$emit('pull-down',this.pullDownEnd);	//基础组件与业务无关，应该在父组件中去处理具体事件，这里只要发送信号即可，然后执行一个函数重置一下参数
					}else if(swiper.isEnd){
						const totalHeight=parseInt(swiper.$wrapperEl.css('height'));
						const isPullUp=Math.abs(swiper.translate)+swiper.height-PULL_UP_HEIGHT>totalHeight;
						if(isPullUp){
							if(!this.pullUp){
								return;
							}
							this.pulling=true;
							swiper.allowTouchMove=false;	//禁止触摸
							swiper.setTransition(swiper.params.speed);
							swiper.setTranslate(-(totalHeight+PULL_UP_HEIGHT-swiper.height));	//回弹
							swiper.params.virtualTranslate=true;	//定住不给回弹
							this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING);
							this.$emit('pull-up',this.pullUpEnd);	//基础组件与业务无关，应该在父组件中去处理具体事件，这里只要发送信号即可，然后执行一个函数重置一下参数
						}
					}

				},
				pullDownEnd(){
					const swiper = this.$refs.swiper.swiper;
					this.pulling=false;	//设为假，以便进行下一次拉动
					this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END);
					swiper.params.virtualTranslate = false;
					swiper.allowTouchMove = true;
					swiper.setTransition(swiper.params.speed);	//为了回弹
					swiper.setTranslate(0);	//为了回弹
					setTimeout(()=>{
						this.$emit('pull-down-transition-end');
					},swiper.params.speed);
				},
				pullUpEnd(){
					const swiper = this.$refs.swiper.swiper;
					this.pulling=false;	//设为假，以便进行下一次拉动
					this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END);
					swiper.params.virtualTranslate = false;
					swiper.allowTouchMove = true;
				}
			}
	};
</script>
<style lang="scss" scoped>
 .swiper-container {
    overflow: hidden;
    width: 100%;
    height: 100%;
  };

  .swiper-slide {
    height: auto;
  }
  .mine-scroll-pull-up,
  .mine-scroll-pull-down {
    position: absolute;
    left: 0;
    width: 100%;
  }
  .mine-scroll-pull-down {
    bottom: 100%;
    height: 80px;
  }

  .mine-scroll-pull-up {
    top: 100%;
    height: 30px;
  }
</style>