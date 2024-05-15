import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  query,
  where,
  orderBy,
  startAfter,
  limit,
  Query,
  Timestamp,
} from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import store from "@/store";
import { IPainting } from "@/store/paintingsDataModule";

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

function convertFirestoreTimestampToDate(timestamp: Timestamp): Date {
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
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

async function loadUserNameByUid(userUid: string) {
  const db = getFirestore();

  const userDataDoc = doc(db, "users", userUid);

  const docSnapshot = await getDoc(userDataDoc);

  const docData = docSnapshot.data();

  store.commit.userData.setUserName(docData ? docData.name : "(empty)");
}

async function loadAllUsersPaintings(filterAuthorName?: string) {
  const db = getFirestore();

  let paintingsCollectionRef = null as Query | null;

  if (store.state.paintingsData.lastPaintingDoc) {
    paintingsCollectionRef = filterAuthorName
      ? query(
          collection(db, "paintings"),
          where("authorName", "==", filterAuthorName),
          orderBy("date", "desc"),
          startAfter(store.state.paintingsData.lastPaintingDoc),
          limit(10)
        )
      : query(
          collection(db, "paintings"),
          orderBy("date", "desc"),
          startAfter(store.state.paintingsData.lastPaintingDoc),
          limit(10)
        );
  } else {
    paintingsCollectionRef = filterAuthorName
      ? query(
          collection(db, "paintings"),
          where("authorName", "==", filterAuthorName),
          orderBy("date", "desc"),
          limit(10)
        )
      : query(collection(db, "paintings"), orderBy("date", "desc"), limit(10));
  }

  const paintingsSnapshot = await getDocs(paintingsCollectionRef);

  if (!paintingsSnapshot.docs.length) {
    return;
  }

  const lastVisible = paintingsSnapshot.docs[paintingsSnapshot.docs.length - 1];
  store.commit.paintingsData.setLastPaintingDoc(lastVisible);

  const paintings: IPainting[] = paintingsSnapshot.docs.map((paintingDoc) => ({
    id: paintingDoc.id,
    authorEmail: paintingDoc.data().authorEmail,
    authorName: paintingDoc.data().authorName,
    date: convertFirestoreTimestampToDate(paintingDoc.data().date),
    description: paintingDoc.data().description,
    imgPath: paintingDoc.data().imgPath,
  }));

  const currList = store.state.paintingsData.paintingsList || [];
  store.commit.paintingsData.setPaintingsList([...currList, ...paintings]);
}

async function uploadUserPainting(
  paintingBlob: Blob,
  paintingDescription: string
) {
  const userUid = store.state.userData.userUid;
  const userEmail = store.state.userData.userEmail;
  const userName = store.state.userData.userName;

  if (userUid === null) {
    throw new Error("Can not upload user painting: 'userUid' value is null!");
  } else if (userEmail === null) {
    throw new Error("Can not upload user painting: 'userEmail' value is null!");
  } else if (userName === null) {
    throw new Error("Can not upload user painting: 'userName' value is null!");
  }

  const paintingRef = `paintings/${userUid}/${uuidv4()}`;

  const storage = getStorage();
  const storageRef = ref(storage, paintingRef);
  await uploadBytes(storageRef, paintingBlob);

  const db = getFirestore();
  const userPaintingsCollection = collection(db, "paintings");

  const paintingData: Omit<IPainting, "id"> = {
    authorName: userName,
    authorEmail: userEmail,
    date: new Date(),
    description: paintingDescription,
    imgPath: paintingRef,
  };

  await addDoc(userPaintingsCollection, paintingData);
}

export {
  onFirebaseAuthStateChanged,
  convertFirestoreTimestampToDate,
  signUpUser,
  signInUser,
  signOutUser,
  loadUserNameByUid,
  loadAllUsersPaintings,
  uploadUserPainting,
};
