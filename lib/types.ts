export interface Voice {
  id: string;
  name: string;
  email: string;
  languages: string;
  styles: string;
  pricePerMinute: number;
  audioSamplePath: string;
  description: string;
  gender: string;
  age: number;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoiceFilters {
  language?: string;
  gender?: string;
  style?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface VoiceApplication {
  name: string;
  email: string;
  languages: string[];
  styles: string[];
  pricePerMinute: number;
  audioSamplePath: string;
  description: string;
  gender: string;
}

export interface VoiceRequest {
  voiceId: string;
  email: string;
  projectDescription: string;
}
