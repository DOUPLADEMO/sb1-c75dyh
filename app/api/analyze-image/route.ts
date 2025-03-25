const vision = require('@google-cloud/vision');
import { NextResponse } from 'next/server';


const client = new vision.ImageAnnotatorClient({
    keyFilename: './hse-digital-a878c65e6bef.json', // keep this secret!
});

export async function POST(request: Request, res: Response) {
    const formData = await request.formData();
    const file = formData.get('file') as File;


    try {
        const [result] = await client.annotateImage({
            image: { content: file },
            features: [
                { type: 'LABEL_DETECTION', maxResults: 50 },
                { type: 'OBJECT_LOCALIZATION', maxResults: 50 },
                { type: 'TEXT_DETECTION' },
                { type: 'FACE_DETECTION' },
                { type: 'SAFE_SEARCH_DETECTION' },
            ],
        });

        return NextResponse.json({ result });

    } catch (err) {
        console.error('Vision API error:', err);
        return NextResponse.json(
            { error: 'Failed to analyze image' },
            { status: 500 }
        );
    }
};
