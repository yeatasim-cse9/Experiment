import { Outlet } from 'react-router-dom';
import { Navbar } from '../../shared/components/navigation/Navbar';

export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#121212] transition-colors duration-200 w-full">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col items-center">
        <Outlet />
      </main>

      <footer className="w-full bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} CampusGig. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
