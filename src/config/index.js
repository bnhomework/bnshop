const config={
  apiServer: 'http://127.0.0.1:3009/api/',
  }
var install= function  (Vue){
 if (install.installed) return
  install.installed = true

  Object.defineProperty(Vue.prototype, '$appSetting', {
    get () { return config }
  })
} 

export default {
	install,
	config
}