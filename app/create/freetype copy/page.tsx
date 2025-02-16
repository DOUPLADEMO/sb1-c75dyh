"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../../i18n';
import { Upload, Wand2, BookOpen, Share2, Menu } from 'lucide-react';
import { UploadZone } from '@/components/input/UploadZone';




export default function Input2() {
  const { t } = useTranslation();

  const steps = [
    { icon: Upload, title: t('steps.step1'), desc: t('steps.step1desc'), color: 'from-blue-500 to-purple-500' },
    { icon: Wand2, title: t('steps.step2'), desc: t('steps.step2desc'), color: 'from-purple-500 to-pink-500' },
    { icon: BookOpen, title: t('steps.step3'), desc: t('steps.step3desc'), color: 'from-pink-500 to-orange-500' },
    { icon: Share2, title: t('steps.step4'), desc: t('steps.step4desc'), color: 'from-orange-500 to-yellow-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            {t('welcome')}
          </h1>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">{t('steps.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-8 w-8 h-0.5 bg-gray-200" />
                  )}
                  <div className="bg-white rounded-xl shadow-lg p-6 relative hover:scale-105 transition-transform">
                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="mt-8 text-center">
                      <h3 className="font-bold mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl p-8">
              <UploadZone />
            </div>
          </div>
        </div>
      </main>
    </div >
  );
}

