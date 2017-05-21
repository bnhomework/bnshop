<template>
    <div id="product-main">
        <div id="products-category">
            <el-collapse value="1">
                <el-collapse-item title="Price Range" name="1">
                    <div class="sortbox">
                        <el-slider v-model="filters.priceFilter" :min="0" range :step="0.01" :max="50"></el-slider>
                        <el-input-number v-model="filters.priceFilter[0]" size="small" @change=""></el-input-number>
                        <el-input-number v-model="filters.priceFilter[1]" size="small" @change=""></el-input-number>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <el-collapse value="1">
                <el-collapse-item id="colorFilter" title="Colors" name="1">
                    <el-checkbox-group v-model="filters.colors">
                        <el-checkbox :label="item.k" v-for="item in allColors" :key="item.k">
                            <!-- {{item.label}} -->
                            <div class="colors" v-bind:style="{'background-color':'#'+item.k}">
                                <!-- <div><span>a</span></div> -->
                            </div>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-collapse-item>
            </el-collapse>
            <el-collapse value="1">
                <el-collapse-item title="Category" name="1">
                    <!-- <sidemenu :menu="category" :defaultitem="selectedCategory"></sidemenu> -->
                    <el-tree :data="category" ref="categoryTree" show-checkbox node-key="title" :props="{children:'items',label:'title'}" @check-change="selectedCategoryChange">
                    </el-tree>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div id="products">
            <div id="actionbar">
                <el-input placeholder="filter within search results" id="filterInResult" icon="search" v-model="filterInResult">
                </el-input>
            </div>
            <el-row :gutter="10" >
                <el-col ::xs="12" :sm="8" :md="6" :lg="4" v-for="(o, index) in tableInGrid" :key="o">
                    <list-item :product="o"></list-item>
                </el-col>
            </el-row>
            <div class="loading-more" v-scroll-loader="getProducts" v-loading="loading" element-loading-text="Loading More ...">
                <!-- <label v-if="isScrollNoMore">No more products</label> -->
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'underscore';
import scrollLoader from '@/directives/scrollLoader'
import listItem from '@/views/product/listItem.vue'
import sidemenu from '@/components/sidemenu.vue'
import utils from '@/utils'
export default {
    data() {
            return {
                loading: false,
                pagesize: 18,
                currentPage: 1,
                tableData: [],
                isScrollLoading: false,
                isScrollNoMore: false,
                category: [],
                filterInResult: '',
                allColors: this.$appSetting.defaultColors,
                filters: {
                    categories: [],
                    priceFilter: [0, 50],
                    colors: [],
                    filter: ''
                }
            }
        },
        created() {
            this.init();

        },
        destroyed() {},
        methods: {
            init: function() {
                this.isScrollLoading = false;
                this.isScrollNoMore = false;
                this.tableData = [];
                this.loadCategories();

                this.filters = {
                        categories: [],
                        priceFilter: [0, 50],
                        colors: [],
                        filter: ''
                    }
                    // this.getProducts();
            },
            getProducts: function() {
                this.loading = true;
                var url = this.$api.product.getProductByCategroy;

                    if (arguments && arguments[0] == true) {
                            this.tableData = [];
                            this.isScrollNoMore = false;
                        }
                var data = _.extend({}, this.filters, {
                    skip: this.tableData.length,
                    limit: this.pagesize
                });
                url = this.$api.product.searchProduct;
                data.filter = this.$route.params.filter
                // console.log(data)
                this.$http.post(url, data).then(res => {
                    var vm = this;
                    if (res.data.length == 0) {
                        this.isScrollNoMore = true;
                    } else {
                        //reload
                        
                            _.each(res.data, function(x) {
                                vm.tableData.push(x)
                            })
                        

                    }
                    this.loading = false;
                    this.isScrollLoading = false;
                });
            },
            loadCategories: function() {
                var category = this.$appSetting.categories

                var mlist = [];
                var length = category.length;
                for (var i = 0; i < length; i++) {
                    var c = category[i]
                    var m = {};
                    m.title = c.t;
                    m.active = false;
                    m.url = '/products/' + m.title;
                    if (c.st) {
                        m.items = [];
                        for (var j = 0; j < c.st.length; j++) {
                            var cst = c.st[j];
                            var subm = {};
                            subm.title = cst;
                            subm.active = false;
                            subm.url = '/products/' + subm.title;
                            m.items.push(subm)
                        }
                    }
                    mlist.push(m)
                }
                this.category = mlist;
            },
            selectedCategoryChange: function() {
                this.filters.categories = this.$refs.categoryTree.getCheckedKeys();
            }
        },
        watch: {
            $route: function(newValue) {
                this.init();
            },
            filters: {
                handler: function(v) {
                    if (this.throttle == undefined)
                        this.throttle = utils.throttle(this.getProducts, 500);
                    this.throttle(true);
                },
                deep: true
            }
        },
        directives: {
            scrollLoader: scrollLoader
        },
        computed: {
            tableInGrid: function() {
                return this.tableData.filter((x) => {
                    if (this.filterInResult == undefined || this.filterInResult.trim() == '') {
                        return true;
                    } else {
                        var f = this.filterInResult.trim().toLocaleLowerCase();
                        return (x.name && x.name.toLocaleLowerCase().indexOf(f) > -1) || (x.pid && x.pid.toLocaleLowerCase().indexOf(f) > -1)
                    }
                })
            }
        },
        components: {
            listItem: listItem,
            sidemenu: sidemenu
        }

}
</script>
<style scoped>
#products-category {
    float: left;
    width: 300px;
}

#products-category .el-collapse {
    border: 0px;
    margin-top: 10px
}

#products-category .el-tree {
    border: 0px;
}

#products {
    margin-left: 320px
}

#actionbar {
    width: 100%;
    min-height: 60px;
    border-bottom: 1px solid #e5e5e5;
    background-color: rgba(255, 255, 255, 0.6);
}

#filterInResult {
    position: absolute;
    top: 10px;
    left: 360px;
    width: 300px;
}

#actionbar .sortbox {
    position: absolute;
    top: 10px;
    right: 60px;
}

#actionbar .el-slider {
    width: 200px;
    display: inline-block;
}

.loading-more {
    text-align: center;
    line-height: 40px;
}

#colorFilter .el-checkbox {
    margin-left: 0px;
    margin-right: 15px;
}

div.colors {
    width: 45px;
    height: 25px;
    border: 1px solid #1f1f1f;
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 5px;
}
</style>
