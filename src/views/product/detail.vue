<template>
	<el-row :gutter="20"  v-loading="loading">
		<el-col :span="12">
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
		</el-col>
		<el-col :span="12">
			<section class="price table">
				<h3>Price</h3>
				<el-table :data="product.prices" border style="width: 100%">
					<el-table-column type="index"></el-table-column>
					<el-table-column prop="moq" label="MOQ" width="180" align="right"></el-table-column>
					<el-table-column prop="amount" label="Amount($)" align="right"></el-table-column>
				</el-table>
			</section>
			<section class="actions"></section>
		</el-col>
	</el-row>
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

</style>