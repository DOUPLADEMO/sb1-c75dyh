'use client'
import { useAuthContext } from "@/context/AuthContext";
import { Wand2, Menu } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import i18n from 'i18next'; // Ensure i18n is imported

function SiteHeader() {

    const { user, logout } = useAuthContext();
    const { t } = useTranslation();
    const [isRouterReady, setIsRouterReady] = useState(true);

    const handleLogout = () => {
        logout();
    };

    const handleLogin = () => {
        // redirect to signup page using next router
        window.location.href = "/signup";
    }

    const changeLanguage = useCallback((lng: string) => {
        if (isRouterReady) {
            i18n.changeLanguage(lng);
        }
    }, [isRouterReady]);

    return (<header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
                <Link href={'/'} className="flex items-center space-x-2">
                    <Wand2 className="h-8 w-8" />
                    <span className="text-2xl font-bold">Magic Doodle Story</span>
                </Link>

                <div className="flex items-center space-x-4">
                    <button onClick={() => changeLanguage('en')} className="bg-white text-purple-600 px-4 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors">
                        EN
                    </button>
                    <button onClick={() => changeLanguage('hu')} className="bg-white text-purple-600 px-4 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors">
                        HU
                    </button>
                    {user ? (
                        <>
                            <Link href="/create" className="hidden md:block">
                                {t('createNewStory')}
                            </Link>
                            <Link href="/my-stories" className="hidden md:block">
                                {t('myStories')}
                            </Link>
                            <div className="flex items-center space-x-2">
                                <Image src={user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop'} alt={user.displayName || 'User Avatar'} width={32} height={32} className="rounded-full" />
                                <span className="hidden md:block">{user.displayName}</span>
                            </div>
                            <button onClick={handleLogout} className="bg-white text-purple-600 px-4 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors">
                                {t('logout')}
                            </button>
                        </>
                    ) : (
                        <button onClick={handleLogin} className="bg-white text-purple-600 px-4 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors">
                            {t('login')}
                        </button>
                    )}
                    <button className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>
    </header>);
}

export default SiteHeader;