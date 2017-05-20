<template>
    <div class="wrapper">
        <div class="wrapper-header">
            <topmenu :menu="menu" @search="search"></topmenu>
        </div>
        <div class="wrapper-main">
            <div class="wrapper-container">
                <transition :name="transitionName">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import topmenu from '@/components/topmenu.vue'
import languageSelect from '@/components/languageSelect.vue'
export default {
    name: 'app',
    created (){
      var category=this.$appSetting.categories

          var mlist=[];

          mlist.push({title:'Home',url:'/products'})
          mlist.push({title:'Hot Products',url:'/hot'})
          mlist.push({title:'New Products',url:'/new'})
          mlist.push({title:'Contact US',url:'/contact us'})
          this.menu=mlist;
    },
    data() {
        return {
            transitionName: 'slide-left',
            menu:[]
        }
    },
    methods: {
        search:function(filter){
            this.$router.push({
                name:'searchproduct',
                params:{filter:filter}
            })
        }
    },
    computed: {
        name() {
            return this.$route.name
        }
    },
    components: {
        topmenu: topmenu,
        languageSelect: languageSelect
    }
}
</script>
<style>
@import '../node_modules/element-ui/lib/theme-default/index.css';
@import './assets/css/style.css';
</style>
