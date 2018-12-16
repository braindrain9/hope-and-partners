import Vue from 'vue';
import VueRouter from 'vue-router';
import bus from './bus';

// components
import Feed from './views/Feed';
import FourOFour from './views/FourOFour';
import Post from './views/Post';
import Partners from './components/Partners';
import Services from './components/Services';
import Cases from './components/Cases';
import About from './components/About';
import Home from './components/Home';
import Bio from './components/Bio';

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
    name: 'four-o-four',
    path: '/404',
    component: FourOFour
  },
  {
    name: 'about',
    path: '/about',
    component: About
  },
  {
    name: 'bio',
    path: '/bio',
    component: Bio
  },
  {
    name: 'services',
    path: '/services',
    component: Services
  },
  {
    name: 'partners',
    path: '/partners',
    component: Partners
  },
  {
    name: 'cases',
    path: '/cases',
    component: Cases
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

  //-- Bump the key on App component to force component to update on route change.
  bus.$emit('bumpViewKey');
})

export default router;
