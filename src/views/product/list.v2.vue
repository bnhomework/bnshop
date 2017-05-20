<template>
    <div class="dashboard" v-loading="loading" style="min-height: 400px">
        <el-row :gutter="10">
            <el-col ::xs="8" :sm="6" :md="6" :lg="4" v-for="(o, index) in tableData" :key="o">
                <el-card class="productcard">
                    <router-link :to="{name:'viewproduct',params:{pid:o.pid}}">
                        <div style="text-align:center">
                            <img :src="imgUrl(o)" class="image">
                        </div>
                        <div class="summary">
                            <p class="title">
                                {{o.name}}
                            </p>
                            <div class="price">
                                {{ priceToShow(o.prices) }}
                            </div>
                        </div>
                    </router-link>
                </el-card>
            </el-col>
        </el-row>
        <div v-scroll-loader="getProducts" v-loading="loading" element-loading-text="Loading More ..."><label v-if="isScrollNoMore">No more products</label></div>
    </div>
</template>

<script>
import _ from 'underscore';
import scrollLoader from '@/directives/scrollLoader'
export default {
    data() {
            return {
                loading: false,
                pagesize: 18,
                currentPage: 1,
                tableData: [],
                isScrollLoading:false,
                isScrollNoMore:false
            }
        },
        created() {
            this.init();
        },
        destroyed() {},
        methods: {
            init:function(){

                this.isScrollLoading=false;
                this.isScrollNoMore=false;
                this.tableData=[]             
                this.getProducts();
            },
            getProducts: function() {
                this.loading = true;
                var url=this.$api.product.getProductByCategroy;
                var data={
                    skip:this.tableData.length,
                    limit:this.pagesize
                };
                if(this.$route.name=='searchproduct'){
                    url=this.$api.product.searchProduct;
                    data.filter=this.$route.params.filter
                }else{
                    data.category= this.$route.params.category
                }

                this.$http.post(url, data).then(res => {
                    var vm=this;
                    if(res.data.length==0){
                        // this.$set("isScrollNoMore",true);
                        this.isScrollNoMore=true;
                    }else{
                    _.each(res.data,function(x){vm.tableData.push(x)})

                }
                    this.loading = false;
                    this.isScrollLoading=false;
                });
            },
            loadMore:function(){

            },
            gotoDetail:function(pid){
            	this.$router.push({
                    name: 'viewproduct',
                    params: {
                        pid: pid
                    }
                })
            },
            handleSizeChange(val) {
                this.pagesize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            imgUrl:function(p){
                if(p.imgs&&p.imgs.length>0){
                    return this.$appSetting.imgServer+p.imgs[0].path
                }
                return''
            },
            priceToShow:function(p){
                var minPrice=_.min(p, function(x){ return x.amount; });;
                var maxPrice=_.max(p, function(x){ return x.amount; });;
                return "Prices from $"+minPrice.amount+" to $"+maxPrice.amount
            }
        },
        watch:{
            $route:function(){
                this.init();
            }
        }
       ,
        directives:{scrollLoader:scrollLoader}

}
</script>
<style scoped>
.productcard {
    margin-bottom: 20px
}

.productcard a {
    text-decoration: none;
}

.productcard img {
    height: 150px;
    width: 150px;
}

.productcard .title {
    color: #2c2c2c;
    max-height: 70px;
}

.productcard .price {
    max-height: 30px;
    /*text-align: right;*/
    /*font-weight: bold;*/
    color: #333333;
    font-size: 12px;
    padding: 2px 2px;
}

.productcard .summary {
    height: 100px;
    max-height: 100px;
}
.productcard.el-card:hover {
    border: 1px solid #dddddd;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,.42), 0 0 6px 0 rgba(0,0,0,.14);
}
</style>

