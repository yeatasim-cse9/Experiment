import { Link } from 'react-router-dom';
import { useAuth } from '../../../app/providers/AuthProvider';

export const Navbar = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-zinc-900/80 border-b border-gray-200 dark:border-zinc-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group outline-none">
              <span className="text-2xl font-black bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent group-hover:from-indigo-400 group-hover:to-purple-500 transition-all duration-300">
                CampusGig
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link to="/explore" className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm">
                Explore
              </Link>
              <Link to="/categories" className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm">
                Categories
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {!isLoading && (
              isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors hidden sm:block">
                    Dashboard
                  </Link>
                  <Link to="/dashboard" className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md hover:shadow-lg transition-all hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-offset-zinc-900 select-none cursor-pointer">
                    {user?.email?.[0].toUpperCase() || 'U'}
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm">
                    Log in
                  </Link>
                  <Link to="/signup" className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-indigo-600 dark:focus-visible:ring-offset-zinc-900">
                    Sign up
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
