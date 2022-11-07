import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Rooms from "@/views/Rooms.vue";
import Customer from "@/views/Customer.vue";
import Login from "@/views/Login.vue";
import Stock from "@/views/Stock.vue";
import Users from "@/views/Users.vue";
import NotFoundPage from "@/views/Errors/404.vue";
import { getCurrentUser } from "../utils/UserUtils";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Dashboard,
    },
    {
      path: "/quartos",
      name: "Rooms",
      component: Rooms,
    },
    {
      path: "/clientes",
      name: "Customers",
      component: Customer,
    },
    {
      path: "/estoque",
      name: "Stock",
      component: Stock
    },
    {
      path: "/usuarios",
      name: "Users",
      component: Users,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        ignoreLogin: true
      }
    },
    {
      component: NotFoundPage,
      path: "/:catchAll(.*)",
      name: "NotFound",
      meta: {
        ignoreLogin: true
      }
    }
  ],
});
router.beforeEach((to, from, next) => {
  const hasUser = !!getCurrentUser();
  if (to.name == "Login" && hasUser)
    return next("/");

  if (to.name == "NotFound")
    return next();

  if (!hasUser && to.name != 'Login')
    return next('/login');

  next();
});
export default router;
