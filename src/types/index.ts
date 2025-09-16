export interface User {
  id: string;
  email: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: string;
  userId?: string;
}

export interface CreditData {
  date: string;
  creditsUsed: number;
  creditsRemaining: number;
}

export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  description: string;
}

export type StyleIntensity = 'subtle' | 'moderate' | 'strong' | 'extreme';
export type ArtStyle = 'paper';
export type AspectRatio = '9:16' | '16:9' | '9:18' | '3:4' | '4:3' | '16:10' | '21:9' | '1:1' | '16:9-4k' | '21:9-4k' | '9:16-4k' | '1:1-watch' | 'watch-round' | 'instagram' | 'instagram-story' | 'youtube-thumb';