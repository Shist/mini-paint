import { defineModule } from "direct-vuex";
import { updateGlobalOptions } from "vue3-toastify";

export interface IThemeState {
  currTheme: "light" | "dark";
}

const themeModule = defineModule({
  state: (): IThemeState => ({
    currTheme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
  }),
  getters: {},
  mutations: {
    setCurrTheme(state, currTheme: "light" | "dark") {
      state.currTheme = currTheme;
      localStorage.setItem("theme", currTheme);
      updateGlobalOptions({ clearOnUrlChange: false, theme: currTheme });
    },
  },
  actions: {},
  namespaced: true,
});

export default themeModule;
