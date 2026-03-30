import { Link } from 'react-router-dom';
import { useLatestGigs } from '../../features/gigs/hooks/useGigList';
import { GigGrid } from '../../features/gigs/components/GigGrid';

export const HomePage = () => {
  const { data: gigs, isLoading, error } = useLatestGigs();

  return (
    <div className="w-full flex flex-col gap-16 md:gap-24 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 lg:py-32 px-4 rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 w-full">
        
        {/* Subtle Background Glows */}
        <div className="absolute top-0 -left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wide mb-6 border border-indigo-100 dark:border-indigo-500/20">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Join your campus network
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1]">
            Find or Post Campus Gigs <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Instantly</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed">
            The smartest way to connect with students for odd jobs, tutoring, event help, and creative tasks right on your campus.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/create-gig" className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 active:scale-95 text-center">
              Post a Gig
            </Link>
            <Link to="/explore" className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-semibold text-lg border border-gray-200 dark:border-zinc-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:focus:ring-zinc-700 active:scale-95 text-center">
              Find Work
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Gigs Placeholder */}
      <section className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Latest Gigs</h2>
            <p className="text-gray-500 dark:text-gray-400">Discover fresh opportunities around campus today.</p>
          </div>
          <Link to="/explore" className="hidden sm:flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            View all
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
        <div className="w-full mt-4">
          <GigGrid gigs={gigs} isLoading={isLoading} error={error} />
        </div>
      </section>
    </div>
  );
};
