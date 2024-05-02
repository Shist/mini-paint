import { defineModule } from "direct-vuex";
import { Id } from "vue3-toastify";

interface IToastState {
  currToastId: Id | null;
}

const toastModule = defineModule({
  state: (): IToastState => ({
    currToastId: null,
  }),
  getters: {},
  mutations: {
    setCurrToastId(state, currToastId: Id | null) {
      state.currToastId = currToastId;
    },
  },
  actions: {},
  namespaced: true,
});

export default toastModule;

export { IToastState };
