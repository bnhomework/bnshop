<template>
	<section>
		<div class="photoSwipeBoxWrapper">
			<div class="leftArrow" @click="move(currentIndex-1)"><i class="el-icon-arrow-left"></i></div>
			<div class="photoSwipeBox">
				<div class='ph'>
					<img :src="currentImg">
				</div>
				<div class="ph-nav">
					<template  v-for="(item,index) in imgs">
						
					<div class="ph-nav-item" :class="{active:currentIndex==index}" @click="move(index)"><span></span></div>
					</template>
				</div>
			</div>
			<div class="rightArrow" @click="move(currentIndex+1)"><i class="el-icon-arrow-right"></i></div>
		</div>
		<div class="preview-box">
			<template v-for="(item,index) in imgs">
					<a @click="move(index)"><img :src="item" :class="{active:index==currentIndex}"></a>
			</template>
		</div>
	</section>
</template>
<script>
	export default{
		data(){
			return {
				currentIndex:0,
				w:200,
				h:200,
				imglist:[]

			}
		},
		created(){
			this.imglist=this.imgs||[];
		},
		methods:{
			move:function(index){
				var length=this.imgs.length;
				if(index<0){
					this.currentIndex=length+index;
				} 
				else if(index>=length)
				{
					this.currentIndex=index-length;
				}else{
					this.currentIndex=index;
				}
			}
		},
		props:['imgs'],
		computed:{
			currentImg:function(){
				return this.imgs[this.currentIndex];
			}
		}
	}
</script>
<style scoped>
.photoSwipeBoxWrapper {
    position: relative;
    width: 400px;
    margin: 0 auto ;
    height: 300;
    padding-top: 10px;
}

.photoSwipeBoxWrapper .photoSwipeBox {
    height: 300px;
    width: 300px;
    margin: 0 auto ;
}
.photoSwipeBoxWrapper .photoSwipeBox .ph img{
    /*height: 300px;*/
    width: 300px;
}
.photoSwipeBoxWrapper .leftArrow,
.photoSwipeBoxWrapper .rightArrow {
    position: absolute;
    top: 45%;
    cursor: pointer;
    font-size: 20px
}
.photoSwipeBoxWrapper i[class*='el-icon-arrow-']{
	font-size:30px
}

.photoSwipeBoxWrapper i:hover[class*='el-icon-arrow-']{
	font-size:35px
}

.photoSwipeBoxWrapper .leftArrow{
	margin-left: -40px;
}
.photoSwipeBoxWrapper .rightArrow{
	margin-left: 440px;
}

.photoSwipeBox .ph-nav {
    /*position: relative;*/
    margin: 0 auto;
    text-align: center;
    overflow: hidden;
}
.ph-nav .ph-nav-item {
    width: 10px;
    height: 10px;
    margin: 0 5px 1px;
    border-radius: 50%;
    background: #d1d1d1;
    display: inline-block;
    cursor: pointer;
}
.ph-nav .ph-nav-item.active{

    background: #616161;
}

.preview-box{
	margin: 40px;
	text-align: center;
}
.preview-box a{
	cursor: pointer;
}
.preview-box img{
	margin: 5px;
	width: 100px;
	height: 100px;
	display: inline-block;
	border: 1px solid #d1d1d1;
}
.preview-box img.active{

	border: 1px solid #616161;
}
</style>
