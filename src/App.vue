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
          for (var i =  0; i <category.length; i++) {
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
