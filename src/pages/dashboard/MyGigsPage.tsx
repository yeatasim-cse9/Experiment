import { useAuth } from '../../app/providers/AuthProvider';
import { useOwnerGigs } from '../../features/gigs/hooks/useOwnerGigs';
import { GigGrid } from '../../features/gigs/components/GigGrid';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';

export const MyGigsPage = () => {
  const { user } = useAuth();
  const { data: gigs, isLoading, error } = useOwnerGigs(user?.uid);

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Posted Gigs</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage the gigs you've posted on the platform.</p>
        </div>
        <Link 
          to="/dashboard/create-gig" 
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Post New Gig
        </Link>
      </div>

      <div className="w-full">
        <GigGrid 
          gigs={gigs} 
          isLoading={isLoading} 
          error={error} 
          renderActions={(gig) => (
            <Link 
              to={`/gigs/${gig.id}/applicants`}
              className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all border border-indigo-100 dark:border-indigo-500/20"
            >
              <Users className="w-4 h-4" />
              View Applicants
            </Link>
          )}
        />
        {!isLoading && !error && gigs && gigs.length === 0 && (
          <div className="text-center py-20 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No Gigs Yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't posted any gigs yet. Create your first gig to get started!</p>
            <Link 
              to="/dashboard/create-gig" 
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold text-sm hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
            >
              Create Gig
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
