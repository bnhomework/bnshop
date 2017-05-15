<template>
    <div class="product-detail" v-loading="loading">
        <div class="left">
            <section class="preview">
            <product-image-viewer :imgs="productImages"></product-image-viewer>
            </section>
            <section class="description">
            	<article>
            		<h1>Product Details</h1>
            		<h3>Description</h3>
            		<ul v-for="(d,i) in product.descriptions">
            			<li>{{d}}</li>
            		</ul>
            	</article>
            </section>
        </div>
        <div class="right">
            <section class="price table">
            	<h3>Price</h3>
        		{{product.pid}}|{{product.description}}</section>
            <section class="actions"></section>
        </div>
    </div>
</template>

<script>
	import productImageViewer from '@/components/imagePreView.vue'
	import _ from 'underscore'
	export default{
		data(){
			return {
				loading: false,
				pid:'',
				product:{}
			}
		},
		created(){
			this.pid=this.$route.params.pid;
			this.loadProduct(this.pid)
		},
		methods:{
			loadProduct:function(pid){
				this.loading=true;
				this.$http.post(this.$api.product.getProductById,{pid})
				.then(res => {
                    this.product = res.data
                    this.loading = false;
                });
			}
		},
		computed:{
			productImages:function(){
				if(!this.product.imgs){
					return [];
				}
				return _.pluck(this.product.imgs, 'url')
			}

		},
		components:{productImageViewer:productImageViewer}
	}
</script>
<style scoped>
	.product-detail{
		width: 100%;
		min-height: 300px;
	}
	.product-detail .left{
		float: left;
		width: 50%;
		padding: 20px
	}
	.product-detail .left .preview{
		margin: 0 auto
	}
	.product-detail .right{
		margin-left: 50%;
	}
</style>