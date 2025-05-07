// components/PaletteDisplay.tsx
import { PaletteIcon } from './Icons';  // Correct import path
import { CopyIcon } from './Icons';    // For the copy functionality

interface PaletteDisplayProps {
  colors: string[];
}

export default function PaletteDisplay({ colors }: PaletteDisplayProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="font-bold text-xl mb-6 flex items-center gap-2">
        <PaletteIcon className="w-5 h-5" />
        Color Palette
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {colors.map((color, i) => (
          <div key={i} className="group">
            <div
              style={{ backgroundColor: color }}
              className="w-full h-24 rounded-lg mb-2 transition-transform group-hover:scale-105"
            />
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm">{color}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(color)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <CopyIcon className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {colors.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>Your palette will appear here</p>
        </div>
      )}
    </div>
  );
}