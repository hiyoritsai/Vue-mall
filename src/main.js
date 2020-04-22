// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
/*引入index.scss*/
import './assets/scss/index.scss'
import 'babel-polyfill'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import 'swiper/dist/css/swiper.css'
fastclick.attach(document.body);
Vue.config.productionTip = false
Vue.use(VueLazyload,{
	preLoad:1,	/*还差多少就开始加载，1是完全显示加载，1.几是还没到就开始加载*/
	error:require('@/assets/img/error.png'),	/*失败显示图*/
	loading:require('@/assets/img/loading.gif'),	/*加载显示图*/
	attemp:1	/*尝试次数*/
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
