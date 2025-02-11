import { createRouter, createWebHistory } from "vue-router";
import store from "@/stores/counter";
import HomeView from "../views/HomeView.vue";
import Product from "@/views/Product.vue";
import Category from "@/views/Category.vue";
import Search from "@/views/Search.vue";
import Cart from "@/views/Cart.vue";
import SignUp from "@/views/SignUp.vue";
import LogIn from "@/views/LogIn.vue";
import MyAccount from "@/views/MyAcoount.vue";
import Checkout from "@/views/Checkout.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/:category_slug/:product_slug",
      name: "Product",
      component: Product,
    },
    {
      path: "/:category_slug",
      name: "Category",
      component: Category,
    },
    {
      path: "/search",
      name: "Search",
      component: Search,
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart,
    },
    {
      path: "/sign-up",
      name: "SignUp",
      component: SignUp,
    },
    {
      path: "/log-in",
      name: "LogIn",
      component: LogIn,
    },
    {
      path: "/my-account",
      name: "MyAccount",
      component: MyAccount,
      meta: {
        requireLogin: true,
      },
    },
    {
      path: "/cart/checkout",
      name: "Checkout",
      component: Checkout,
      meta: {
        requireLogin: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requireLogin) &&
    !store.state.isAuthenticated
  ) {
    next({ name: "LogIn", query: { to: to.path } });
  } else {
    next();
  }
});
export default router;
