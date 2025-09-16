import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { AuthModal } from '../components/AuthModal';
import { FloatingElements } from '../components/FloatingElements';
import type { GalleryImage } from '../types';

export function Landing() {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const batchSize = 24;
  const totalImages = 57;

  // Load state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem('landingPageState');
    let savedCurrentIndex = batchSize;
    let savedDisplayedImages: GalleryImage[] = [];

    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        savedCurrentIndex = parsed.currentIndex || batchSize;
      } catch (error) {
        console.error('Failed to load landing page state:', error);
      }
    }

    // Generate gallery images from local images
    const images: GalleryImage[] = [];
    for (let i = 1; i <= totalImages; i++) {
      const num = String(i).padStart(3, '0');
      images.push({
        id: `img-${i}`,
        src: `/images/${num}.png`,
        title: `Image ${num}`,
        description: `AI Generated Image ${num}`
      });
    }
    setGalleryImages(images);
    
    // Load images up to saved index or first batch
    const imagesToShow = images.slice(0, savedCurrentIndex);
    setDisplayedImages(imagesToShow);
    setCurrentIndex(savedCurrentIndex);
  }, []);

  // Save state to localStorage whenever currentIndex changes
  useEffect(() => {
    if (currentIndex > 0) {
      const stateToSave = {
        currentIndex,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('landingPageState', JSON.stringify(stateToSave));
    }
  }, [currentIndex]);

  const loadMore = () => {
    const nextIndex = Math.min(currentIndex + batchSize, totalImages);
    setDisplayedImages(prev => [...prev, ...galleryImages.slice(currentIndex, nextIndex)]);
    setCurrentIndex(nextIndex);
  };

  const handleAuthSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="landing-page">
      <FloatingElements />
      
      <Header onSignIn={() => setIsAuthModalOpen(true)} />

      <main>
        <div className="container">
          <section className="hero">
            <h1>Your Photos, Reimagined<br />AI-Powered Image Style Generator</h1>
            <p>Apply artistic styles, filters, and transformations to your images instantly with AI.</p>
          </section>

          <section className="gallery-section">
            <div className="gallery-grid">
              {displayedImages.map((image) => (
                <div key={image.id} className="gallery-item">
                  <img src={image.src} alt={image.title} loading="lazy" />
                  <div className="item-content">
                    <div className="item-title">{image.title}</div>
                    <div className="item-description">{image.description}</div>
                  </div>
                </div>
              ))}
            </div>
            {currentIndex < totalImages && (
              <div className="load-more-wrap">
                <button className="load-more-btn" onClick={loadMore}>
                  Load more
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          © <strong>Cloud</strong> — Beautiful experiences in the cloud. All rights reserved.
        </div>
      </footer>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}