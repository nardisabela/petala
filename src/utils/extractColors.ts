type RGBColor = [number, number, number]; // [R, G, B]

/**
 * Extracts a visually distinct color palette from an image
 * @param img - HTML Image element to analyze
 * @param paletteSize - Number of colors to extract (default: 5)
 * @returns Array of hex color strings
 */
export function extractColors(img: HTMLImageElement, paletteSize = 5): string[] {
  // Set up canvas for image analysis
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = Math.min(img.width, 200); // Limit size for performance
  canvas.height = Math.min(img.height, 200);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const colorFrequency = new Map<string, number>();

  // Sample pixels and group similar colors
  for (let i = 0; i < pixelData.length; i += 16) { // Process every 4th pixel
    const r = pixelData[i];
    const g = pixelData[i + 1];
    const b = pixelData[i + 2];
    
    // Group similar colors by rounding values (adjust 30 for more/less grouping)
    const colorKey = `${Math.round(r/30)*30},${Math.round(g/30)*30},${Math.round(b/30)*30}`;
    colorFrequency.set(colorKey, (colorFrequency.get(colorKey) || 0) + 1);
  }

  // Sort colors by frequency (most common first)
  const sortedByFrequency = Array.from(colorFrequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, paletteSize * 3); // Take top candidates

  // Select visually distinct colors
  const distinctColors: string[] = [];
  const minColorDifference = 60; // Minimum RGB distance between colors

  for (const [colorKey] of sortedByFrequency) {
    const [r, g, b] = colorKey.split(',').map(Number);
    const hexColor = rgbToHex(r, g, b);
    
    // Check if color is sufficiently different from selected colors
    const isDistinct = distinctColors.every(existingHex => {
      const [er, eg, eb] = hexToRgb(existingHex);
      const difference = Math.sqrt((r-er)**2 + (g-eg)**2 + (b-eb)**2);
      return difference > minColorDifference;
    });

    if (isDistinct && distinctColors.length < paletteSize) {
      distinctColors.push(hexColor);
    }
  }

  return distinctColors.length > 0 ? distinctColors : ['#FFFFFF']; // Fallback
}

/** Converts RGB values to hex string */
function rgbToHex(r: number, g: number, b: number): string {
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/** Converts hex string to RGB values */
function hexToRgb(hex: string): RGBColor {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16)
  ];
}