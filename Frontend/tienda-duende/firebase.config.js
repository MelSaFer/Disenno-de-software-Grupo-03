// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import * as Constants from "./constants";

export const firebaseConfig = {
  apiKey: Constants.apiKey,
  authDomain: Constants.authDomain,
  projectId: Constants.projectId,
  storageBucket: Constants.storageBucket,
  messagingSenderId: Constants.messagingSenderId,
  appId: Constants.appId,
  measurementId: Constants.measurementId,
};

// Initialize Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
// Initialize Firebase auth
export const auth = getAuth();