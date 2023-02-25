import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/db",
      name: "db",
      component: () => import("../components/Dashboardv2/Dashboard.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../components/Dashboard.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: () => import("../components/Detail.vue"),
    },
    {
      path: "/course/:id",
      name: "course",
      component: () => import("../components/Course.vue"),
    },
    {
      path: "/list-courses/",
      name: "list-courses",
      component: () => import("../components/ListCourses.vue"),
    },
    {
      path: "/validate/:token",
      name: "validate",
      component: () => import("../components/Validate.vue"),
    },
  ],
});

export default router;
