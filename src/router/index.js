import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home.vue'

Vue.use(Router)

const productList= (resolve) => { require(['@/views/product/list.vue'], resolve) }
const productDetail= (resolve) => { require(['@/views/product/detail.vue'], resolve) }

// admin
const productEdit= (resolve) => { require(['@/views/product/edit.vue'], resolve) }
const NotFound = (resolve) => { require(['@/views/NotFound.vue'], resolve) }

var routes = [{path: '/', name: 'Home', component: Home},

    {path: '/product/add', name: 'addproduct', component: productEdit},
    {path: '/product/edit/:pid', name: 'editproduct', component: productEdit},


    {path: '/products/:category', name: 'productslist', component: productList},
    {path: '/products', name: 'productslist', component: productList},
    {path: '/search/:filter', name: 'searchproduct', component: productList},
    {path: '/product/:pid', name: 'viewproduct', component: productDetail},


    {path: '*', name: '404', component: NotFound}]
    
export default new Router({
  routes: routes,
  mode: 'history'
})
