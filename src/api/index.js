import config from '@/config'
const product={
};
var apiServer=config.config.apiServer;
product.getProductByCategroy=apiServer+'getProductByCategroy';
product.getProductById=apiServer+'getProductById';
product.searchProduct=apiServer+'searchProduct';

const registedAPIs={product}
var install= function  (Vue){
 if (install.installed) return
  install.installed = true

  Object.defineProperty(Vue.prototype, '$api', {
    get () { return registedAPIs }
  })
} 

export default{
	install
}