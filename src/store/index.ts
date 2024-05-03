import { createDirectStore } from "direct-vuex";
import burgerMenuModule from "@/store/burgerMenuModule";
import firebaseModule from "@/store/firebaseModule";
import signInModule from "@/store/signInModule";
import signUpModule from "@/store/signUpModule";
import toastModule from "@/store/toastModule";
import { updateGlobalOptions } from "vue3-toastify";

export interface IMainStoreState {
  theme: "light" | "dark";
}

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
} = createDirectStore({
  state: (): IMainStoreState => ({
    theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
  }),
  getters: {},
  mutations: {
    setTheme(state, theme: "light" | "dark") {
      state.theme = theme;
      localStorage.setItem("theme", theme);
      updateGlobalOptions({ clearOnUrlChange: false, theme });
    },
  },
  actions: {},
  modules: {
    burgerMenu: burgerMenuModule,
    firebase: firebaseModule,
    signIn: signInModule,
    signUp: signUpModule,
    toast: toastModule,
  },
});

export default store;

export {
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
};
