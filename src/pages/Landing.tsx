import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthModal } from '../components/AuthModal';

interface ImageItem {
  id: number;
  src: string;
  title: string;
  category: string;
}

export function Landing() {
  const navigate = useNavigate();
  const [visibleImages, setVisibleImages] = useState(20);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Image gallery data - matching your Figma design
  const imageData: ImageItem[] = [
    { id: 1, src: '/images/001.png', title: 'Ethereal Fantasy', category: 'Fantasy' },
    { id: 2, src: '/images/002.png', title: 'Modern Architecture', category: 'Architecture' },
    { id: 3, src: '/images/003.png', title: 'Abstract Geometry', category: 'Abstract' },
    { id: 4, src: '/images/004.png', title: 'Misty Forest', category: 'Nature' },
    { id: 5, src: '/images/005.png', title: 'Cyberpunk City', category: 'Sci-Fi' },
    { id: 6, src: '/images/006.png', title: 'Renaissance Portrait', category: 'Portrait' },
    { id: 7, src: '/images/007.png', title: 'Cosmic Nebula', category: 'Space' },
    { id: 8, src: '/images/008.jpg', title: 'Luxury Sports Car', category: 'Automotive' },
    { id: 9, src: '/images/009.png', title: 'Tropical Paradise', category: 'Travel' },
    { id: 10, src: '/images/010.png', title: 'Steampunk Creature', category: 'Fantasy' },
    { id: 11, src: '/images/011.png', title: 'Enchanted Castle', category: 'Fantasy' },
    { id: 12, src: '/images/012.png', title: 'Coral Reef', category: 'Underwater' },
    { id: 13, src: '/images/013.png', title: 'Vintage Vinyl', category: 'Retro' },
    { id: 14, src: '/images/014.png', title: 'Mountain Peak', category: 'Nature' },
    { id: 15, src: '/images/015.png', title: 'Futuristic Robot', category: 'Sci-Fi' },
    { id: 16, src: '/images/016.png', title: 'Cozy Coffee Shop', category: 'Interior' },
    { id: 17, src: '/images/017.png', title: 'Ancient Ruins', category: 'Historical' },
    { id: 18, src: '/images/018.png', title: 'Hot Air Balloons', category: 'Adventure' },
    { id: 19, src: '/images/019.png', title: 'Elegant Butterfly', category: 'Nature' },
    { id: 20, src: '/images/020.png', title: 'City Skyline', category: 'Urban' },
    { id: 21, src: '/images/021.png', title: 'Mystical Dragon', category: 'Fantasy' },
    { id: 22, src: '/images/022.png', title: 'Artisan Pottery', category: 'Crafts' },
    { id: 23, src: '/images/023.png', title: 'Northern Lights', category: 'Nature' }
  ];

  const handleLoadMore = () => {
    setVisibleImages(prev => Math.min(prev + 5, imageData.length));
  };

  const handleStartFree = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="figma-landing">
      {/* Header */}
      <header className="figma-header">
        <div className="figma-container">
          <div className="figma-header-content">
            <div className="figma-logo">
              <h1>AiCloudGen</h1>
            </div>
            <div className="figma-header-actions">
              <button className="figma-start-free" onClick={handleStartFree}>
                <span className="free-badge">🎆 FREE</span>
                Start Free
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="figma-hero">
        <div className="figma-container">
          <div className="figma-hero-content">
            <h1 className="figma-hero-title">
              Create Stunning Images with
            </h1>
            <p className="figma-hero-description">
              Transform your ideas into breathtaking visuals with our premium AI<br />
              image generator. Professional quality, unlimited creativity, instant<br />
              results.
            </p>
            <div className="figma-hero-cta">
              <button className="figma-hero-start-btn" onClick={handleStartFree}>
                🚀 Start Creating for FREE
                <span className="cta-subtitle">No credit card required</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="figma-gallery">
        <div className="figma-container">
          <div className="figma-image-grid">
            {imageData.slice(0, visibleImages).map((image) => (
              <div key={image.id} className="figma-image-card">
                <div className="figma-image-wrapper">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    loading="lazy"
                  />
                </div>
                <div className="figma-image-label">
                  <span>{image.title}</span>
                </div>
              </div>
            ))}
          </div>
          
          {visibleImages < imageData.length && (
            <div className="figma-load-more">
              <button className="figma-load-more-btn" onClick={handleLoadMore}>
                + Load More Images
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="figma-footer">
        <div className="figma-container">
          <p>© 2024 ImageCraft AI. All rights reserved.</p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
