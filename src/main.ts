import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import Vue3Toasity from "vue3-toastify";
import "@/styles/reset.css";

createApp(App)
  .use(router)
  .use(store.original)
  .use(Vue3Toasity, { clearOnUrlChange: false })
  .mount("#app");
