import { createRouter, createWebHashHistory } from "vue-router";
import Blogpost from "@/views/Blogpost.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Blogpost,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
