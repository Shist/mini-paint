import { createApp, App as IApp } from "vue";
import App from "@/App.vue";
import components from "@/components/UI";
import router from "@/router";
import store from "@/store";
import { User } from "firebase/auth";
import {
  onFirebaseAuthStateChanged,
  loadUserNameByUid,
} from "@/services/firebase";
import Vue3Toasity from "vue3-toastify";
import "@/styles/reset.css";

let app: IApp | null = null;

onFirebaseAuthStateChanged((user: User | null) => {
  if (!app) {
    app = createApp(App);

    components.forEach((component) => {
      if (component.name) {
        app?.component(component.name, component);
      }
    });

    app
      .use(router)
      .use(store.original)
      .use(Vue3Toasity, {
        clearOnUrlChange: false,
        theme: store.original.state.theme.currTheme,
      })
      .mount("#app");
  }

  store.original.commit("userData/setUserUid", user ? user.uid : null);
  store.original.commit("userData/setUserEmail", user ? user.email : null);

  store.original.commit("userData/setUserName", "(the name is loading...)");
  loadUserNameByUid(user ? user.uid : null).catch(() => {
    store.original.commit("userData/setUserName", "(error while loading)");
  });
});
