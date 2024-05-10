import { createDirectStore } from "direct-vuex";
import paintingsDataModule from "@/store/paintingsDataModule";
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
    paintingsData: paintingsDataModule,
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
