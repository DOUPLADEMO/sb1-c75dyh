import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin SDK only once
if (!getApps().length) {
    const firebaseCredentials = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
            ? (process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'))
            : undefined,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };
    console.log(firebaseCredentials);
    initializeApp({
        credential: cert(firebaseCredentials),
    });
}


const db = getFirestore();
const auth = getAuth();

export { db, auth };
