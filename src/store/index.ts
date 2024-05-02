import { createDirectStore } from "direct-vuex";
import firebaseModule from "@/store/firebaseModule";
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
  modules: { firebase: firebaseModule, toast: toastModule },
});

export default store;

export {
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
};
