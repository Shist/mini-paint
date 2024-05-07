import { createDirectStore } from "direct-vuex";
import signInModule from "@/store/signInModule";
import signUpModule from "@/store/signUpModule";
import themeModule from "@/store/themeModule";
import toastModule from "@/store/toastModule";
import userDataModule from "@/store/userDataModule";

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
} = createDirectStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    signIn: signInModule,
    signUp: signUpModule,
    theme: themeModule,
    toast: toastModule,
    userData: userDataModule,
  },
});

export default store;

export {
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
};
