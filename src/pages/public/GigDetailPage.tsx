import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGigDetail } from '../../features/gigs/hooks/useGigDetail';
import { useAuth } from '../../app/providers/AuthProvider';
import { ApplyModal } from '../../features/applications/components/ApplyModal';

export const GigDetailPage = () => {
  const { gigId } = useParams<{ gigId: string }>();
  const { data: gig, isLoading, error } = useGigDetail(gigId);
  const { user } = useAuth();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 px-4 animate-pulse">
        <div className="h-64 bg-gray-200 dark:bg-zinc-800 rounded-3xl mb-8" />
        <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-xl w-3/4 mb-4" />
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded-md w-1/4 mb-8" />
        <div className="h-32 bg-gray-200 dark:bg-zinc-800 rounded-xl w-full" />
      </div>
    );
  }

  if (error || !gig) {
    return (
      <div className="w-full max-w-2xl mx-auto py-24 px-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Gig Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">The gig you are looking for does not exist or has been removed.</p>
        <Link to="/explore" className="px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700">Browse Available Gigs</Link>
      </div>
    );
  }

  // Determine if viewing own gig to disable 'Apply Now'
  const isOwner = user?.uid === gig.ownerId;

  return (
    <>
      <div className="w-full max-w-5xl mx-auto py-10 px-4 flex flex-col lg:flex-row gap-8 animate-in fade-in duration-500">
        
        {/* Main Content */}
        <div className="flex-grow flex flex-col gap-6">
          {gig.ownerPhotoThumbURL && gig.ownerPhotoThumbURL.startsWith('http') && !gig.ownerPhotoThumbURL.includes('dicebear') && (
            <div className="w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden bg-gray-100 dark:bg-zinc-900 relative">
              <img src={gig.ownerPhotoThumbURL} alt={gig.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold">
                {gig.categoryName}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 font-medium">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                {gig.campusName}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              {gig.title}
            </h1>
            
            <div className="flex items-center gap-4 py-4 border-y border-gray-100 dark:border-zinc-800 my-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm overflow-hidden">
                  {gig.ownerDisplayName?.[0] || 'U'}
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Posted by</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-200">{gig.ownerDisplayName}</p>
                </div>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              <p>{gig.shortDescription}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[350px] flex-shrink-0">
          <div className="sticky top-24 bg-white dark:bg-zinc-900 rounded-3xl shadow-lg border border-gray-100 dark:border-zinc-800 p-8 flex flex-col gap-6">
            
            <div className="text-center pb-6 border-b border-gray-100 dark:border-zinc-800">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Max Budget</p>
              <h3 className="text-4xl font-extrabold text-green-600 dark:text-green-400">
                ${gig.budgetMax}
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {isOwner ? (
                <button disabled className="w-full py-4 rounded-xl font-bold bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-zinc-700">
                  You own this gig
                </button>
              ) : user ? (
                <button 
                  onClick={() => setIsApplyModalOpen(true)}
                  className="w-full py-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20 active:scale-95 transition-all text-lg"
                >
                  Apply Now
                </button>
              ) : (
                <Link to="/login" className="w-full py-4 rounded-xl font-bold bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 cursor-pointer text-center text-lg shadow-lg">
                  Log in to Apply
                </Link>
              )}
            </div>

            <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-2">
              Status: <span className="uppercase font-semibold text-indigo-500">{gig.status}</span>
            </p>
          </div>
        </div>
      </div>

      {isApplyModalOpen && user && (
        <ApplyModal gig={gig} currentUser={user} onClose={() => setIsApplyModalOpen(false)} />
      )}
    </>
  );
};