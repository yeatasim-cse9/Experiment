import { Timestamp } from 'firebase/firestore';

export interface Application {
  id: string;
  gigId: string;
  gigTitle: string;
  gigOwnerId: string;
  applicantId: string;
  applicantDisplayName: string;
  coverLetter: string;
  status: 'submitted' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: Timestamp | Date | number;
}

export type CreateApplicationData = Omit<Application, 'id' | 'createdAt' | 'status'> & {
  status?: string;
};