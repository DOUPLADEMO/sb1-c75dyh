"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useTranslation } from 'react-i18next';

export default function LandingPage() {
    const { t } = useTranslation();

    return (
        <div className="container max-w-6xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                    <h1 className="text-3xl font-bold mb-8">{t('createPage.title')}</h1>
                    <p className="mb-4">{t('createPage.subtitle')}</p>
                    <div className="grid grid-cols-1 gap-4">
                        <Link href="/create/basic-form">
                            <Card className="p-4 hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-xl font-bold">{t('createPage.basicForm.title')}</h2>
                                <p className="text-gray-600">{t('createPage.basicForm.description')}</p>
                            </Card>
                        </Link>
                        <Link href="/create/advanced-form">
                            <Card className="p-4 hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-xl font-bold">{t('createPage.advancedForm.title')}</h2>
                                <p className="text-gray-600">{t('createPage.advancedForm.description')}</p>
                            </Card>
                        </Link>
                        <Link href="/create/image-upload">
                            <Card className="p-4 hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-xl font-bold">{t('createPage.imageUpload.title')}</h2>
                                <p className="text-gray-600">{t('createPage.imageUpload.description')}</p>
                            </Card>
                        </Link>
                        <Link href="/create/freetype">
                            <Card className="p-4 hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-xl font-bold">{t('createPage.freeType.title')}</h2>
                                <p className="text-gray-600">{t('createPage.freeType.description')}</p>
                            </Card>
                        </Link>
                        {/* Add more links here as needed */}
                    </div>
                </Card>
            </div>
        </div>
    );
}
