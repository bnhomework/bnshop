<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <section>
                    <h3 class="demonstration">Categoary</h3>
                    <el-cascader expand-trigger="hover" :options="categories" v-model="product.category" @change="handleChange" clearable size="large">
                    </el-cascader>
                </section>
                <section>
                    <h3>Upload Images</h3>
                    <el-upload class="upload-demo" :action="uploadUrl" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="product.imgs" list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </section>
            </el-col>
            <el-col :span="12">
                <section>
                    <h3>Descriptions</h3>
                    <el-input placeholder="请输入内容" v-model="newDiscription">
                        <el-button slot="append" icon="plus" @click="addDescription"></el-button>
                    </el-input>
                    <ul>
                        <li v-for="(d,i) in product.descriptions" class="description-item"><span>{{d}}</span>
                            <el-button icon="minus" type="danger" class="btn-action" @click="removeDescription(i)"></el-button>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>Prices</h3>
                    <el-table :data="product.prices" border style="width: 100%">
                        <el-table-column type="index">
                        </el-table-column>
                        <el-table-column prop="moq" label="MOQ" width="180" align="right">
                        </el-table-column>
                        <el-table-column prop="amount" label="Amount($)" align="right">
                        </el-table-column>
                        <el-table-column label="操作" width="120">
                            <template scope="scope">
                                <el-button @click.native.prevent="removePrice(scope.$index)" type="text" size="small">
                                    移除
                                </el-button>
                            </template>
                            </el-table-column>
                    </el-table>
                </section>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
            return {
                uploadUrl: this.$api.common.uploadImg,
                product: {},
                selectedOptions: [],
                newDiscription: undefined,
                newPrice:{}
            };
        }, created() {
            this.init();
        }, methods: {
            init: function() {

                var pid = this.$route.params.pid;
                if (pid) {
                    this.loadProduct(pid)
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
            handleProductImgs: function() {
                var imgs = [];
                for (var img in this.product.imgs) {

                    if (img.response) {
                        imgs.push({
                            uid: img.uid,
                            name: img.response.fileName,
                            url: this.$appSetting.imgServer + img.response.fileUrl
                        })
                    } else {
                        imgs.push(img)
                    }
                }
                this.product.imgs = imgs;
            },
            addDescription: function() {
                this.product.descriptions.push(this.newDiscription);
                this.newDiscription = ''
            },
            removeDescription: function(i) {
                this.product.descriptions.splice(i, 1)
            },
            removePrice:function(i){
            	this.product.prices.splice(i, 1)
            },
            handleChange: function(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview: function(file) {

            },
            handleRemove: function(file, fileList) {
                console.log(file, fileList);
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
.el-cascader .el-input input {
    width: 400px
}

.description-item:hover .btn-action {
    margin: 5px;
    display: inline-block;
}

.description-item .btn-action {
    display: none;
}

.btn-action {}
</style>
