import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin SDK if not already initialized
if (!getApps().length) {
    const serviceAccount = require('@/bedtimestories1-5f241-firebase-adminsdk-fbsvc-73ac773ee4.json'); // Replace with your path
    initializeApp({
        credential: cert(serviceAccount)
    });
}

const db = getFirestore();
const auth = getAuth();

export { db, auth };
