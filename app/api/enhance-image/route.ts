import { NextResponse } from 'next/server';
import { enhanceImage } from '@/lib/openai';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        const imageUrl = await enhanceImage(file);
        return NextResponse.json({ imageUrl });
    } catch (error: any) {
        console.error('Error enhancing image:', error);
        return NextResponse.json(
            { error: 'Failed to enhance image' },
            { status: 500 }
        );
    }
}
