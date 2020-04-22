import Vue from 'vue'
import Router from 'vue-router'
import Home from'@/pages/home'
import Cart from'@/pages/cart'
import Category from'@/pages/category'
import Personal from'@/pages/personal'
import Search from'@/pages/search'
import Product from'@/pages/product'

Vue.use(Router)
/*这些都是一级路由*/
const routes = [	/*路由信息一般不变，所以用const*/
	{
		name:'home',
		path:'/home',
		/*component:Home,*/
		component:()=>import('@/pages/home'),	/*实现路由的懒加载*/
		/*二级路由*/
		children:[
			{
				name:'home-product',
				path:'product/:id',	/*二级路由不能加/*/
				/*component:Product*/
				component:()=>import('@/pages/product')
			}
		]
	},
	{
		name:'cart',
		path:'/cart',
		/*component:Cart*/
		component:()=>import('@/pages/cart')
	},
	{
		name:'category',
		path:'/category',
		/*component:Category*/
		component:()=>import('@/pages/category')
	},
	{
		name:'personal',
		path:'/personal',
		/*component:Personal*/
		component:()=>import('@/pages/personal')
	},
	{
		name:'search',
		path:'/search',
		/*component:Search*/
		component:()=>import('@/pages/search')
	},{
		path:'*',	/*任意不是以上的路径*/
		redirect:'/home'	/*都重定向至/home*/
	}
];

export default new Router({
  routes	//在上面写了，ES6在这里就可以直接用，只要名字一样
})
