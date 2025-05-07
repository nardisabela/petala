// pages/index.tsx
import { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import PaletteDisplay from '../components/PaletteDisplay';
import { extractColors } from '../utils/extractColors'; // Add this import

export default function Home() {
  const [colors, setColors] = useState<string[]>([]);

  const handleImageUpload = (img: HTMLImageElement) => {
    const extractedColors = extractColors(img);
    setColors(extractedColors);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <main className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 mb-2">
            Petala
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Upload an image to extract its dominant colors instantly.
          </p>
        </header>

        {/* Upload Zone + Palette Display */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <ImageUpload onImageUpload={handleImageUpload} />
          <PaletteDisplay colors={colors} />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-16">
        Made with Next.js + Tailwind -
        Developed by Isabela Nardi (2025)
      </footer>
    </div>
  );
}