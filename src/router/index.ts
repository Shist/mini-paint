import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import SignInPage from "@/pages/SignInPage.vue";
import SignUpPage from "@/pages/SignUpPage.vue";
import NewPaintingPage from "@/pages/NewPaintingPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: MainPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/sign-in",
    component: SignInPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/sign-up",
    component: SignUpPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/new-painting",
    component: NewPaintingPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/:catchAll(.*)",
    component: NotFoundPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const userUid = store.state.userData.userUid;

  if (to.meta.requiresAuth) {
    !userUid ? next("/sign-in") : next();
  } else {
    userUid ? next("/") : next();
  }
});

export default router;
