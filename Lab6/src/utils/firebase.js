import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { ref, getDatabase, set, update, child, get } from 'firebase/database'
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCKFsCChb9mlTV1v-NT_8FUSysj9kH3mtk",
  authDomain: "autorization-350818.firebaseapp.com",
  projectId: "autorization-350818",
  storageBucket: "autorization-350818.appspot.com",
  messagingSenderId: "490521543967",
  appId: "1:490521543967:web:df9c8a794de6a1a1275c2a",
  measurementId: "G-BEC80WQCVS",
  databaseURL: "https://autorization-350818-default-rtdb.europe-west1.firebasedatabase.app/"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();
const googleProvider = new GoogleAuthProvider();
let useruid=0;



const logInWithEmailAndPassword = async (email, password, setUserData, userData) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const dbRef = ref(db);
    let prevUserData = await get(child(dbRef, `users/${res.user.uid}`))
    if (!prevUserData.exists())
      return false;
    let user_data = {
      ...prevUserData.val(),
      last_login: Date.now()
    }
    const updates = {};
    updates['users/' + res.user.uid] = user_data;

    update(ref(db), updates);

    setUserData({ useruid: res.user.uid, userenter: true })
    useruid=res.user.uid;
    alert('User Logged In!!')
    return true;
  } catch (err) {
    console.error(err);
    alert(err.message);
    return false;
  }
};

const GetData = async () => {
  const dbRef = ref(db);
  let prevUserData = await get(child(dbRef, `users/${useruid}`))
  if (!prevUserData.exists())
    return false;
  let res=prevUserData.val().list;
  return  res;
};

const LoadDataList = async (new_list) =>{
  let object=JSON.stringify(new_list);
  const dbRef = ref(db);
  let prevUserData = await get(child(dbRef, `users/${useruid}`));
  let user_data = {
    ...prevUserData.val(),
    list: object
  }
  const updates = {};
  updates['users/' + useruid] = user_data;
  update(ref(db), updates);

}


const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    var user_data = {
      email: email,
      list: JSON.stringify([]),
      last_login: Date.now()
    }
    set(ref(db, 'users/' + user.uid), user_data);
    alert('User Created!!')
    return true;
  } catch (err) {
    console.error(err);
    alert(err.message);
    return false;
  }
};

export {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  GetData,
  LoadDataList 
};



