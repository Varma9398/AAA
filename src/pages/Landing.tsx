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
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Image gallery data - simple numbered images with sign in prompt
  const imageData: ImageItem[] = [
    { id: 1, src: '/images/001.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 2, src: '/images/002.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 3, src: '/images/003.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 4, src: '/images/004.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 5, src: '/images/005.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 6, src: '/images/006.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 7, src: '/images/007.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 8, src: '/images/008.jpg', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 9, src: '/images/009.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 10, src: '/images/010.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 11, src: '/images/011.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 12, src: '/images/012.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 13, src: '/images/013.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 14, src: '/images/014.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 15, src: '/images/015.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 16, src: '/images/016.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 17, src: '/images/017.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 18, src: '/images/018.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 19, src: '/images/019.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 20, src: '/images/020.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 21, src: '/images/021.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 22, src: '/images/022.png', title: 'Sign in to generate', category: 'AI Generated' },
    { id: 23, src: '/images/023.png', title: 'Sign in to generate', category: 'AI Generated' }
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
              <button className="figma-how-it-works" onClick={() => setShowVideoModal(true)}>
                🎥 How it Works
              </button>
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
              <div key={image.id} className="figma-image-card" onClick={handleStartFree}>
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

      {/* Export Aspect Ratios CTA */}
      <section className="export-cta-section">
        <div className="figma-container">
          <div className="export-cta-content">
            <div className="export-cta-text">
              <h2 className="export-cta-title">
                📱 Export to Any Device Ratio
              </h2>
              <p className="export-cta-description">
                Create once, export everywhere! Generate stunning AI images and export them perfectly optimized for:
              </p>
              <div className="aspect-ratios-grid">
                <div className="ratio-item">
                  <div className="ratio-icon">📱</div>
                  <span>Mobile Stories</span>
                  <small>9:16</small>
                </div>
                <div className="ratio-item">
                  <div className="ratio-icon">🖥️</div>
                  <span>Desktop</span>
                  <small>16:9</small>
                </div>
                <div className="ratio-item">
                  <div className="ratio-icon">🖼️</div>
                  <span>Square Posts</span>
                  <small>1:1</small>
                </div>
                <div className="ratio-item">
                  <div className="ratio-icon">📷</div>
                  <span>Print Ready</span>
                  <small>4:3</small>
                </div>
              </div>
            </div>
            <div className="export-cta-action">
              <button className="export-cta-btn" onClick={handleStartFree}>
                ✨ Start Creating Multi-Format Images
                <span className="export-cta-subtitle">No technical skills required</span>
              </button>
            </div>
          </div>
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

      {/* Video Modal */}
      {showVideoModal && (
        <div className="video-modal" onClick={() => setShowVideoModal(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-close-btn" onClick={() => setShowVideoModal(false)}>
              ×
            </button>
            <div className="video-wrapper">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/KpyVDMt9oNs?si=TJcu6YfM5bFR9Tv1&autoplay=1"
                title="How AiCloudGen Works"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
