
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'
import VueCookie from 'vue-cookie'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

Vue.use(VueResource);
Vue.use(VueCookie);


