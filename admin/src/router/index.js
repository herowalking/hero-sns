import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import user from '../components/user.vue'
import userItem from '../components/user.item.vue'
import post from '../components/post.vue'

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: Hello
    // },
    {
      path: '/user',
      name: '用户',
      component: user
    },
    {
      path: '/user/:id',
      name: '用户项目',
      component: userItem,
      hidden: true
    },
    {
      path: '/post',
      name: '说说',
      component: post
    }
  ]
})
