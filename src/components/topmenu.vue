<template>
    <el-menu default-active="2" mode="horizontal" @open="handleOpen" @close="handleClose" :router=true :unique-opened=false>
        <a href="/" style=" float: left;text-decoration: none;padding-left: 20px;padding-right: 20px">
            <img class="logo" :src="logUrl" />
            <span>{{CompanyName}}</span>
        </a>
        <template v-for="(m,i) in menu">
            <template v-if="m.items">
                <el-submenu :index="m.url">
                    <template slot="title"> <i :v-if="m.icon" :class="m.icon"></i> {{m.title}}
                    </template>
                    <template v-for="s in m.items">
                        <el-menu-item :index="s.url">{{s.title}}</el-menu-item>
                    </template>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="m.url"> <i :v-if="m.icon" :class="m.icon"></i> {{m.title}}
                </el-menu-item>
            </template>
        </template>
        <li id="goble-search" @keyup.enter="handleSearch">
            <el-input placeholder="" v-model="SearchContent" icon="search" placeholder="search products" :on-icon-click="handleSearch">
            </el-input>
        </li>
    </el-menu>
</template>
<script>
export default {
    data() {
            return {
                theme1: 'light',
                logUrl: require('@/assets/logo.png'),
                CompanyName: 'Promote',
                SearchContent: ''
            }
        },
        props: ['menu'],
        methods: {
            handleOpen() {
                console.log('handleOpen')
            },
            handleClose() {
                console.log('handleClose')
            },
            handleSearch() {
                if (this.SearchContent && this.SearchContent != '')
                    this.$emit('search', this.SearchContent);
            }
        }
}
</script>
<style>
.el-menu--horizontal .el-submenu .el-menu-item {
    min-width: 250px
}

#goble-search {
    position: relative;
    right: 40px;
    top: 10px;
    float: right;
}

#goble-search>div {
    width: 300px
}
</style>
