import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventoView from '@/views/EventoView.vue'
import AdminView from '@/views/AdminView.vue'
import UsuarioView from '@/views/UsuarioView.vue'
import EventosListView from '@/views/EventosListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/teste',
      name: 'teste',
      component: EventoView,
    },
    {
      path: '/teste2',
      name: 'teste2',
      component: AdminView
    },
    {
      path: '/teste3',
      name: 'teste3',
      component: UsuarioView
    },
    {
      path:'/teste4',
      name: 'teste4',
      component: EventosListView
    }

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
