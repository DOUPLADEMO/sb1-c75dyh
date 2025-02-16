import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import * as functions from 'firebase-functions';
const adminConfig = functions.config().admin || {};

// Initialize Firebase Admin SDK only once
if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId: adminConfig.project_id || process.env.FIREBASE_PROJECT_ID,
            privateKey: (adminConfig.private_key || process.env.FIREBASE_PRIVATE_KEY)?.replace(/\\n/g, '\n'),
            clientEmail: adminConfig.client_email || process.env.FIREBASE_CLIENT_EMAIL,
        }),
    });
}


const db = getFirestore();
const auth = getAuth();

export { db, auth };
