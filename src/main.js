import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import App from './App.vue';
import router from './router';
import './style/main.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'vue-flash-message/dist/vue-flash-message.min.css';

import axios from 'axios';
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true,
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
