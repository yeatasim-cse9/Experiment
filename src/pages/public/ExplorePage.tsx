import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, MapPin, Tag } from 'lucide-react';
import { useExploreGigs } from '../../features/gigs/hooks/useExploreGigs';
import { GigGrid } from '../../features/gigs/components/GigGrid';

const CATEGORIES = ['All', 'Tutoring', 'Tech/IT', 'Design', 'Content Creation', 'Delivery/Errands', 'Other'];
const CAMPUSES = ['All', 'Barisal University', 'Dhaka University', 'NSU', 'Brac University', 'Others'];

export const ExplorePage = () => {
  const { data: gigs, isLoading, error } = useExploreGigs();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCampus, setSelectedCampus] = useState('All');

  const filteredGigs = useMemo(() => {
    if (!gigs) return [];

    return gigs.filter((gig) => {
      const matchesSearch = 
        gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || gig.categoryName === selectedCategory;
      const matchesCampus = selectedCampus === 'All' || gig.campusName === selectedCampus;

      return matchesSearch && matchesCategory && matchesCampus;
    });
  }, [gigs, searchQuery, selectedCategory, selectedCampus]);

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-4 animate-in fade-in duration-500">
      {/* Header & Search Section */}
      <div className="flex flex-col gap-8 mb-12">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Explore Opportunities</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Find the perfect gig on your campus. Use the search and filters to discover tasks that match your skills and schedule.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          {/* Search Input */}
          <div className="relative flex-grow group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:text-white"
            />
          </div>

          {/* Filters Group */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category Dropdown */}
            <div className="relative min-w-[200px]">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white appearance-none cursor-pointer text-sm font-medium"
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat} Category</option>)}
              </select>
              <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Campus Dropdown */}
            <div className="relative min-w-[200px]">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <select 
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white appearance-none cursor-pointer text-sm font-medium"
              >
                {CAMPUSES.map(campus => <option key={campus} value={campus}>{campus === 'All' ? 'All Campuses' : campus}</option>)}
              </select>
              <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Stats & Current Filters */}
        <div className="flex items-center justify-between px-2">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Showing <span className="text-gray-900 dark:text-white font-bold">{filteredGigs.length}</span> {filteredGigs.length === 1 ? 'gig' : 'gigs'}
          </div>
          {(searchQuery || selectedCategory !== 'All' || selectedCampus !== 'All') && (
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedCampus('All');
              }}
              className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Gigs Result Grid */}
      <div className="w-full min-h-[400px]">
        <GigGrid 
          gigs={filteredGigs} 
          isLoading={isLoading} 
          error={error} 
          hideEmptyState={true}
        />
        
        {!isLoading && !error && filteredGigs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-zinc-900/50 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-zinc-800">
            <div className="w-20 h-20 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-sm mb-6">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No results found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm text-center">
              We couldn't find any gigs matching your current filters. Try adjusting your search or categories.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedCampus('All');
              }}
              className="mt-8 px-6 py-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-full font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};