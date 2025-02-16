import { NextResponse } from 'next/server';
import { db, auth } from '../../firebase';

// Ensure Next.js does not attempt to statically optimize the route
export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { uuid: string } }) {
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

        // Fetch the specific story from Firestore
        const storyDoc = await db.collection('stories').doc(params.uuid).get();
        if (!storyDoc.exists || storyDoc.data()?.authorUid !== uid) {
            return NextResponse.json(
                { error: 'Story not found' },
                { status: 404 }
            );
        }

        const story = storyDoc.data();

        return NextResponse.json({ story });

    } catch (error: any) {
        console.error('Error fetching story:', error);
        const errorMessage = error?.message || 'Failed to fetch story';
        const statusCode = error?.status || 500;

        return NextResponse.json(
            { error: errorMessage },
            { status: statusCode }
        );
    }
}
