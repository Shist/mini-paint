import { createDirectStore } from "direct-vuex";
import burgerMenuModule from "@/store/burgerMenuModule";
import firebaseModule from "@/store/firebaseModule";
import signInModule from "@/store/signInModule";
import signUpModule from "@/store/signUpModule";
import toastModule from "@/store/toastModule";

export interface IMainStoreState {
  darkTheme: boolean;
}

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
} = createDirectStore({
  state: (): IMainStoreState => ({
    darkTheme: localStorage.getItem("theme") === "dark",
  }),
  getters: {},
  mutations: {
    setDarkTheme(state, darkTheme: boolean) {
      state.darkTheme = darkTheme;
      localStorage.setItem("theme", darkTheme ? "dark" : "light");
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
