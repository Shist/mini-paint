import { defineModule } from "direct-vuex";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ISignInState } from "@/store/signInModule";

export interface IFirebaseState {
  userUid: string | null;
}

const firebaseModule = defineModule({
  state: (): IFirebaseState => ({
    userUid: null,
  }),
  getters: {},
  mutations: {
    setUserUid(state, userUid: string | null) {
      state.userUid = userUid;
    },
  },
  actions: {
    async signInUser(context, { email, password }: ISignInState) {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    },
  },
  namespaced: true,
});

export default firebaseModule;
