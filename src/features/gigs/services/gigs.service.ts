import { collection, query, where, orderBy, limit, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import type { Gig } from '../types/gig.types';

export const getLatestGigs = async (): Promise<Gig[]> => {
  const gigsRef = collection(db, 'gigs');
  const q = query(
    gigsRef,
    where('status', '==', 'open'),
    orderBy('createdAt', 'desc'),
    limit(10)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Gig[];
};

export const createGig = async (gigData: Omit<Gig, 'id' | 'createdAt' | 'status'> & { status?: string }) => {
  const gigsRef = collection(db, 'gigs');
  const docRef = await addDoc(gigsRef, {
    ...gigData,
    status: gigData.status || 'open',
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};
