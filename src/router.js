import Vue from 'vue';
import VueRouter from 'vue-router';

// components
import Feed from './views/Feed';
import Post from './views/Post';
import Partners from './components/Partners';
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
    name: 'post',
    path: '/posts/:slug',
    component: Post
  },
  {
    name: 'page',
    path: '/page/:page',
    component: Feed
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
    name: 'partners',
    path: '/partners',
    component: Partners
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
