import { initializeApp } from 'firebase/app';
import { getPerformance } from "firebase/performance";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const app = initializeApp({
    apiKey: 'AIzaSyCrB3XXShwe1yatQa1oNNqE5FuNIURZxLs',
    authDomain: 'portfoliobuilder-6fbc5.firebaseapp.com',
    projectId: 'portfoliobuilder-6fbc5',
    storageBucket: 'portfoliobuilder-6fbc5.appspot.com',
    messagingSenderId: '1061345779794',
    appId: '1:1061345779794:web:84bbeb72a6e26a78abff8b',
    measurementId: 'G-D0ZTK65H5S',
});

export const performance = getPerformance(app)
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;