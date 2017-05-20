<template>
    <div class="product" @mouseenter="showBack=true" @mouseleave="showBack=false">
        <div class="make3D" :class="{animate:showBack}">
            <div class="product-front">
                <div class="shadow"></div>
                <img :src="imgUrl" alt="" />
                <div class="image_overlay"></div>
                <div class="add_to_cart" @click="viewDetail">View Detail</div>
                <div class="stats">
                    <div class="stats-container">
                        <span class="product_name">{{product.name}}</span>
                        <span class="product_price">{{ minPrice }}</span>
                        <div class="product-options">
                            <p>Summer dress</p>
                            <strong>SIZES</strong>
                            <span>XS, S, M, L, XL, XXL</span>
                            <strong>COLORS</strong>
                            <div class="colors">
                                <div class="c-blue"><span></span></div>
                                <div class="c-red"><span></span></div>
                                <div class="c-white"><span></span></div>
                                <div class="c-green"><span></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'underscore';
export default {
    data() {
            return {
                showBack: false
            }
        },
        props: ['product'],
        methods: {
            viewDetail: function() {
                this.$router.push({
                    name: 'viewproduct',
                    params: {
                        pid: this.product.pid
                    }
                })
            },
            getPicUrl: function(p) {
                return this.$appSetting.imgServer + p.path
            }

        },
        computed: {
            imgUrl: function() {
                if (this.product.imgs && this.product.imgs.length > 0) {
                    return this.getPicUrl(this.product.imgs[0])
                }
                return ''
            },
            priceToShow: function() {
                var minPrice = _.min(this.product.prices, function(x) {
                    return x.amount;
                });;
                var maxPrice = _.max(this.product.prices, function(x) {
                    return x.amount;
                });;
                return "$" + minPrice.amount + " ~ $" + maxPrice.amount
            },
            minPrice: function() {
                return '$' + _.min(this.product.prices, function(x) {
                    return x.amount;
                }).amount;
            }
        }

}
</script>
<style scoped>
.product {
    position: relative;
    perspective: 800px;
    width: 152px;
    height: 371px;
    margin-bottom: 20px;
    transform-style: preserve-3d;
    transition: transform 5s;
    /*float: left;*/
    -webkit-transition: width 500ms ease-in-out;
    -moz-transition: width 500ms ease-in-out;
    -ms-transition: width 500ms ease-in-out;
    -o-transition: width 500ms ease-in-out;
    transition: width 500ms ease-in-out;
}

.product-front img {
    width: 100%;
}

.product-front{
    width: 180px;
    height: 380px;
    background: #fff;
    position: absolute;
    left: -5px;
    top: -5px;
    -webkit-transition: all 100ms ease-out;
    -moz-transition: all 100ms ease-out;
    -o-transition: all 100ms ease-out;
    transition: all 100ms ease-out;
}


.make3D.animate .product-front {
    top: 0px;
    left: 0px;
    -webkit-transition: all 100ms ease-out;
    -moz-transition: all 100ms ease-out;
    -o-transition: all 100ms ease-out;
    transition: all 100ms ease-out;
}

.make3D {
    width: 180px;
    height: 370px;
    position: absolute;
    top: 10px;
    left: 10px;
    overflow: hidden;
    transform-style: preserve-3d;
    -webkit-transition: 100ms ease-out;
    -moz-transition: 100ms ease-out;
    -o-transition: 100ms ease-out;
    transition: 100ms ease-out;
}

.make3D.animate {
    top: 5px;
    left: 5px;
    width: 180px;
    height: 380px;
    box-shadow: 0px 5px 31px -1px rgba(0, 0, 0, 0.15);
    -webkit-transition: 100ms ease-out;
    -moz-transition: 100ms ease-out;
    -o-transition: 100ms ease-out;
    transition: 100ms ease-out;
}

.stats-container {
    background-color: #f5f5f5;
    border-top:1px solid #e5e5e5;
    position: absolute;
    top: 282px;
    left: 0;
    width: 170px;
    height: 300px;
    padding: 5px;
    -webkit-transition: all 200ms ease-out;
    -moz-transition: all 200ms ease-out;
    -o-transition: all 200ms ease-out;
    transition: all 200ms ease-out;
}

.make3D.animate .stats-container {
    top: 165px;
    -webkit-transition: all 200ms ease-out;
    -moz-transition: all 200ms ease-out;
    -o-transition: all 200ms ease-out;
    transition: all 200ms ease-out;
}

.stats-container .product_name {
    font-size: 12px;
    color: #393c45;
    font-weight: 700;
}

.stats-container p {
    font-size: 15px;
    color: #b1b1b3;
    padding: 2px 0 20px 0;
}

.stats-container .product_price {
    float: right;
    color: #5ff7d2;
    font-size: 15px;
    font-weight: 600;
}

.image_overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #5ff7d2;
    opacity: 0;
}

.make3D.animate .image_overlay {
    opacity: 0.7;
    -webkit-transition: all 200ms ease-out;
    -moz-transition: all 200ms ease-out;
    -o-transition: all 200ms ease-out;
    transition: all 200ms ease-out;
}

.product-options {
    padding: 0;
    display: none;
}

.product-options strong {
    font-weight: 700;
    color: #393c45;
    font-size: 12px;
}

.product-options span {
    color: #969699;
    font-size: 14px;
    display: block;
    margin-bottom: 8px;
}
.make3D.animate .product-options{
    display: block;
}
.add_to_cart {
    position: absolute;
    top: 30px;
    left: 50%;
    padding: 5px;
    line-height: 85px;
    border-radius: 100%;
    margin-left: -48px;
    border: 2px solid #fff;
    color: #fff;
    text-align: center;
    opacity: 0;
    -webkit-transition: all 200ms ease-out;
    -moz-transition: all 200ms ease-out;
    -o-transition: all 200ms ease-out;
    transition: all 200ms ease-out;
}

.add_to_cart:hover {
    background: #fff;
    color: #5ff7d2;
    cursor: pointer;
}

.make3D.animate .add_to_cart {
    opacity: 1;
    -webkit-transition: all 200ms ease-out;
    -moz-transition: all 200ms ease-out;
    -o-transition: all 200ms ease-out;
    transition: all 200ms ease-out;
}



div.colors div {
    margin-top: 3px;
    width: 15px;
    height: 15px;
    margin-right: 5px;
    float: left;
}

div.colors div span {
    width: 15px;
    height: 15px;
    display: block;
    border-radius: 50%;
}

div.colors div span:hover {
    width: 17px;
    height: 17px;
    margin: -1px 0 0 -1px;
}

div.c-blue span {
    background: #6e8cd5;
}

div.c-red span {
    background: #f56060;
}

div.c-green span {
    background: #44c28d;
}

div.c-white span {
    background: #fff;
    width: 14px;
    height: 14px;
    border: 1px solid #e8e9eb;
}



</style>
