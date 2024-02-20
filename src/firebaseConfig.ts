import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getDatabase, ref, set} from 'firebase/database';

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_APP_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
});

export const auth = app.auth();
export default app;

export const db = getDatabase();

export function writeUserData(
  userId: string, 
  firebaseId: string,
  email: string, 
  name: string, 
  country: string, 
  city: string, 
  address: string, 
  description: string, 
  phoneNumber: string) {
  const reference = ref(db, 'users/' + userId)

  set(reference, {
    firebaseId: firebaseId,
    email: email,
    name: name,
    country: country,
    city: city,
    address: address,
    description: description,
    phoneNumber: phoneNumber,
  })
}