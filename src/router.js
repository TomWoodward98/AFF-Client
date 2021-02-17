import Vue from 'vue';
import Router from 'vue-router';
import Welcome from './components/Welcome.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Home from './components/Home.vue';

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
        if (localStorage.getItem('jwt') != null) {
          next();
        } else {
          next('/welcome');
        }
      },
      // if user authed
    },
  ],
});
