import { createDirectStore } from "direct-vuex";
import burgerMenuModule from "@/store/burgerMenuModule";
import firebaseModule from "@/store/firebaseModule";
import signInModule from "@/store/signInModule";
import signUpModule from "@/store/signUpModule";
import toastModule from "@/store/toastModule";

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
