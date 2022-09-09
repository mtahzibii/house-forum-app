// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: 'AIzaSyAo0Qh6lnON4IbOiTc0gvZs3_bT7jUu5_g',
 authDomain: 'house-marketplace-app-version2.firebaseapp.com',
 projectId: 'house-marketplace-app-version2',
 storageBucket: 'house-marketplace-app-version2.appspot.com',
 messagingSenderId: '232321040126',
 appId: '1:232321040126:web:069d09c0fde1d0b6aa2faf',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
