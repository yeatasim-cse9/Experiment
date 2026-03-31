import { useState } from 'react';
import type { Gig } from '../../gigs/types/gig.types';
import { useCreateApplication } from '../hooks/useCreateApplication';

interface ApplyModalProps {
  gig: Gig;
  currentUser: { uid: string; displayName?: string | null; photoURL?: string | null };
  onClose: () => void;
}

export const ApplyModal = ({ gig, currentUser, onClose }: ApplyModalProps) => {
  const [coverLetter, setCoverLetter] = useState('');
  const createApplicationMutation = useCreateApplication();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverLetter.trim()) return;

    createApplicationMutation.mutate({
      gigId: gig.id,
      gigTitle: gig.title,
      gigOwnerId: gig.ownerId,
      applicantId: currentUser.uid,
      applicantName: currentUser.displayName || 'Anonymous Applicant',
      applicantAvatar: currentUser.photoURL || '',
      coverLetter,
    }, {
      onSuccess: () => {
        onClose();
        // You would typically show a toast notification here
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} // Prevent bubbling to the backdrop
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Apply to Gig
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-xl p-4">
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-1">{gig.title}</h3>
            <p className="text-sm text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Owned by {gig.ownerDisplayName}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="coverLetter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Cover Letter / Message
              </label>
              <textarea 
                required
                id="coverLetter"
                rows={5}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Explain why you're a good fit for this gig..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button 
                type="button" 
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                disabled={createApplicationMutation.isPending}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={createApplicationMutation.isPending || !coverLetter.trim()}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md shadow-indigo-500/20 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-60 flex items-center gap-2"
              >
                {createApplicationMutation.isPending && (
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                )}
                {createApplicationMutation.isPending ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
            
            {createApplicationMutation.isError && (
              <p className="text-red-500 text-sm mt-2">
                Failed to submit. Please ensure you are logged in and try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};