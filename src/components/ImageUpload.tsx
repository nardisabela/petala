import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon } from './Icons'; // Make sure this exists

interface ImageUploadProps {
  onImageUpload: (img: HTMLImageElement) => void;
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => onImageUpload(img);
    };
    
    reader.readAsDataURL(file);
  }, [onImageUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1
  });

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
      <div {...getRootProps()} className="p-8 cursor-pointer">
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-blue-50 rounded-full">
            <UploadIcon className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h3 className="font-medium text-lg">Drag & drop an image</h3>
            <p className="text-gray-500 text-sm">or click to browse</p>
          </div>
        </div>
      </div>

      {preview && (
        <div className="border-t border-gray-200 p-4">
          <img 
            src={preview} 
            alt="Preview" 
            className="rounded-lg object-cover w-full h-64"
          />
        </div>
      )}
    </div>
  );
}