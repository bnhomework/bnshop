<template>
<div>
    <section>
        <h3 class="demonstration">Categoary</h3>
        <el-cascader expand-trigger="hover" :options="categories" v-model="product.category" @change="handleChange" clearable size="large">
        </el-cascader>
    </section>
    <section>
    	<h3>Upload Images</h3>

    </section>
    <section>
    	<h3>Descriptions</h3>
    	
    </section>
    <section>
    	<h3>Prices</h3>
    	
    </section>
</div>
</template>
<script>
export default {
    data() {
    	return{
            product: {},
            selectedOptions:[]
        };
        }, created() {
            this.init();
        }, methods: {
            init: function() {

                var pid=this.$route.params.pid;
                if (pid) {
                    loadProduct(pid)
                }
            },
            loadProduct: function(pid) {
                this.loading = true;
                this.$http.post(this.$api.product.getProductById, {
                    pid
                }).then(res => {
                    this.product = res.data;
                     this.loading = false;
                });
            },
            handleChange:function(){

            }
        }, computed: {
            categories: function() {
                var category = this.$appSetting.categories;
                var mlist = [];
                for (var i = 0; i < category.length; i++) {
                    var c = category[i]
                    var m = {};
                    m.value = c.t;
                    m.label = c.t;
                    if (c.st) {
                        m.children = [];
                        for (var j = 0; j < c.st.length; j++) {
                            var cst = c.st[j];
                            var subm = {};
                            subm.value = cst;
                            subm.label = cst;
                            m.children.push(subm)
                        }
                    }
                    mlist.push(m)
                }
                console.log(mlist)
                return mlist;
            }
        },
        watch: {
            $route: function() {
                this.init();
            }
        }
}
</script>


<style>
.el-cascader .el-input input{
	width: 400px
}
</style>
