import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface UploadZoneProps {
    onDrop: (files: File[]) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onDrop }) => {
    const { t } = useTranslation();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png']
        },
        maxSize: 5242880, // 5MB
    });

    return (
        <div
            {...getRootProps()}
            className={`
          border-4 border-dashed rounded-lg p-10
          flex flex-col items-center justify-center
          transition-colors cursor-pointer
          ${isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'}
        `}
        >
            <input {...getInputProps()} />
            <div className="text-center">
                {isDragActive ? (
                    <ImageIcon className="w-16 h-16 mx-auto text-purple-500 mb-4" />
                ) : (
                    <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                )}
                <p className="text-xl font-medium mb-2">{t('dropzone')}</p>
                <p className="text-sm text-gray-500"> PNG (max. 4MB)</p>
            </div>
        </div>
    );
};