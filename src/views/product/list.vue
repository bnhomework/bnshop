<template>
    <div id="product-main">
        <div id="products-category">
        <sidemenu :menu="category" :defaultitem="selectedCategory"></sidemenu>
        </div>
        <div id="products">
            <!-- <div class="full-tabs">
                <ul class="shot-menu full-tabs-links">
                    <li class="more active"><a href="/shots">Popular</a>
                        <ul class="sub">
                            <li><a href="/shots?sort=recent">Recent</a></li>
                            <li><a href="/shots?sort=views">Most Viewed</a></li>
                            <li><a href="/shots?sort=comments">Most Commented</a></li>
                        </ul>
                    </li>
                    <li class="more active"><a href="/shots">Shots</a>
                        <ul class="sub">
                            <li><a href="/shots?list=debuts">Debuts</a></li>
                            <li><a href="/shots?list=teams">Team Shots</a></li>
                            <li><a href="/shots?list=playoffs">Playoffs</a></li>
                            <li><a href="/shots?list=rebounds">Rebounds</a></li>
                            <li><a href="/shots?list=animated">Animated GIFs</a></li>
                            <li><a href="/shots?list=attachments">Shots with Attachments</a></li>
                        </ul>
                    </li>
                    <li class="more active"><a href="/shots">Now</a>
                        <ul class="sub">
                            <li><a href="/shots?timeframe=week">This Past Week</a></li>
                            <li><a href="/shots?timeframe=month">This Past Month</a></li>
                            <li><a href="/shots?timeframe=year">This Past Year</a></li>
                            <li><a href="/shots?timeframe=ever">All Time</a></li>
                        </ul>
                    </li>
                </ul>
            </div> -->
            <el-row :gutter="10">
                <el-col ::xs="12" :sm="8" :md="6" :lg="4" v-for="(o, index) in tableData" :key="o">
                    <list-item :product="o"></list-item>
                </el-col>
            </el-row>
            <div class="loading-more" v-scroll-loader="getProducts" v-loading="loading" element-loading-text="Loading More ...">
                <label v-if="isScrollNoMore">No more products</label>
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'underscore';
import scrollLoader from '@/directives/scrollLoader'
import listItem from '@/views/product/listItem.vue'
import sidemenu from '@/components/sidemenu.vue'
export default {
    data() {
            return {
                loading: false,
                pagesize: 18,
                currentPage: 1,
                tableData: [],
                isScrollLoading: false,
                isScrollNoMore: false,
                category:[],
                selectedCategory:''
            }
        },
        created() {
            this.init();
            var category=this.$appSetting.categories

          var mlist=[];
          var length=category.length;
          mlist.push({title:'All Products',url:'/products'})
          for (var i =  0; i <length; i++) {
            var c=category[i]
            var m={};
            m.title=c.t;
            m.active=false;
            m.url='/products/'+m.title;
            if(c.st){
              m.items=[];
              for (var j =  0; j <c.st.length; j++) {
                var cst=c.st[j];
                var subm={};
                subm.title=cst;
                subm.active=false;
                subm.url='/products/'+subm.title;
                m.items.push(subm)
              }
            }
            mlist.push(m)
          }
          this.category=mlist;
        },
        destroyed() {},
        methods: {
            init: function() {

                this.selectedCategory=this.$route.path;
                console.log(this.selectedCategory)
                this.isScrollLoading = false;
                this.isScrollNoMore = false;
                this.tableData = []
                this.getProducts();
            },
            getProducts: function() {
                this.loading = true;
                var url = this.$api.product.getProductByCategroy;
                var data = {
                    skip: this.tableData.length,
                    limit: this.pagesize
                };
                if (this.$route.name == 'searchproduct') {
                    url = this.$api.product.searchProduct;
                    data.filter = this.$route.params.filter
                } else {
                    data.category = this.$route.params.category
                }

                this.$http.post(url, data).then(res => {
                    var vm = this;
                    if (res.data.length == 0) {
                        // this.$set("isScrollNoMore",true);
                        this.isScrollNoMore = true;
                    } else {
                        _.each(res.data, function(x) {
                            vm.tableData.push(x)
                        })

                    }
                    this.loading = false;
                    this.isScrollLoading = false;
                });
            }
        },
        watch: {
            $route: function(newValue) {
                this.init();
                // console.log(newValue);
            }
        },
        directives: {
            scrollLoader: scrollLoader
        },
        components: {
            listItem: listItem,
            sidemenu:sidemenu
        }

}
</script>
<style scoped>
#products-category {
    float: left;
    width: 300px;

}

#products {
    margin-left: 320px
}
.loading-more{
    text-align: center;
    line-height: 40px;
}
</style>
