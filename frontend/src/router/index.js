import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EventoView from "@/views/EventoView.vue";
import AdminView from "@/views/AdminView.vue";
import UsuarioView from "@/views/UsuarioView.vue";
import EventosListView from "@/views/EventosListView.vue";
import GuardAdmin from '../middleware/AuthAdmin'; 
import GuardUser from '../middleware/AuthUser'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: '/eventos',
      name: 'teste',
      component: EventoView,
    },
    {
      path: '/admin',
      name: 'admin',
      beforeEnter: GuardAdmin.authAdmin,
      component: AdminView
    },
    {
      path: '/perfil/usuario',
      name: 'usuario',
      component: UsuarioView
    },
    {
      path:'/lista/eventos',
      name: 'listaDeEvento',
      component: EventosListView
    },
    {
      path: '/teste/',
      name: 'teste', 
      component: ()=>import('../components/login e cadastro/cadastro.vue')
    }
  ],
});

export default router;
