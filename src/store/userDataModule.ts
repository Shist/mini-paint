import { defineModule } from "direct-vuex";

export interface IUserPainting {
  blobUrl: string | null;
  date: Date | null;
  description: string | null;
}

export interface IUserDataState {
  userUid: string | null;
  userEmail: string | null;
  userName: string | null;
  userPaintings: IUserPainting[] | null;
}

const userDataModule = defineModule({
  state: (): IUserDataState => ({
    userUid: null,
    userEmail: null,
    userName: null,
    userPaintings: null,
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
    setUserPaintings(state, userPaintings: IUserPainting[] | null) {
      state.userPaintings = userPaintings;
    },
  },

  actions: {},

  namespaced: true,
});

export default userDataModule;
