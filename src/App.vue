<template>
  <!-- g开头说明这些都是全局样式，我们可以在_containers.scss中写样式，就可以全局引用 -->
  <div id="app" class="g-container">
    <div class="g-view-container">
      <!-- 所有一级路由都在这里切换 -->
      <router-view></router-view>
      
    </div>
    <div class="g-footer-container">
      <c-tabbar/><!-- 如果里面 没有内容可以自己关闭自己 -->
    </div>
  </div>
</template>

<script>
  import CTabbar from '@/components/tabbar/'
export default {
  name: 'App',
  components:{
    CTabbar  //子组件的接口中给自己起了名字，这里就可以直接用名字了
  }
}
</script>

