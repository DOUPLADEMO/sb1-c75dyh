"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../i18n';
import { Upload, Wand2, BookOpen, Share2, RotateCcw } from 'lucide-react';
import { UploadZone } from '@/components/input/UploadZone';
import { UploadedImage, VisionAnalysisResult } from '@/lib/types/story';
import { Button } from '@/components/ui/button';
import ImageUploader from '@/components/ImageUploader';
import LoadingState from '@/components/LoadingState';
import AnalysisResults from '@/components/AnalysisResults';
import visionService from '@/lib/visionService';
import { toast } from 'sonner';

export default function Input2() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [enhancedImageUrl, setEnhancedImageUrl] = useState<string | null>(null);

  const steps = [
    { icon: Upload, title: t('steps.step1'), desc: t('steps.step1desc'), color: 'from-blue-500 to-purple-500' },
    { icon: Wand2, title: t('steps.step2'), desc: t('steps.step2desc'), color: 'from-purple-500 to-pink-500' },
    { icon: BookOpen, title: t('steps.step3'), desc: t('steps.step3desc'), color: 'from-pink-500 to-orange-500' },
    { icon: Share2, title: t('steps.step4'), desc: t('steps.step4desc'), color: 'from-orange-500 to-yellow-500' }
  ];

  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<VisionAnalysisResult | null>(null);

  const handleImageUploaded = (image: UploadedImage) => {
    setUploadedImage(image);
    setAnalysisResults(null);
    analyzeImage(image);
  };

  const analyzeImage = async (image: UploadedImage) => {
    if (!image.file) return;

    try {
      setIsAnalyzing(true);
      const results = await visionService.analyzeImage(image.file);
      setAnalysisResults(results);

      if (!results.error) {
        toast.success("Analysis complete!");
      }
    } catch (error) {
      console.error("Error during analysis:", error);
      toast.error("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setUploadedImage(null);
    setAnalysisResults(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
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

      <main className="flex-1 container max-w-screen-xl py-8 px-4 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <ImageUploader
                onImageUploaded={handleImageUploaded}
                isAnalyzing={isAnalyzing}
              />

              {uploadedImage && (
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={resetAnalysis}
                    disabled={isAnalyzing}
                  >
                    <RotateCcw size={16} className="mr-2" />
                    Try another image
                  </Button>
                </div>
              )}
            </div>

            <div className="h-full flex items-center">
              {isAnalyzing ? (
                <LoadingState className="w-full" />
              ) : analysisResults ? (
                <AnalysisResults
                  results={analysisResults}
                  imageSrc={uploadedImage?.preview || ""}
                  className="w-full"
                />
              ) : (
                <div className="w-full h-full min-h-[300px] flex items-center justify-center p-6 border border-dashed rounded-lg text-center bg-muted/30">
                  <div className="max-w-md">
                    <h3 className="text-lg font-medium mb-2">No image analyzed yet</h3>
                    <p className="text-muted-foreground text-sm">
                      Upload a drawing using the panel on the left to see the analysis results here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
