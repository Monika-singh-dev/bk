import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  child,
  getDatabase,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({
        code: errorCode,
        message: errorMessage,
      });

      return null;
    });

export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({
        code: errorCode,
        message: errorMessage,
      });

      return null;
    });

export const db = getDatabase(app);

export const objName = "categories";

export async function addUserDB(uid, email) {
  await set(ref(db, uid), {
    email: email,
  });
}

export async function getNewCategoryID() {
  return push(child(ref(db), objName)).key;
}

export function addCategoryDB(id, uid, value) {
  set(ref(db, `${uid}/${objName}/${id}`), {
    name: value,
  });
}
export async function getNewBookmarkID(uid, item) {
  return push(child(ref(db), `${uid}/${objName}/${item.categoryId}`)).key;
}

export async function addBookmarkDB(id, uid, item) {
  const updates = {};
  updates[`${uid}/${objName}/${item.categoryId}/bookmarks/${id}`] = item;
  update(ref(db), updates);
}

export function removeBookmarkDB({ uid, cID, bID }) {
  remove(ref(db, `${uid}/${objName}/${cID}/bookmarks/${bID}`)).catch(
    (error) => {
      console.log("Error in deleting bookmark - ", error);
    }
  );
}

export function removeCategoryDB(uid, id) {
  remove(ref(db, `${uid}/${objName}/${id}`)).catch((error) => {
    console.log("Error in deleting category - ", error);
  });
}

export function renameCategoryDB(uid, id, newName) {
  update(ref(db, `${uid}/${objName}/${id}`), {
    name: newName,
  }).catch((error) => {
    console.log("Error in rename category - ", error);
  });
}

export function renameBookmarkDB(uid, cId, bId, newName) {
  update(ref(db, `${uid}/${objName}/${cId}/bookmarks/${bId}`), {
    title: newName,
  }).catch((error) => {
    console.log("Error in rename bookmark - ", error);
  });
}
