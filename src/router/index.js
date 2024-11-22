import { createRouter, createWebHashHistory } from "vue-router";
import Blogpost from "@/views/Blogpost.vue";
import AddPost from "@/views/AddPost.vue";
import Login from "@/views/Login.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Blogpost,
  },
  {
    path: "/addpost",
    name: "addpost",
    component: AddPost,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
