import React from 'react';
import { Download, Share2 } from 'lucide-react';
import { downloadImage, shareImage } from '../lib/imageGeneration';
import type { GeneratedImage } from '../types';

interface ImageGalleryProps {
  images: GeneratedImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const handleDownload = async (url: string, index: number) => {
    try {
      await downloadImage(url, `paper-art-${index + 1}-${Date.now()}.png`);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleShare = async (url: string) => {
    try {
      await shareImage(url);
    } catch (error) {
      // Error message is thrown as success message for clipboard copy
      if (error instanceof Error && error.message.includes('clipboard')) {
        // Show success message
        console.log(error.message);
      }
    }
  };

  if (images.length === 0) return null;

  return (
    <div className="result-section">
      <div className="image-gallery">
        {images.map((image, index) => (
          <div key={image.id} className="image-card">
            <img src={image.url} alt="Paper art transformation" loading="lazy" />
            <div className="image-info">
              <div className="image-actions">
                <button
                  className="action-btn download-btn"
                  onClick={() => handleDownload(image.url, index)}
                >
                  <Download size={16} />
                  Download
                </button>
                <button
                  className="action-btn share-btn"
                  onClick={() => handleShare(image.url)}
                >
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}