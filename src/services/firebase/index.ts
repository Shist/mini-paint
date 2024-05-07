import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";
import store from "@/store";

const firebaseApp = initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
});

const auth = getAuth(firebaseApp);

function onFirebaseAuthStateChanged(initFoo: (user: User | null) => void) {
  onAuthStateChanged(auth, initFoo);
}

async function signUpUser(email: string, name: string, password: string) {
  const auth = getAuth();

  const newUserInfo = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (!newUserInfo.user.uid) {
    return;
  }

  const db = getFirestore();

  await setDoc(doc(db, "users", newUserInfo.user.uid), {
    email,
    name,
  });
}

async function signInUser(email: string, password: string) {
  const auth = getAuth();

  await signInWithEmailAndPassword(auth, email, password);
}

async function signOutUser() {
  const auth = getAuth();

  await signOut(auth);

  store.commit.userData.setUserUid(null);
  store.commit.userData.setUserEmail(null);
  store.commit.userData.setUserName(null);
}

export { onFirebaseAuthStateChanged, signUpUser, signInUser, signOutUser };
