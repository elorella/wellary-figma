import { useState, useRef } from "react";
import { Camera, X, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";

interface ImagePickerProps {
  onImageSelect: (imageData: string | null) => void;
  currentImage?: string | null;
  maxSizeMB?: number;
}

export function ImagePicker({ 
  onImageSelect, 
  currentImage, 
  maxSizeMB = 1 
}: ImagePickerProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Calculate new dimensions (max 800px width/height)
          const MAX_SIZE = 800;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 0.7 quality
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          
          // Check size (base64 string length / 1.37 ≈ file size in bytes)
          const sizeInMB = (compressedBase64.length * 0.75) / (1024 * 1024);
          
          if (sizeInMB > maxSizeMB) {
            reject(new Error(`Image too large (${sizeInMB.toFixed(1)}MB). Please use a smaller image.`));
          } else {
            resolve(compressedBase64);
          }
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Check file size (before compression)
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 10) {
      setError('Image too large. Please use an image under 10MB.');
      return;
    }

    try {
      setError('');
      const compressedImage = await compressImage(file);
      setPreview(compressedImage);
      onImageSelect(compressedImage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image');
      setPreview(null);
      onImageSelect(null);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageSelect(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        capture="environment"
      />

      {!preview ? (
        <Button
          type="button"
          onClick={handleClick}
          variant="outline"
          className="w-full rounded-xl bg-slate-700 border-slate-600 text-white hover:bg-slate-600 hover:text-white"
        >
          <Camera className="w-4 h-4 mr-2" />
          Add Photo
        </Button>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-xl"
          />
          <Button
            type="button"
            onClick={handleRemove}
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-red-500 hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            onClick={handleClick}
            size="sm"
            variant="outline"
            className="absolute bottom-2 right-2 rounded-lg bg-slate-800/80 border-slate-600 text-white hover:bg-slate-700 text-xs"
          >
            <ImageIcon className="w-3 h-3 mr-1" />
            Change
          </Button>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
      
      <p className="text-xs text-slate-500">
        Optional: Add a photo to your entry
      </p>
    </div>
  );
}
