import { createRouter, createWebHashHistory } from "vue-router";
import Blogpost from "@/views/Blogpost.vue";
import AddPost from "@/views/AddPost.vue";
import Login from "@/views/Login.vue";
import SignUp from "@/views/SignUp.vue";



function isAuthenticated() {
  // Check if the JWT exists in localStorage
  return !!localStorage.getItem("jwt");
}


const routes = [
  {
    path: "/",
    name: "home",
    component: Blogpost,
    meta: { requiresAuth: true },
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
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const response = await fetch('http://localhost:3000/auth/authenticate', {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      });
      const data = await response.json();

      if (data.authenticated) {
        next(); // Allow access
      } else {
        console.log('User not authenticated. Redirecting to login.');
        next('/login'); // Redirect to login if not authenticated
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      next('/login'); // Redirect to login on error
    }
  } else {
    next(); // Allow access to non-protected routes
  }
});


export default router;
