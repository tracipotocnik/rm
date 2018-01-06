import Vue from 'vue';
import VueRouter from 'vue-router';

// Components
import Home from '@/components/Home';
import Login from '@/components/Login';
import Shippers from '@/components/Shippers';

import auth from '../auth';

Vue.use(VueRouter);

const router = new VueRouter({
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
      meta: { auth: true },
    },
  ],
});


router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(route => route.meta.auth);
  const authed = auth.isLoggedIn();
  if (authRequired && !authed) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
