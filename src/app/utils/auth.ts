import {
    GoogleAuthProvider, 
    signInWithPopup, 
    onAuthStateChanged as _onAuthStateChanged,
    sendSignInLinkToEmail as _sendSignInLinkToEmail, 
    signInWithPhoneNumber as _signInWithPhoneNumber, 
  } from "firebase/auth";
  import { auth } from "./firebase.js";

  export function onAuthStateChanged(cb?: any) {
    return _onAuthStateChanged(auth, cb);
  }

  export async function signInWithGoogle(success?: any) {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      await signInWithPopup(auth, provider)
        .then((result) => {
          success(result);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  }

  export async function signOut() {
    try {
      return auth.signOut();
    } catch (error) {
      console.error("Error signing out with Google", error);
    }
  }
