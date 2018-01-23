import Vue from 'vue';
import VueRouter from 'vue-router';

// Components
import Home from '@/components/Home';
import Login from '@/components/Login';
import Shippers from '@/components/Shippers';
import Loads from '@/components/Loads';
import SingleLoad from '@/components/SingleLoad';
import ShipmentUploads from '@/components/ShipmentUploads';
import PendingLoads from '@/components/PendingLoads';

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
    {
      name: 'loads',
      path: '/loads',
      component: Loads,
      meta: { auth: true },
    },
    {
      name: 'singleLoad',
      path: '/load/:id',
      component: SingleLoad,
      meta: { auth: true },
    },
    {
      name: 'shipmentUploads',
      path: '/shipment-uploads',
      component: ShipmentUploads,
      meta: { auth: true },
    },
    {
      name: 'pendingLoads',
      path: '/pending-quotes/:companyUuid',
      component: PendingLoads,
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
