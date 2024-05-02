import { defineModule } from "direct-vuex";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";
import { ISignUpState } from "@/store/signUpModule";
import { ISignInState } from "@/store/signInModule";

export interface IFirebaseState {
  userUid: string | null;
}

const USERS = "todo: add firebase collection name from env file";
const NAME = "todo: add firebase field with name of user from env file";
const PAINTINGS_LIST =
  "todo: add firebase field with list of user paintings value from env file";

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
    async signUpUser(
      { state },
      { email, name, password }: Omit<ISignUpState, "repeatPassword">
    ) {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);

      const db = getFirestore();
      await setDoc(doc(db, USERS, state.userUid), {
        [NAME]: name,
        [PAINTINGS_LIST]: [],
      });
    },
    async signInUser(context, { email, password }: ISignInState) {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    },
  },
  namespaced: true,
});

export default firebaseModule;
