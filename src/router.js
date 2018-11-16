import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import TenantDetails from './views/TenantDetails.vue'
import TenantEdit from './views/TenantEdit.vue'
import LogIn from './views/LogIn.vue'

Vue.use(Router)

export default new Router({
  routes: [
    
    {
      path:'/',
      name:'LogIn',
      component: LogIn,
    },
    
    {
      path: '/home',
      name: 'Home',
      component: Home
    },

    {
      path: '/TenantDetails/:tenantId?',
      name: 'TenantDetails',
      component: TenantDetails
    },

    {
      path: '/TenantEdit/:tenantId?',
      name: 'TenantEdit',
      component: TenantEdit
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   route level code-splitting
    //   this generates a separate chunk (about.[hash].js) for this route
    //   which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
