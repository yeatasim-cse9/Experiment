import { collection, addDoc, serverTimestamp, query, where, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../../config/firebase';

export interface ApplicationPayload {
  gigId: string;
  gigTitle: string;
  gigOwnerId: string;
  applicantId: string;
  applicantName: string;
  applicantAvatar?: string;
  applicantCampus?: string;
  coverLetter: string;
  status?: string;
  createdAt?: any;
}

export const createApplication = async (data: ApplicationPayload) => {
  if (!data.gigOwnerId) {
    throw new Error('gigOwnerId is strictly required to create an application');
  }

  const applicationsRef = collection(db, 'applications');
  const docRef = await addDoc(applicationsRef, {
    gigId: data.gigId,
    gigTitle: data.gigTitle,
    gigOwnerId: data.gigOwnerId,
    applicantId: data.applicantId,
    applicantName: data.applicantName,
    applicantAvatar: data.applicantAvatar || '',
    applicantCampus: data.applicantCampus || '',
    coverLetter: data.coverLetter,
    status: 'submitted',
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export interface ApplicationResponse extends ApplicationPayload {
  id: string;
}

export const getMyApplications = async (userId: string): Promise<ApplicationResponse[]> => {
  const applicationsRef = collection(db, 'applications');
  const q = query(
    applicationsRef,
    where('applicantId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as ApplicationResponse[];
};

export const getGigApplications = async (gigId: string): Promise<ApplicationResponse[]> => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('You must be logged in to view applicants.');

  const applicationsRef = collection(db, 'applications');
  const q = query(
    applicationsRef,
    where('gigId', '==', gigId),
    where('gigOwnerId', '==', currentUser.uid),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as ApplicationResponse[];
};

export const updateApplicationStatus = async (
  applicationId: string,
  status: string,
  gigId?: string
) => {
  // Update the application status
  const applicationRef = doc(db, 'applications', applicationId);
  await updateDoc(applicationRef, { status });

  // If accepted, mark the parent gig as 'assigned' so it leaves the open pool
  if (status === 'accepted' && gigId) {
    const gigRef = doc(db, 'gigs', gigId);
    await updateDoc(gigRef, { status: 'assigned' });
  }
};