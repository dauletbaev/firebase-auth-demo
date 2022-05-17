import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB3oxPp6cJxh2S9kxnrg4cDJN_z__s6-nc',
  authDomain: 'auth-demo-949b1.firebaseapp.com',
  projectId: 'auth-demo-949b1',
  storageBucket: 'auth-demo-949b1.appspot.com',
  messagingSenderId: '790466764051',
  appId: '1:790466764051:web:252eeecf21b10de52e4ee6',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);