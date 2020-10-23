import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/contacts/:id',
    name: 'Contact',
    component: () => import('@/views/ContactPage.vue'),
    props: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/NotFoundPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
