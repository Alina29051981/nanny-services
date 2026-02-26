// src/types/Nanny.ts
export interface Nanny {
  name: string;
  avatar_url: string;
  age?: number;
  experience?: number;
  kids_age?: string;
  education?: string;
  characters?: string;
  about?: string;
  reviews?: {
    reviewer: string;
    rating: number;
    comment: string;
  }[];
}