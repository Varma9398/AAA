import type { AspectRatio } from '../types';

export async function generateStyledImage(prompt: string, aspectRatio: AspectRatio): Promise<string> {
  const dimensions = {
    // Mobile Devices
    '9:16': { width: 1080, height: 1920 },
    '16:9': { width: 1920, height: 1080 },
    '9:18': { width: 1080, height: 2160 },
    
    // Tablets
    '3:4': { width: 1536, height: 2048 },
    '4:3': { width: 2048, height: 1536 },
    
    // Desktop/Laptop
    '16:10': { width: 1920, height: 1200 },
    '21:9': { width: 2560, height: 1080 },
    '1:1': { width: 1024, height: 1024 },
    
    // 4K Resolutions
    '16:9-4k': { width: 3840, height: 2160 },
    '21:9-4k': { width: 5120, height: 2160 },
    '9:16-4k': { width: 2160, height: 3840 },
    
    // Watch & Small Devices
    '1:1-watch': { width: 312, height: 312 },
    'watch-round': { width: 360, height: 360 },
    
    // Social Media
    'instagram': { width: 1080, height: 1080 },
    'instagram-story': { width: 1080, height: 1920 },
    'youtube-thumb': { width: 1280, height: 720 }
  };

  const { width, height } = dimensions[aspectRatio] || dimensions['1:1'];
  
  const encodedPrompt = encodeURIComponent(prompt);
  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${Date.now()}&nologo=true&enhance=true&model=flux`;
  
  // Validate the image loads successfully
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error('Failed to generate styled image'));
    img.src = url;
  });
}

export async function downloadImage(url: string, filename: string): Promise<void> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    throw new Error('Failed to download image');
  }
}

export async function shareImage(url: string): Promise<void> {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Paper Art Transformation',
        url: url
      });
      return;
    } catch (error) {
      // Fall back to clipboard
    }
  }
  
  await navigator.clipboard.writeText(url);
  throw new Error('Image URL copied to clipboard!');
}