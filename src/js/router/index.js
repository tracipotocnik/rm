import Vue from 'vue';
import VueRouter from 'vue-router';
// import { requireAuth } from '../utils/auth';

// Components
import Home from '@/components/Home';
import Login from '@/components/Login';
import Shippers from '@/components/Shippers';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    // routes
    {
      name: 'home',
      path: '/',
      component: Home,
    },
    {
      name: 'login',
      path: '/login',
      component: Login,
    },
    {
      name: 'shippers',
      path: '/shippers',
      component: Shippers,
    },
  ],
});
