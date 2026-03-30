import { Link } from 'react-router-dom';
import type { Gig } from '../types/gig.types';

interface GigCardProps {
  gig: Gig;
}

export const GigCard = ({ gig }: GigCardProps) => {
  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
          {gig.categoryName}
        </span>
        <span className="text-lg font-bold text-green-600 dark:text-green-400">
          ${gig.budgetMax}
        </span>
      </div>
      
      <Link to={`/gig/${gig.id}`} className="outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
          {gig.title}
        </h3>
      </Link>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2 flex-grow">
        {gig.shortDescription}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          {gig.ownerPhotoThumbURL ? (
            <img src={gig.ownerPhotoThumbURL} alt={gig.ownerDisplayName} className="w-8 h-8 rounded-full bg-gray-200 object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">
              {gig.ownerDisplayName?.[0] || 'U'}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-200 leading-none">
              {gig.ownerDisplayName}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              {gig.campusName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
