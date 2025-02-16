import { NextResponse } from 'next/server';
import { db, auth } from '../firebase';

// Ensure Next.js does not attempt to statically optimize the route
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        // Get the current user from the request headers
        const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];
        if (!idToken) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const decodedToken = await auth.verifyIdToken(idToken);
        const uid = decodedToken.uid;

        // Fetch the user's stories from Firestore
        const storiesSnapshot = await db.collection('stories').where('authorUid', '==', uid).get();
        const stories = storiesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json({ stories });

    } catch (error: any) {
        console.error('Error fetching stories:', error);
        const errorMessage = error?.message || 'Failed to fetch stories';
        const statusCode = error?.status || 500;

        return NextResponse.json(
            { error: errorMessage },
            { status: statusCode }
        );
    }
}
