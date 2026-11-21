import Home from "../views/Home.vue";

export const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  // Old links (e.g. /projects) go to the one-page site instead of rendering nothing.
  { path: "/:pathMatch(.*)*", redirect: "/" },
];
