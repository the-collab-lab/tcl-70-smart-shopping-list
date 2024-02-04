import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAP-AdidYHRKJNfHIKpDlvasLzSDLSKiF0',
	authDomain: 'tcl-70-smart-shopping-list.firebaseapp.com',
	projectId: 'tcl-70-smart-shopping-list',
	storageBucket: 'tcl-70-smart-shopping-list.appspot.com',
	messagingSenderId: '769899901278',
	appId: '1:769899901278:web:081730f939b2aba298dfcf',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
