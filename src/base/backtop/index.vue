<template>
  <transition name="mine-backtop"><!-- 显示对应进入，隐藏对应离开 -->
    <a
      href=""
      class="mine-backtop"
      v-show="visible"
      @click="backToTop" >
      <i class="iconfont icon-backtop"></i>
    </a>
  </transition>
</template>

<script>
  export default {
    name: 'MeBacktop',
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      backToTop() {
        this.$emit('backtop');	/*基础组件，与业务无关，具体做什么交给父组件，这里只要发送一个信号即可*/
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/mixins";

  .mine-backtop {
    overflow: hidden;
    @include flex-center();
    width: 45px;
    height: 45px;
    background-color: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 50%;

    .iconfont {
      color: #fff;
      font-size: 38px;
    }
  }

  .mine-backtop {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.4s;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }
</style>
