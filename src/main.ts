import { createApp, App as IApp } from "vue";
import App from "@/App.vue";
import components from "@/components/UI";
import router from "@/router";
import store from "@/store";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Vue3Toasity from "vue3-toastify";
import "@/styles/reset.css";

const firebaseApp = initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
});

let app: IApp | null = null;

const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, (user) => {
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
        theme: store.original.state.theme,
      })
      .mount("#app");
  }

  store.original.commit("firebase/setUserUid", user ? user.uid : null);
  store.original.commit("firebase/setUserEmail", user ? user.email : null);
});
