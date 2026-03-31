import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signOut 
} from 'firebase/auth';
import { auth } from '../../../config/firebase';

const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const loginWithEmail = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const registerWithEmail = async (email: string, password: string, displayName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, {
    displayName
  });
  return userCredential.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};
