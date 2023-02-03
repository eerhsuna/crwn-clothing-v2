// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZbk2qkSww92-fwQ0Nbh6kmdZpeKrf8-4",
  authDomain: "crwn-clothing-by-anushree.firebaseapp.com",
  projectId: "crwn-clothing-by-anushree",
  storageBucket: "crwn-clothing-by-anushree.appspot.com",
  messagingSenderId: "433468788299",
  appId: "1:433468788299:web:5db7423708b169840007ce",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//declared as class because there can be different providers-google, facebook, etc--> in that case change it to name provider--> just for clarification
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  //if user data does not exists
  if (!userSnapshot.exists()) {
    //create/set the document with the data from outside in my collection
    const { displayName, email } = userAuth;
    const createdAt = Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error while creating the user", error.message);
    }
  }

  //if user data exists
  //return userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
