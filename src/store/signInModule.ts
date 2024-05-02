import { defineModule } from "direct-vuex";

export interface ISignInState {
  email: string;
  password: string;
}

const signInModule = defineModule({
  state: (): ISignInState => ({
    email: "",
    password: "",
  }),
  getters: {},
  mutations: {
    setEmail(state, email: string) {
      state.email = email;
    },
    setPassword(state, password: string) {
      state.password = password;
    },
  },
  actions: {},
  namespaced: true,
});

export default signInModule;
