import Vue from 'vue';
import Router from 'vue-router';
import Welcome from './components/Welcome.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Home from './components/Home.vue';
import axios from 'axios';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    { 
      path: '/', 
      redirect: '/welcome' 
    },
    {
      path: '/welcome',
      component: Welcome,
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/home',
      component: Home,
      beforeEnter: (to, from, next) => {
        axios.get('http://localhost:3000/checkToken')
        .then(res => {
          if (res.status === 200) {
            next()
          }
        }).catch(function(error) { 
          next('/welcome')
        });
      },
    },
  ],
});
