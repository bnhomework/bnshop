<template>
    <div class="dashboard" v-loading="loading" style="min-height: 400px">
        <el-row :gutter="10">
            <el-col ::xs="8" :sm="6" :md="6" :lg="4" v-for="(o, index) in dateInGrid" :key="o">
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
        <el-pagination v-if="tableData.length>0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[24,50, 100]" :page-size="pagesize" layout="total, ->, prev, pager, next, jumper" :total="tableData.length">
        </el-pagination>
    </div>
</template>

<script>
import _ from 'underscore';
export default {
    data() {
            return {
                loading: false,
                pagesize: 24,
                currentPage: 1,
                tableData: []
            }
        },
        created() {
            this.getProducts();
        },
        destroyed() {},
        methods: {
            getProducts: function() {
                this.loading = true;
                var url=this.$api.product.getProductByCategroy;
                var data={
                    category: this.$route.params.category
                };
                if(this.$route.name=='searchproduct'){
                    url=this.$api.product.searchProduct;
                    data={filter:this.$route.params.filter}
                }

                this.$http.post(url, data).then(res => {
                    this.tableData = res.data
                    this.loading = false;
                });
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
                this.getProducts();
            }
        }
        ,
        computed: {
            dateInGrid: function() {
                var total = this.tableData.length;
                var skip = this.pagesize * (this.currentPage - 1) || 0;
                var end = skip + this.pagesize;
                return this.tableData.slice(skip, end);
            }
        }

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

