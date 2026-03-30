import { Timestamp } from 'firebase/firestore';

export interface Gig {
  id: string;
  title: string;
  shortDescription: string;
  budgetMax: number;
  categoryName: string;
  campusName: string;
  ownerId: string;
  ownerDisplayName: string;
  ownerPhotoThumbURL: string;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Timestamp | Date | number; 
}
