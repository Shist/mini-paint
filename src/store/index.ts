import { createDirectStore } from "direct-vuex";
import firebaseModule from "@/store/firebaseModule";

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
  modules: { firebase: firebaseModule },
});

export default store;

export {
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
};
