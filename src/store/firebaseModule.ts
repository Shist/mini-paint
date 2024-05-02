import { defineModule } from "direct-vuex";

interface firebaseState {
  userUid: string | null;
}

const firebaseModule = defineModule({
  state: (): firebaseState => ({
    userUid: null,
  }),
  getters: {},
  mutations: {
    setUserUid(state, userUid: string | null) {
      state.userUid = userUid;
    },
  },
  actions: {},
  namespaced: true,
});

export default firebaseModule;
