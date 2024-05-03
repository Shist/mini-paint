import { createApp } from "vue";
import App from "@/App.vue";
import components from "@/components/UI";
import router from "@/router";
import store from "@/store";
import Vue3Toasity from "vue3-toastify";
import "@/styles/reset.css";

const app = createApp(App);

components.forEach((component) => {
  if (component.name) {
    app.component(component.name, component);
  }
});

app
  .use(router)
  .use(store.original)
  .use(Vue3Toasity, { clearOnUrlChange: false })
  .mount("#app");
