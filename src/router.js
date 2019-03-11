import Vue from 'vue';
import VueRouter from 'vue-router';
import {i18n} from "./i18n";

// components
import HomePage from './views/HomePage';
import BioPage from './views/BioPage';
import NotFoundPage from './views/NotFoundPage';

Vue.use(VueRouter);

const routes = [
  // default version
  {
    name: 'home',
    path: '/',
    component: HomePage
  },
  {
    name: 'bio',
    path: '/bio',
    component: BioPage
  },
  {
    name: 'notFoundPage',
    path: '/404',
    component: NotFoundPage
  },

   // eng version
  {
    name: 'homeEng',
    path: '/en',
    component: HomePage,
    beforeEnter
  },
  {
    name: 'bioEng',
    path: '/en/bio',
    component: BioPage,
    beforeEnter
  },
  {
    name: 'notFoundPageEng',
    path: '/en/404',
    component: NotFoundPage,
    beforeEnter
  },

  // redirects
  {
    path: '/en/*',
    redirect: '/en/404'
  },
  {
    path: '*',
    redirect: '404'
  }
];

function beforeEnter (to, from, next) {
  if (i18n.locale !== 'en') {
    i18n.locale = 'en';
  }

  return next();
}

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

export default router;
