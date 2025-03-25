
import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { UploadedImage } from "@/lib/types/story";

interface ImageUploaderProps {
  onImageUploaded: (image: UploadedImage) => void;
  isAnalyzing: boolean;
  className?: string;
}

const ImageUploader = ({ onImageUploaded, isAnalyzing, className }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      if (isAnalyzing) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [isAnalyzing]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isAnalyzing) return;

      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    },
    [isAnalyzing]
  );

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = {
        file,
        preview: reader.result as string
      };
      setUploadedImage(image);
      onImageUploaded(image);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <Card
      className={cn(
        "p-6 transition-all duration-300 animate-scale-in",
        isDragging ? "ring-2 ring-primary ring-offset-2" : "",
        className
      )}
    >
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300",
          isDragging ? "border-primary bg-primary/5" : "border-muted bg-muted/30",
          isAnalyzing ? "opacity-70 pointer-events-none" : "hover:border-primary hover:bg-primary/5"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isAnalyzing && fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          disabled={isAnalyzing}
        />

        {uploadedImage ? (
          <div className="relative w-full max-w-md">
            <div className="rounded-lg overflow-hidden shadow-soft animate-fade-in">
              <img
                src={uploadedImage.preview}
                alt="Preview"
                className="w-full h-auto max-h-[400px] object-contain rounded-lg"
              />
            </div>

            {!isAnalyzing && (
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-foreground shadow-soft transition-all hover:bg-white"
                aria-label="Remove image"
              >
                <X size={18} />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-pulse-soft">
              {isAnalyzing ? (
                <ImageIcon className="text-primary" size={24} />
              ) : (
                <UploadCloud className="text-primary" size={24} />
              )}
            </div>
            <h3 className="text-lg font-medium mb-2">Upload an image</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Drag and drop an image here, or click to select one from your device
            </p>
            <p className="text-xs text-muted-foreground">
              Supports: JPG, PNG, GIF (Max 5MB)
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ImageUploader;
