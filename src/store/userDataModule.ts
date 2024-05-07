import { defineModule } from "direct-vuex";

export interface IUserDataState {
  userUid: string | null;
  userEmail: string | null;
  userName: string | null;
}

const userDataModule = defineModule({
  state: (): IUserDataState => ({
    userUid: null,
    userEmail: null,
    userName: null,
  }),

  getters: {},

  mutations: {
    setUserUid(state, userUid: string | null) {
      state.userUid = userUid;
    },
    setUserEmail(state, userEmail: string | null) {
      state.userEmail = userEmail;
    },
    setUserName(state, userName: string | null) {
      state.userName = userName;
    },
  },

  actions: {},

  namespaced: true,
});

export default userDataModule;
