2; // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBy7Qq9StepOcXI72Hxof7b7pQxA5tyzGg",
	authDomain: "sks-price-manager.firebaseapp.com",
	projectId: "sks-price-manager",
	storageBucket: "sks-price-manager.appspot.com",
	messagingSenderId: "778978809610",
	appId: "1:778978809610:web:3c21cf36b4534f4be70cf3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore database and get a reference to the service
export const database = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
