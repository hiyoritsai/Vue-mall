import axios from 'axios'
import jsonp from '@/assets/js/jsonp'
import {SUCC_CODE} from './config'	/*引入同一目录下的config.js文件中的SUCC_CODE*/
import {TIMEOUT} from './config'	/*引入同一目录下的config.js文件中的TIMEOUT*/
import {HOME_RECOMMEND_PAGE_SIZE} from './config'
//打乱数组顺序
const shuffle = (arr)=>{
	const arrLength=arr.length;
	let i=arrLength;
	let rndNum;
	while(i--){
		if(i!==(rndNum=Math.floor(Math.random()*arrLength))){
			[arr[i],arr[rndNum]]=[arr[rndNum],arr[i]];	//交换两个数组元素的位置，ES6解构提供的方法
		}
	}
	return arr;
}
//获取幻灯片数据——ajax
export const getHomeSlider = ()=>{
	return axios.get('http://www.imooc.com/api/home/slider',{timeout:TIMEOUT}).then(res=>{
		if(res.data.code===SUCC_CODE){
			/*模拟幻灯片更新，打乱图片顺序*/
			let sliders=res.data.slider;
			const slider=[sliders[Math.floor(Math.random()*sliders.length)]];
			sliders=shuffle(sliders.filter(()=>Math.random()>=0.5));//filter()中的函数返回真保留，返回假剔除
			if(sliders.length===0){
				sliders=slider;
			}
			return sliders;
		}
		/*如果没有成功，我们手动抛出错误*/
		throw new Error('没有成功获取到数据！');
	}).catch(err=>{/*通过catch捕获错误*/
		if(err){
			console.log(err);
		}
		return [
		{
			linkUrl:'https://www.imooc.com',
			picUrl:require('@/assets/img/404.png')
		}
		];
	}).then(data=>{
		return new Promise(resolve=>{
			setTimeout(()=>{
				resolve(data);
			},1000);
		});
	});
};
/*获取热门推荐数据*/
export const getHomeRecommend = (page=1,psize=HOME_RECOMMEND_PAGE_SIZE)=>{
	const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
	const params = {
		page,
		psize,
		type:0,
		frontCatId:''
	};
	return jsonp(url,params,{
		param:'callback'
	}).then(res=>{
		if(res.code==='200'){
			return res;
		}
		/*手动抛出异常*/
		throw new Error('没有成功获取到数据！');
	}).catch(err=>{
		if(err){
			console.log(err);
		}

	}).then(data=>{
		return new Promise(resolve=>{
			setTimeout(()=>{
				resolve(data);
			},1000);
		})
	});
}