import { useAuth } from '../../app/providers/AuthProvider';
import { useMyApplications } from '../../features/applications/hooks/useMyApplications';
import { Link } from 'react-router-dom';

export const MyApplicationsPage = () => {
  const { user } = useAuth();
  const { data: applications, isLoading, error } = useMyApplications(user?.uid);

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Applications</h1>
        <p className="text-gray-600 dark:text-gray-400">Track and manage the gigs you have applied for.</p>
      </div>

      <div className="w-full flex flex-col gap-4">
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/30">
            Failed to load your applications. Please try again.
          </div>
        )}

        {!isLoading && !error && applications && applications.length === 0 && (
          <div className="text-center py-20 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No Applications Yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't applied to any gigs yet. Head to the Explore page to find work!</p>
            <Link 
              to="/explore" 
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold text-sm hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
            >
              Browse Gigs
            </Link>
          </div>
        )}

        {!isLoading && !error && applications && applications.map((app: any) => (
          <div key={app.id} className="flex flex-col sm:flex-row gap-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="flex-grow flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                  app.status === 'submitted' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                  app.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  app.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                }`}>
                  {app.status || 'submitted'}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {app.createdAt ? new Date(app.createdAt?.seconds * 1000).toLocaleDateString() : 'Just now'}
                </span>
              </div>
              <Link to={`/gigs/${app.gigId}`} className="group inline-block w-max outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {app.gigTitle}
                </h3>
              </Link>
              <div className="text-sm text-gray-600 dark:text-gray-400 border-l-2 border-indigo-200 dark:border-indigo-900/50 pl-3 py-1">
                <p className="line-clamp-2 italic">{app.coverLetter}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
