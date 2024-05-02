import { defineModule } from "direct-vuex";

export interface IBurgerMenuState {
  menuIsOpened: boolean;
}

const burgerMenuModule = defineModule({
  state: (): IBurgerMenuState => ({
    menuIsOpened: false,
  }),
  getters: {},
  mutations: {
    setMenuIsOpened(state, menuIsOpened: boolean) {
      state.menuIsOpened = menuIsOpened;
    },
  },
  actions: {},
  namespaced: true,
});

export default burgerMenuModule;
