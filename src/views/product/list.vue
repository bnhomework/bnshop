<template>
    <div class="dashboard" v-loading="loading" style="min-height: 400px">
        <el-row :gutter="40">
            <el-col ::xs="8" :sm="6" :md="6" :lg="4" v-for="(o, index) in dateInGrid" :key="o">
                <el-card class="productcard">
                    <router-link :to="{name:'viewproduct',params:{pid:o.pid}}">
                        <div style="text-align:center">
                            <img :src="o.pic" class="image">
                        </div>
                        <div class="summary">
                            <p class="title">
                                {{o.name}}
                            </p>
                            <div class="price">
                                {{ o.price }}
                            </div>
                        </div>
                    </router-link>
                </el-card>
            </el-col>
        </el-row>
        <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[50, 100]" :page-size="pagesize" layout="total, sizes,->, prev, pager, next, jumper" :total="tableData.length">
        </el-pagination> -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[24,50, 100]" :page-size="pagesize" layout="total, ->, prev, pager, next, jumper" :total="tableData.length">
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
    height: 70px;
}

.productcard .price {
    height: 30px;
    text-align: right;
    font-weight: bold;
    color: #333333;
    font-size: 12px;
    padding: 2px 2px;
}

.productcard .summary {
    height: 100px;
    max-height: 100px;
}
</style>

