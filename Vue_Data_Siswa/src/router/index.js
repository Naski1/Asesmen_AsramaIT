import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue') // Lazy-load HomeView
    },
    {
      path: '/post',
      name: 'post',
      component: () => import('../views/PostView.vue'),
      props: true
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/EditView.vue'),
      props: route => ({ id: route.params.id }) // Pass 'id' as a prop
    }
  ]
})

export default router
