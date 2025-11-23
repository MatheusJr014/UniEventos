import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Publico/HomeView.vue";
import EventoView from "@/views/Publico/EventoView.vue";
import AdminView from "@/views/Admin/AdminView.vue";
import UsuarioView from "@/views/User/UsuarioView.vue";
import EventosListView from "@/views/Publico/EventosListView.vue";
import GuardAdmin from '../middleware/Auths'; 
import LoginAndCadastroView from "@/views/Publico/LoginAndCadastroView.vue";
import ContatoView from "@/views/Publico/ContatoView.vue";
import SobreView from "@/views/Publico/SobreView.vue";
import ParaOrganizadoresView from "@/views/Publico/ParaOrganizadoresView.vue";
import CategoriasView from "@/views/Publico/CategoriasView.vue";
import MaintenancePage from "@/components/Publico/common/404ErrorDev.vue";
import Teste from "@/components/teste.vue";

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
      path: '/manutencao',
      name: 'manutencao',
      component: MaintenancePage
    },
    {
      path: '/teste',
      name: 'teste',
      component: Teste
    },
    {
      path: '/404',
      name: '404',
      component: MaintenancePage
    },
    
    
    // Rotas para páginas que ainda não foram implementadas - redirecionam para 404
    {
      path: '/termos',
      name: 'termos',
      component: MaintenancePage
    },
    {
      path: '/privacidade',
      name: 'privacidade',
      component: MaintenancePage
    },
    {
      path: '/faq',
      name: 'faq',
      component: MaintenancePage
    },
    {
      path: '/ajuda',
      name: 'ajuda',
      component: MaintenancePage
    },
    {
      path: '/politica-cancelamento',
      name: 'politica-cancelamento',
      component: MaintenancePage
    },
    {
      path: '/contato',
      name: 'contato',
      component: ContatoView
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: SobreView
    },
    {
      path: '/organizadores',
      name: 'organizadores',
      component: ParaOrganizadoresView
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: CategoriasView
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
        }
        // {
        //   path: 'teste',
        //   name: 'teste', 
        //   component: () => import('../components/admin/AdminComponent.vue')
        // }
      ]
    }
  ],
});

export default router;
