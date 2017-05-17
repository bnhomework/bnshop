<template>
  <el-menu default-active="2"  mode="horizontal" @open="handleOpen" @close="handleClose" :router=true :unique-opened=false>
    <a href="/"  style=" float: left;text-decoration: none;padding-left: 20px;padding-right: 20px">
      <img class="logo"  :src="logUrl"/>
      <span>{{CompanyName}}</span>
    </a>

    <template v-for="(m,i) in menu">
      <template v-if="m.items">
        <el-submenu :index="m.url">
          <template slot="title"> <i :v-if="m.icon" :class="m.icon"></i>
            {{m.title}}
          </template>
          <template v-for="s in m.items">
            <el-menu-item :index="s.url">{{s.title}}</el-menu-item>
          </template>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="m.url"> <i :v-if="m.icon" :class="m.icon"></i>
          {{m.title}}
        </el-menu-item>
      </template>
    </template>
    <li id="goble-search">
      <el-input placeholder=""  v-model="SearchContent">
        <el-button slot="append" icon="search" @click="handleSearch"></el-button>
      </el-input>
    </li>

  </el-menu>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'light',
                logUrl:require('@/assets/logo.png'),
                CompanyName:'Promote',
                SearchContent:''
            }
        },
        props:['menu'],
         methods: {
          handleOpen(){
            console.log('handleOpen')
          },
          handleClose(){
            console.log('handleClose')
          },
          handleSearch(){
            console.log(this.SearchContent);
          }
         }
    }
</script>
<style> 
#goble-search{
  position: relative;
  right: 10px;
  top:10px;
  float: right;
}
#goble-search>div{
  width: 200px
}   
#goble-search input{
      width:1px;
      opacity: 0;
}
#goble-search [class^=el-icon-] {
    vertical-align: baseline;
    margin-right: 0px;
}
#goble-search .el-input-group__append{
  border-left: 1px
}
#goble-search .group__append {
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
}
#goble-search:hover .group__append {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
#goble-search:hover .el-input-group__append{
  border-left: 0px
}
#goble-search:hover input{
      width:200px;
      opacity: 1;
}
</style>