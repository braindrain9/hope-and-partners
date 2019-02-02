import Vue from 'vue';
import VueRouter from 'vue-router';

// components
const Home = () => import('./components/Home');
const Bio = () => import('./components/Bio');
const NotFoundPage = () => import('./views/NotFoundPage');

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'notFoundPage',
    path: '/404',
    component: NotFoundPage
  },
  {
    name: 'bio',
    path: '/bio',
    component: Bio
  },
  {
    path: '*',
    redirect: '/404'
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

router.afterEach((to, from) => {
});

export default router;
