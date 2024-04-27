import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// FIREBASE CONFIGURATION
const firebaseConfig = {
	apiKey: import.meta.env.FIREBASE_API_KEY,
	authDomain: "sks-price-manager.firebaseapp.com",
	projectId: "sks-price-manager",
	storageBucket: "sks-price-manager.appspot.com",
	messagingSenderId: import.meta.env.FIREBASE_MSG_ID,
	appId: import.meta.env.FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore database and get a reference to the service
export const database = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
