export default function Palette({ colors }: { colors: string[] }) {
  return (
    <div className="flex flex-wrap gap-6 mt-8 justify-center">
      {colors.map((color, i) => (
        <div key={i} className="flex flex-col items-center">
          {/* Color Swatch */}
          <div
            style={{ backgroundColor: color }}
            className="w-20 h-20 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform mb-2"
          />
          {/* Hex Code (Click to Copy) */}
          <div 
            onClick={() => {
              navigator.clipboard.writeText(color);
              alert(`Copied: ${color}`);
            }}
            className="text-sm font-mono text-gray-700 hover:text-black cursor-pointer"
          >
            {color}
          </div>
        </div>
      ))}
    </div>
  );
}