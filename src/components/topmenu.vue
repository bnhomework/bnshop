<template>
  <el-menu default-active="2"  mode="horizontal" @open="handleOpen" @close="handleClose" :router=true :unique-opened=false>
      <a href="/"  style=" float: left;text-decoration: none;padding-left: 20px;padding-right: 20px"><img class="logo"  :src="logUrl"/><span>{{CompanyName}}</span></a>
      
      <template v-for="(m,i) in menu">
        <template v-if="m.items">
          <el-submenu :index="m.url">
            <template slot="title">
              <i :v-if="m.icon" :class="m.icon"></i>
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
  </el-menu>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'light',
                logUrl:require('@/assets/logo.png'),
                CompanyName:'Promote'
            }
        },
        props:['menu'],
         methods: {
          handleOpen(){
            console.log('handleOpen')
          },
          handleClose(){
            console.log('handleClose')
          }
         }
    }
</script>