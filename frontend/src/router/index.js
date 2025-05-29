import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EventoView from "@/views/EventoView.vue";
import AdminView from "@/views/AdminView.vue";
import UsuarioView from "@/views/UsuarioView.vue";
import EventosListView from "@/views/EventosListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
<<<<<<< HEAD
      path: '/eventos',
      name: 'teste',
      component: EventoView,
    },
    {
      path: '/admin',
      name: 'teste2',
      component: AdminView
    },
    {
      path: '/usuario',
      name: 'teste3',
      component: UsuarioView
    },
    {
      path:'/lista/eventos',
      name: 'teste4',
      component: EventosListView
    }
=======
      path: "/evento",
      name: "evento",
      component: EventoView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: AdminView,
    },
    {
      path: "/perfil",
      name: "perfil",
      component: UsuarioView,
    },
    {
      path: "/eventos",
      name: "eventos",
      component: EventosListView,
    },
>>>>>>> 49f30c86f6255fba97b50cd79c2f3eced19b25c0
  ],
});

export default router;
