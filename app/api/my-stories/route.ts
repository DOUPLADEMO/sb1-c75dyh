import { NextResponse } from 'next/server';
import { db, auth } from '../firebase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        // Ensure Authorization header exists
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Missing or invalid token' }, { status: 401 });
        }

        // Extract and verify ID token
        const idToken = authHeader.split('Bearer ')[1].trim();
        console.log('Verifying token:', idToken);
        const decodedToken = await auth.verifyIdToken(idToken);
        console.log('Decoded token:', decodedToken);
        const uid = decodedToken.uid;
        console.log('User ID:', uid);

        // Fetch user's stories from Firestore
        const storiesSnapshot = await db.collection('stories').where('authorUid', '==', uid).get();
        console.log('Fetched stories:', storiesSnapshot.docs.length);
        const stories = storiesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log('Returning stories:', stories.length);

        return NextResponse.json({ stories });
    } catch (error: any) {
        console.error('Error verifying token:', error);

        // Handle expired tokens
        if (error.code === 'auth/id-token-expired') {
            return NextResponse.json({ error: 'Token expired, please login again' }, { status: 401 });
        }

        console.log(error);
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
}
