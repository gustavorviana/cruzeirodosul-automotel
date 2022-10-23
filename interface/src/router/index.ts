import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Login.vue";
import NotFoundPage from "@/views/Errors/404.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Dashboard,
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      component: NotFoundPage,
      path: "/:catchAll(.*)",
      name: "NotFound"
    }
  ],
});

export default router;
