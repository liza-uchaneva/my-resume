import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Projects from "../views/Projects.vue";
// import Blog from "../views/Blog.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/projects",
    name: "projects",
    component: Projects,
  },
  // {
  //   path: "/blog",
  //   name: "blog",
  //   component: Blog,
  // },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;