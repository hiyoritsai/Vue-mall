<template>
	<swiper :options="swiperOption" :key="keyId" class="swiper-container">	
	<!-- options设置幻灯片的样式，与swiperOption变量绑定 -->
	<!--<swiper-slide v-for="item in sliders">
			<a href="">
				<img src="">
			</a>
		</swiper-slide> -->

		<!-- 上述结构不利于复用，这里直接用slot插槽，由父组件提供此处的内容 -->
		<slot></slot>

		<!-- 分页器就是幻灯片下面的小圆点，如果pagination为true，就会有这个div -->
		<div class="swiper-pagination" v-if="pagination" slot="pagination"></div>

	</swiper>
</template>
<script>
	//引用vue-awesome-swiper模块中的swiper和swiperSlide，需要注册
	import {swiper} from 'vue-awesome-swiper'
	import 'swiper/dist/css/swiper.css'
	//暴露接口使得外部可以引用到它
	export default{
		name: 'MeSlider',
		components:{
			swiper
		},
		/*父组件传来的数据*/
		props:{
			/*轮播方向*/
			direction:{
				type:String,
				default:'horizontal',
				/*只允许传两种值horizontal和vertical，所以要做验证*/
				validator(value){/*value是PropValue，也就是父组件传来的值*/
					return [
					'horizontal',
					'vertical'
					].indexOf(value)>-1;/*如果有在horizontal和vertical中找到一个，就返回true*/
				}
			},
			/*时间间隔*/
			interval:{
				type:Number,
				default:3000,
				validator(value){
					return value >=0;
				}
			},
			/*是否是无缝滚动*/
			loop:{
				type:Boolean,
				default:true
			},
			/*分页器*/
			pagination:{
				type:Boolean,
				default:true
			},
			data:{
				type:Array,
				default(){
					return [];	/*数组和对象这种引用类型要通过函数的方式返回*/
				}
			}
		},
		data(){
			return{
				keyId:Math.random(),
			};
		},
		watch:{
			/*data发生变化就修改keyId*/
			data(newData){
				/*进行边界判断*/
				if(newData.length===0){
					return;
				}
				/*每次刷新都要修改loop值*/
				this.swiperOption.loop=newData.length===1?false:this.loop;
				this.keyId=Math.random();
			}
		},
		created(){
			this.init();
		},
		methods:{
			init(){
					this.swiperOption={
					watchOverflow:true,	//只有一个slide，swiper会失效
					direction:this.direction,//direction就是我们父组件传过来的
					autoplay:this.interval?{//如果父组件传来了interval，那么就给autoplay的delay属性设为interval
						delay:this.interval,
						disableOnInteraction:false	//触碰后幻灯片不会停止切换，为true就是触碰过一次就再也不动了
					}:false,
					slidesPerView:1,
					loop:this.data.length<=1?false:this.loop,	//只有一张图片的时候不开启无限循环
					pagination:{
						el:this.pagination?'.swiper-pagination':null,/*el选择应用pagination的容器*/
						clickable:true
					}
				};
			}
		}
	}
</script>
<style lang="scss" scoped>
	.swiper-container{
		height:100%;
		width:100%;
	}
</style>