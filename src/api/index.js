import config from '@/config'
const product={
};
var apiServer=config.config.apiServer;
product.getProductByCategroy=apiServer+'getProductByCategroy';
product.getProductById=apiServer+'getProductById';
product.searchProduct=apiServer+'searchProduct';
product.saveProduct=apiServer+'saveProduct';

const common={}
common.uploadImg=apiServer+'upload/img';

const registedAPIs={product,common}
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