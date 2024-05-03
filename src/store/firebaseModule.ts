import { defineModule } from "direct-vuex";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";
import { ISignUpState } from "@/store/signUpModule";
import { ISignInState } from "@/store/signInModule";

export interface IFirebaseState {
  userUid: string | null;
  userEmail: string | null;
  userName: string | null;
  userPaintings: object[] | null;
}

const USERS = process.env.VUE_APP_FIREBASE_COLLECTION;
const EMAIL = process.env.VUE_APP_FIREBASE_FIELD_EMAIL;
const NAME = process.env.VUE_APP_FIREBASE_FIELD_NAME;
const PAINTINGS_LIST = process.env.VUE_APP_FIREBASE_FIELD_PAINTINGS_LIST;

const firebaseModule = defineModule({
  state: (): IFirebaseState => ({
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
    setUserPaintings(state, userPaintings: object[] | null) {
      state.userPaintings = userPaintings;
    },
  },
  actions: {
    async signUpUser(
      { state },
      { email, name, password }: Omit<ISignUpState, "repeatPassword">
    ) {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);

      const db = getFirestore();
      await setDoc(doc(db, USERS, state.userUid), {
        [EMAIL]: email,
        [NAME]: name,
        [PAINTINGS_LIST]: [],
      });
    },
    async signInUser(context, { email, password }: ISignInState) {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    },
    async signOutUser({ commit }) {
      const auth = getAuth();
      await signOut(auth);
      commit("setUserUid", null);
      commit("setUserEmail", null);
      commit("setUserName", null);
      commit("setUserPaintings", null);
    },
  },
  namespaced: true,
});

export default firebaseModule;
