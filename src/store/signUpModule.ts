import { defineModule } from "direct-vuex";

export interface ISignUpState {
  email: string;
  name: string;
  password: string;
  repeatPassword: string;
}

const signUpModule = defineModule({
  state: (): ISignUpState => ({
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
  }),
  getters: {},
  mutations: {
    setEmail(state, email: string) {
      state.email = email;
    },
    setName(state, name: string) {
      state.name = name;
    },
    setPassword(state, password: string) {
      state.password = password;
    },
    setRepeatPassword(state, repeatPassword) {
      state.repeatPassword = repeatPassword;
    },
  },
  actions: {},
  namespaced: true,
});

export default signUpModule;
