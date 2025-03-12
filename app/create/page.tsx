"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
    return (
        <div className="container max-w-6xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                    <h1 className="text-3xl font-bold mb-8">Welcome to the Story Creator</h1>
                    <p className="mb-4">Choose an option to get started:</p>
                    <div className="grid grid-cols-1 gap-4">
                        <Link href="/create/basic-form">
                            <Card className="p-4 hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-xl font-bold">Create Story with Basic Form</h2>
                                <p className="text-gray-600">Use a simple form to create your story.</p>
                            </Card>
                        </Link>
                        <Link href="/create/advanced-form">
                            <Card className="p-4 hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-xl font-bold">Create Story with Advanced Form</h2>
                                <p className="text-gray-600">Use an advanced form with more options.</p>
                            </Card>
                        </Link>
                        <Link href="/create/image-upload">
                            <Card className="p-4 hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-xl font-bold">Create Story with Image Upload</h2>
                                <p className="text-gray-600">Upload images to enhance your story.</p>
                            </Card>
                        </Link>
                        <Link href="/create/freetype">
                            <Card className="p-4 hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-xl font-bold">Create Story with Free Type Text</h2>
                                <p className="text-gray-600">Type your story freely without constraints.</p>
                            </Card>
                        </Link>
                        {/* Add more links here as needed */}
                    </div>
                </Card>
            </div>
        </div>
    );
}
