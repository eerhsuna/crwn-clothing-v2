// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
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
      });
    } catch (error) {
      console.log("error while creating the user", error.message);
    }
  }
  

  //if user data exists
  //return userDocRef
  return userDocRef;
};
