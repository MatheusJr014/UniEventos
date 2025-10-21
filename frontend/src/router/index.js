import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EventoView from "@/views/EventoView.vue";
import AdminView from "@/views/AdminView.vue";
import UsuarioView from "@/views/UsuarioView.vue";
import EventosListView from "@/views/EventosListView.vue";
import GuardAdmin from '../middleware/Auths'; 
import LoginAndCadastroView from "@/views/LoginAndCadastroView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/eventos',
      children: [
        {
          path: '',
          redirect: '/eventos/lista'
        },
        {
          path: 'lista',
          name: 'listaDeEvento',
          component: EventosListView
        },
        {
          path: ':id',
          name: 'evento-detalhes',
          component: EventoView,
          props: true
        }
      ]
    },
    {
      path: '/auth',
      children: [
        {
          path: '',
          redirect: '/auth/login'
        },
        {
          path: 'login',
          name: 'login',
          component: LoginAndCadastroView
        }
      ]
    },
    {
      path: '/usuario',
      beforeEnter: GuardAdmin.authUser,
      children: [
        {
          path: '',
          redirect: '/usuario/perfil'
        },
        {
          path: 'perfil',
          name: 'usuario',
          component: UsuarioView
        },
        {
          path: 'ingressos',
          name: 'meus-ingressos',
          component: () => import('../components/User/MeusIngressosComponent.vue')
        },
        {
          path: 'historico',
          name: 'historico',
          component: () => import('../components/User/HistoricoComponent.vue')
        }
      ]
    },
    {
      path: '/admin',
      beforeEnter: GuardAdmin.authAdmin,
      children: [
        {
          path: '',
          name: 'admin',
          component: AdminView
        },
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: AdminView
        },
        {
          path: 'teste',
          name: 'teste', 
          component: () => import('../components/admin/AdminComponent.vue')
        }
      ]
    }
  ],
});

export default router;
