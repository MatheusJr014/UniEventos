import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EventoView from "@/views/EventoView.vue";
import AdminView from "@/views/AdminView.vue";
import UsuarioView from "@/views/UsuarioView.vue";
import EventosListView from "@/views/EventosListView.vue";
import GuardAdmin from '../services/middleware/AuthAdmin'; 
import GuardUser from '../services/middleware/AuthUser'; 
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
      path: '/evento/:id',  
      name: 'evento-detalhes',
      component: EventoView,
      props: true
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
      path: '/login',
      name: 'login',
      component: LoginAndCadastroView
    },
    {
      path: '/teste/',
      name: 'teste', 
      component: ()=>import('../components/loginEcadastro/MainComponent.vue')
    }
  ],
});

export default router;
