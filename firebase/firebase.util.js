import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

export const createUserDocumentProfile = async (userAuth, additionalData) => {
  if (!userAuth) return; // exits out if the user is not logged in

  const userRef = firestore.doc(`users/${userAuth.uid}`); //retrives data from users collection
  const snapShot = await userRef.get(); //gets the user
  // console.log(snapShot)

  // if user dosent exists create a new user
  if (!snapShot.exists) {
    const { displayName, email } = userAuth; // destructuring diaplay name and email
    const createdAt = new Date(); //

    try {
      // set is userd to insert data into the db
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error);
    }
  }

  return userRef;
};


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;