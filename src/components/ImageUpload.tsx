import React, { useState, useCallback } from 'react';

interface ImageUploadProps {
  onImageSelect: (imageData: string, imageBase64: string) => void;
}

export function ImageUpload({ onImageSelect }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const base64 = result.split(',')[1];
      setPreviewUrl(result);
      onImageSelect(result, base64);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div className="input-group">
      <label htmlFor="imageUpload">Upload Your Image:</label>
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleChange}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={isDragOver ? 'drag-over' : ''}
      />
      {previewUrl && (
        <div className="image-preview">
          <img src={previewUrl} alt="Image preview" />
        </div>
      )}
    </div>
  );
}