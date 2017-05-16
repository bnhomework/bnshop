<template>
    <div>
    <el-button @click="saveProduct">save</el-button>
        <el-row :gutter="20">
            <el-col :span="12">
                <section>
                    <h3 class="demonstration">Categoary</h3>
                    <el-cascader expand-trigger="hover" :options="categories" v-model="product.category" @change="handleChange" clearable size="large"></el-cascader>
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
                    <draggable v-model="product.descriptions" :options="{group:'people'}" @start="drag=true" @end="drag=false">
                        <div v-for="(d,i) in product.descriptions" class="description-item">
                            {{i+1}} :
                            <span>{{d}}</span> <i class="el-icon-close" @click="removeDescription(i)"></i>

                        </div>

                    </draggable>

                </section>
                <section>
                    <h3>Prices</h3>
                    <el-button @click="openEditPriceDialog()">Add</el-button>
                    <el-table :data="product.prices" border style="width: 100%">
                        <el-table-column type="index"></el-table-column>
                        <el-table-column prop="moq" label="MOQ" width="180" align="right"></el-table-column>
                        <el-table-column prop="amount" label="Amount($)" align="right"></el-table-column>
                        <el-table-column label="操作" width="120">
                            <template scope="scope">
                                <el-button @click.native.prevent="removePrice(scope.$index)" type="text" size="small">Remove</el-button>
                                <el-button @click.native.prevent="openEditPriceDialog(scope)" type="text" size="small">Edit</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </section>
            </el-col>
        </el-row>
        <el-dialog
              title="Price"
              :visible="priceDialogVisible"
              size="tiny">
            <el-form :model.sync="newPrice">
                <el-form-item label="MOQ" label-width="100">
                    <el-input v-model="newPrice.moq" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Amount($)" label-width="100">
                    <el-input v-model="newPrice.amount" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="priceDialogVisible=false">Cancel</el-button>
                <el-button type="primary" @click="updatePrice">Ok</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import _ from 'underscore';
import draggable  from 'vuedraggable'
export default {
    data() {
            return {
                uploadUrl: this.$api.common.uploadImg,
                product: {imgs:[],descriptions:[],prices:[]},
                selectedOptions: [],
                newDiscription: undefined,
                newPrice:{},
                priceDialogIndex:-1,
                priceDialogVisible:false
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
                console.log(this.product)
                for (var img in this.product.imgs) {

                    if (img.response) {
                        imgs.push({
                            uid: img.uid,
                            name: img.response.fileName,
                            url:  img.response.fileUrl
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
            openEditPriceDialog:function(p){
                if(p==undefined){
                    this.priceDialogIndex=-1;
                    this.newPrice={};
                }
                else{
                    this.priceDialogIndex=p.$index;                    
                    this.newPrice=_.extend({},p.row);
                }
                this.priceDialogVisible=true;

                
            },
            updatePrice:function(){
                if(this.priceDialogIndex<0){
                    this.product.prices.push(this.newPrice);
                }
                else
                {
                    this.$set(this.product.prices,this.priceDialogIndex,this.newPrice);
                }
                this.priceDialogVisible=false;
            },
            saveProduct:function(){
            	this.handleProductImgs();
            	this.$http.post(this.$api.product.saveProduct, {
                    product:this.product
                }).then(res => {
                	this.$router.push({
                    name: 'edit product',
                    params: {
                        pid: res.pid
                    }
                
                });
            })},
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
        },
        components:{draggable:draggable}
}
</script>
<style>
.el-cascader .el-input input {
    width: 400px
}
.description-item{
    margin: 5px;
    padding: 5px 25px;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    background-color: #f6f8fa;
    position: relative;
}
.description-item:hover .el-icon-close {
    margin: 5px;
    display: inline-block;
    position: absolute;
    top: 2px;
    right: 2px;
    cursor: pointer;
    font-size: 5px
}

.description-item .el-icon-close {
    display: none;
}
</style>