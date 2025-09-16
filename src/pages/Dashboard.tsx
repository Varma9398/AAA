import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { CreditInfo } from '../components/CreditInfo';
import { ImageUpload } from '../components/ImageUpload';
import { ImageGallery } from '../components/ImageGallery';
import { FloatingElements } from '../components/FloatingElements';
import { useCredits } from '../hooks/useCredits';
import { analyzeAndDescribeImage } from '../lib/gemini';
import { generateStyledImage } from '../lib/imageGeneration';
import type { GeneratedImage, StyleIntensity, AspectRatio } from '../types';

export function Dashboard() {
  const navigate = useNavigate();
  const { creditData, timeUntilReset, deductCredit, hasCreditsRemaining, CREDIT_COST_PER_IMAGE } = useCredits();
  
  const [uploadedImageData, setUploadedImageData] = useState<string>('');
  const [uploadedImageBase64, setUploadedImageBase64] = useState<string>('');
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  
  // Form state
  const [styleIntensity, setStyleIntensity] = useState<StyleIntensity>('moderate');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');

  const handleImageSelect = useCallback((imageData: string, imageBase64: string) => {
    setUploadedImageData(imageData);
    setUploadedImageBase64(imageBase64);
  }, []);

  const updateProgress = (percent: number) => {
    setProgress(percent);
    if (percent < 40) {
      setLoadingText('Analyzing your image with Gemini AI...');
    } else if (percent < 80) {
      setLoadingText('Generating paper art transformation...');
    } else {
      setLoadingText('Finalizing your artwork...');
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const generateImages = async () => {
    if (!hasCreditsRemaining()) {
      showMessage("You've used all your daily credits. Come back tomorrow for more!", 'error');
      return;
    }

    if (!uploadedImageData || !uploadedImageBase64) {
      showMessage('Please upload an image first', 'error');
      return;
    }

    setIsLoading(true);
    setMessage(null);
    setGeneratedImages([]);

    try {
      updateProgress(20);
      const description = await analyzeAndDescribeImage(uploadedImageBase64, 'paper', styleIntensity);
      updateProgress(60);
      
      if (description) {
        const imageUrl = await generateStyledImage(description, aspectRatio);
        if (imageUrl) {
          const newImage: GeneratedImage = {
            id: `img-${Date.now()}`,
            url: imageUrl,
            prompt: description,
            timestamp: new Date().toISOString()
          };
          
          updateProgress(100);
          
          // Deduct credit only after successful generation
          deductCredit();
          setGeneratedImages([newImage]);
          showMessage('Successfully generated paper art transformation!', 'success');
        }
      }
    } catch (error) {
      console.error('Generation failed:', error);
      showMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const noCreditsRemaining = !hasCreditsRemaining();

  return (
    <div className="dashboard-page">
      <FloatingElements />
      
      <Header 
        showCredits 
        onBackToHome={() => navigate('/')} 
      />

      <main className="main-content">
        <div className="container">
          <div className="page-header">
            <h1>Paper Art Transformer</h1>
            <p>Transform your photos into expressive paper art style</p>
          </div>

          <CreditInfo />

          {noCreditsRemaining && (
            <div className="no-credits-message">
              <h3>🎨 You've used all your daily credits!</h3>
              <p>You've generated <strong>10 amazing artworks</strong> today. Your credits will reset in:</p>
              <div className="timer">
                {timeUntilReset.hours}:{timeUntilReset.minutes}:{timeUntilReset.seconds}
              </div>
              <p style={{ marginTop: '15px', fontSize: '14px' }}>
                Come back tomorrow for 10 fresh credits to create more paper art masterpieces!
              </p>
            </div>
          )}

          <div className={`generator-section ${noCreditsRemaining ? 'disabled' : ''}`}>
            <div className="api-section">
              <h3>
                <span className="status-indicator"></span>
                Paper Art Generator
              </h3>
              <p style={{ color: '#6f7a83', fontSize: '14px', marginBottom: '20px' }}>
                Upload an image to transform it into expressive paper art with vibrant colors and abstract elements
              </p>
            </div>

            <ImageUpload onImageSelect={handleImageSelect} />

            <div className="advanced-options">
              <div className="input-group">
                <label htmlFor="artStyle">Art Style:</label>
                <select id="artStyle" value="paper" disabled>
                  <option value="paper">Paper Art Style</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="styleIntensity">Style Intensity:</label>
                <select
                  id="styleIntensity"
                  value={styleIntensity}
                  onChange={(e) => setStyleIntensity(e.target.value as StyleIntensity)}
                >
                  <option value="subtle">Subtle</option>
                  <option value="moderate">Moderate</option>
                  <option value="strong">Strong</option>
                  <option value="extreme">Extreme</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="aspectRatio">Device & Aspect Ratio:</label>
                <select
                  id="aspectRatio"
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                >
                  <option value="9:16">Mobile Portrait (9:16) - 1080x1920</option>
                  <option value="16:9">Mobile Landscape (16:9) - 1920x1080</option>
                  <option value="9:18">Mobile Long (9:18) - 1080x2160</option>
                  <option value="3:4">Tablet Portrait (3:4) - 1536x2048</option>
                  <option value="4:3">Tablet Landscape (4:3) - 2048x1536</option>
                  <option value="16:10">Desktop (16:10) - 1920x1200</option>
                  <option value="21:9">Ultrawide (21:9) - 2560x1080</option>
                  <option value="1:1">Square (1:1) - 1024x1024</option>
                  <option value="16:9-4k">4K Desktop (16:9) - 3840x2160</option>
                  <option value="21:9-4k">4K Ultrawide (21:9) - 5120x2160</option>
                  <option value="9:16-4k">4K Mobile (9:16) - 2160x3840</option>
                  <option value="1:1-watch">Watch Square - 312x312</option>
                  <option value="watch-round">Watch Round (1:1) - 360x360</option>
                  <option value="instagram">Instagram Square - 1080x1080</option>
                  <option value="instagram-story">Instagram Story - 1080x1920</option>
                  <option value="youtube-thumb">YouTube Thumbnail - 1280x720</option>
                </select>
              </div>
            </div>

            <button
              className="generate-btn"
              onClick={generateImages}
              disabled={isLoading || noCreditsRemaining}
            >
              {isLoading ? 'Transforming...' : 
               noCreditsRemaining ? 'No Credits Remaining' : 
               `Transform to Paper Art (${CREDIT_COST_PER_IMAGE} Credit)`}
            </button>

            {isLoading && (
              <div className="loading">
                <div className="spinner"></div>
                <p>{loadingText}</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}

            {message && (
              <div className={`${message.type === 'error' ? 'error-message' : 'success-message'}`}>
                {message.text}
              </div>
            )}
          </div>

          <ImageGallery images={generatedImages} />
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          © <strong>Cloud</strong> — Beautiful experiences in the cloud. All rights reserved.
        </div>
      </footer>
    </div>
  );
}