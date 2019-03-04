import Vue from 'vue';
import VueRouter from 'vue-router';
import {i18n} from "./i18n";

// components
// const Home = () => import('./components/Home');
// const Bio = () => import('./components/Bio');
// const NotFoundPage = () => import('./views/NotFoundPage');
import Home from './components/Home';
import Bio from './components/Bio';
import NotFoundPage from './views/NotFoundPage';

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'homeEng',
    path: '/en',
    component: Home,
    beforeEnter (to, from, next) {
      if (i18n.locale !== 'en') {
        i18n.locale = 'en';
      }

      return next();
    }
  },
  {
    name: 'bioEng',
    path: '/en/bio',
    component: Bio,
    beforeEnter (to, from, next) {
      if (i18n.locale !== 'en') {
        i18n.locale = 'en';
      }

      return next();
    }
  },
  {
    name: 'bio',
    path: '/bio',
    component: Bio
  },
  {
    name: 'notFoundPage',
    path: '/404',
    component: NotFoundPage
  },
  {
    path: '*',
    redirect: '404'
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
