import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      redirect:'college',
      children: [
        {
          path: 'college',
          name: 'college',
          component: () => import('@/views/college/List')
        },
        {
          path: 'college/:id',
          component: () => import('./views/college/Detail.vue'),
        },
        {
          path: 'college/edit/:id',
          component: () => import('./views/college/Edit.vue'),
        },
      ]
    }
  ]
})
