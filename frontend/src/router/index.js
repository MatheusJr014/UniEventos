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
  ],
});

export default router;
