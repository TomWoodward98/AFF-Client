import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import App from './App.vue';
import router from './router';
import store from './store/store'

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
    store,
    render: (h) => h(App),
    data() {
        return {
            userInstance: false,
        }
    },
    watch: {
        userInstance() {
            if (this.userInstance === true) {
                this.getCurrentUser();
                this.getUsers();
                this.getStatuses();
                this.getTickets();
            }
        },
    },
    mounted() {
        this.user();
        this.getRegisterData();
    },
    methods: {
        getRegisterData() {
            this.$store.dispatch('getDepartments');
            this.$store.dispatch('getUserTypes');
        },
        getCurrentUser() {
            this.$store.dispatch('getCurrentUser');
        },
        getUsers() {
            this.$store.dispatch('getUsers');
        },
        getStatuses() {
            this.$store.dispatch('getStatuses')
        },
        getTickets() {
            this.$store.dispatch('getTickets')
        },
        user() {
            axios.get('/checkToken').then(res => {
                if (res.status === 200) {
                    this.userInstance = true;
                } else {
                    this.userInstance = false;
                }
            });
        }
    },
}).$mount('#app');
