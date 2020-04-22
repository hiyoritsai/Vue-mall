<template>
	<div class="product">
		product
	</div>
</template>
<script>
	//暴露接口使得外部可以引用到它
	export default{
		name: 'Product'
	}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
 .product {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: $product-z-index;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;
  }
</style>