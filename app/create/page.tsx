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
                    <ul className="">
                        <li>
                            <Link href="/create/basic-form" className="inline-block px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700 transition-colors duration-300">
                                Create Story with Basic Form
                            </Link>
                        </li>
                        <li>
                            <Link href="/create/advanced-form" className="inline-block px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700 transition-colors duration-300">
                                Create Story with Advanced Form
                            </Link>
                        </li>
                        <li>
                            <Link href="/create/image-upload" className="inline-block px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700 transition-colors duration-300">
                                Create Story with image upload
                            </Link>
                        </li>
                        <li>
                            <Link href="/create/freetype" className="inline-block px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700 transition-colors duration-300">
                                Create Story with free type text
                            </Link>
                        </li>
                        {/* Add more links here as needed */}
                    </ul>
                </Card>
            </div>
        </div>
    );
}
