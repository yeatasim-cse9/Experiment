import type { Gig } from '../types/gig.types';
import { GigCard } from './GigCard';

interface GigGridProps {
  gigs?: Gig[];
  isLoading: boolean;
  error?: Error | null;
}

export const GigGrid = ({ gigs, isLoading, error }: GigGridProps) => {
  if (error) {
    return (
      <div className="w-full p-8 text-center border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800/30 rounded-2xl text-red-600 dark:text-red-400">
        <p className="font-semibold text-lg mb-1">Failed to load latest gigs</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse flex flex-col bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 h-[250px]">
            <div className="flex justify-between mb-4">
              <div className="h-5 w-24 bg-gray-200 dark:bg-zinc-800 rounded-full" />
              <div className="h-6 w-16 bg-gray-200 dark:bg-zinc-800 rounded-md" />
            </div>
            <div className="h-7 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded-md mb-3" />
            <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded-md mb-2" />
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded-md mb-6" />
            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-800" />
              <div className="flex flex-col gap-2">
                <div className="h-3 w-20 bg-gray-200 dark:bg-zinc-800 rounded-md" />
                <div className="h-3 w-16 bg-gray-200 dark:bg-zinc-800 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!gigs || gigs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 dark:bg-zinc-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-zinc-800">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No gigs found</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
          There are currently no open gigs on campus. Be the first to post one!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {gigs.map((gig) => (
        <GigCard key={gig.id} gig={gig} />
      ))}
    </div>
  );
};
