<template>
    <div>
        <el-button @click="saveProduct">save</el-button>
        <el-row :gutter="20">
            <el-col :span="12">
                <section>
                    <h3 class="demonstration">Name</h3>
                     <el-input placeholder="" v-model="product.name">
                    </el-input>
                </section>
                <section>
                    <h3 class="demonstration">Categoary</h3>
                    <el-cascader expand-trigger="hover" :options="categories" v-model="product.category"  clearable size="large"></el-cascader>
                </section>
                <section>
                    <h3>Upload Images</h3>
                    <el-upload :action="uploadUrl" :on-change="productImgsChange" :on-remove="productImgsChange" :file-list="imgList" list-type="picture">
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
                product: {},
                selectedOptions: [],
                imgList:[],
                newDiscription: undefined,
                newPrice:{},
                priceDialogIndex:-1,
                priceDialogVisible:false,
                imgServer:this.$appSetting.imgServer
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
                    this.imgList=_.extend([],this.product.imgs);

                var self=this;
                    _.each(this.imgList,function(x){x.url=self.imgServer+x.path})
                });
            },
            productImgsChange: function(file,fileList) {
                var imgs = [];
                for (var i = 0; i < fileList.length; i++) {
                    var img=fileList[i]
                    if (img.response) {
                        imgs.push({
                            name: img.response.fileName,
                            path:  img.response.fileUrl
                        })
                    } else {
                        imgs.push(_.extend({},img))
                    }
                }
                this.product.imgs = imgs;
            },
            addDescription: function() {
                if(!this.product.descriptions){
                    this.$set(this.product,'descriptions',[]);
                }
                this.product.descriptions.push(this.newDiscription);
                this.newDiscription = ''
            },
            removeDescription: function(i) {
                this.product.descriptions.splice(i, 1);
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
                if(!this.product.prices){
                    this.$set(this.product,'prices',[]);
                }
                if(this.priceDialogIndex<0){
                    this.product.prices.push(this.newPrice);
                }
                else
                {
                    this.$set(this.product.prices,this.priceDialogIndex,this.newPrice);
                }
                this.priceDialogVisible=false;
            },
            removePrice:function(i){
                this.product.prices.splice(i, 1)
            },
            saveProduct:function(){
                this.$http.post(this.$api.product.saveProduct, {
                    product:this.product
                }).then(res => {
                    console.log(res)
                    this.$router.push({
                    name: 'editproduct',
                    params: {
                        pid: res.data.pid
                    }
                
                });
            })}
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
.el-input{
    width: 300px
}
.el-input.el-input-group{
    width: 100%
}
.el-cascader .el-input{
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