import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    welcome: 'Transform Your Drawings into Magical Stories',
                    upload: 'Upload Drawing',
                    dropzone: 'Drag and drop your drawing here, or click to select',
                    processing: 'Magic in Progress...',
                    login: 'Sign In to Begin',
                    steps: {
                        title: 'How It Works',
                        step1: 'Upload Your Drawing',
                        step1desc: 'Share any drawing you want to bring to life',
                        step2: 'Magic Transformation',
                        step2desc: 'Watch as AI enhances your artwork',
                        step3: 'Get Your Story',
                        step3desc: 'Receive a unique tale based on your drawing',
                        step4: 'Listen & Share',
                        step4desc: 'Enjoy the narrated story and share with friends'
                    }
                },
            },
            de: {
                translation: {
                    welcome: 'Verwandle deine Zeichnungen in magische Geschichten',
                    upload: 'Zeichnung hochladen',
                    dropzone: 'Zeichnung hier ablegen oder klicken zum Auswählen',
                    processing: 'Magie im Gange...',
                    login: 'Anmelden zum Starten',
                    steps: {
                        title: 'So funktioniert es',
                        step1: 'Zeichnung hochladen',
                        step1desc: 'Teile eine Zeichnung, die zum Leben erweckt werden soll',
                        step2: 'Magische Verwandlung',
                        step2desc: 'Sieh zu, wie KI dein Kunstwerk verbessert',
                        step3: 'Geschichte erhalten',
                        step3desc: 'Erhalte eine einzigartige Geschichte zu deiner Zeichnung',
                        step4: 'Anhören & Teilen',
                        step4desc: 'Genieße die erzählte Geschichte und teile sie mit Freunden'
                    }
                },
            },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;