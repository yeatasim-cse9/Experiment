import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateGig } from '../../features/gigs/hooks/useCreateGig';
import { ImageUploader } from '../../shared/components/forms/ImageUploader';
import { useAuth } from '../../app/providers/AuthProvider';

export const CreateGigPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const createGigMutation = useCreateGig();
  
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    budgetMax: '',
    campusName: '',
    categoryName: '',
  });
  
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    // Fallback profile picture generated randomly if none uploaded on auth
    const ownerAvatar = user?.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.displayName || 'Campus'}`;
    
    createGigMutation.mutate({
      title: formData.title,
      shortDescription: formData.shortDescription,
      budgetMax: Number(formData.budgetMax),
      campusName: formData.campusName,
      categoryName: formData.categoryName,
      ownerId: user.uid,
      ownerDisplayName: user?.displayName || 'Anonymous Student',
      ownerPhotoThumbURL: imageUrl || ownerAvatar, 
    }, {
      onSuccess: () => {
        navigate('/');
      }
    });
  };

  if (!user) {
    return (
      <div className="w-full text-center py-20 px-4">
        <h2 className="text-2xl font-bold dark:text-white">Please log in to post a gig.</h2>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-10 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Create a New Gig</h1>
        <p className="text-gray-500 dark:text-gray-400">Post an opportunity or task for your campus community.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 md:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Image Upload Row */}
          <div className="pb-6 border-b border-gray-100 dark:border-zinc-800/50">
            <ImageUploader onUploadSuccess={(url) => setImageUrl(url)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">Gig Title</label>
              <input 
                required 
                id="title" 
                name="title"
                value={formData.title} 
                onChange={handleChange} 
                placeholder="e.g., Need a Math Tutor for Calculus 101"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors dark:text-white"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label htmlFor="categoryName" className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
              <select 
                required 
                id="categoryName" 
                name="categoryName"
                value={formData.categoryName} 
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors dark:text-white appearance-none"
              >
                <option value="">Select a Category</option>
                <option value="Tutoring">Tutoring</option>
                <option value="Event Help">Event Help</option>
                <option value="Delivery">Delivery</option>
                <option value="Design">Design</option>
                <option value="Programming">Programming</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Budget */}
            <div className="flex flex-col gap-2">
              <label htmlFor="budgetMax" className="text-sm font-medium text-gray-700 dark:text-gray-300">Max Budget ($)</label>
              <input 
                required 
                type="number"
                min="0"
                step="0.01"
                id="budgetMax" 
                name="budgetMax"
                value={formData.budgetMax} 
                onChange={handleChange} 
                placeholder="e.g., 50.00"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors dark:text-white"
              />
            </div>

            {/* Campus */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="campusName" className="text-sm font-medium text-gray-700 dark:text-gray-300">Campus Name</label>
              <input 
                required 
                id="campusName" 
                name="campusName"
                value={formData.campusName} 
                onChange={handleChange} 
                placeholder="e.g., University of Texas"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors dark:text-white"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="shortDescription" className="text-sm font-medium text-gray-700 dark:text-gray-300">Short Description</label>
              <textarea 
                required 
                id="shortDescription" 
                name="shortDescription"
                rows={4}
                value={formData.shortDescription} 
                onChange={handleChange} 
                placeholder="Describe the gig in a few sentences..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors dark:text-white resize-y"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button 
              type="submit" 
              disabled={createGigMutation.isPending}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg shadow-indigo-500/30 transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {createGigMutation.isPending && (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              )}
              {createGigMutation.isPending ? 'Publishing...' : 'Publish Gig'}
            </button>
          </div>
          
          {createGigMutation.isError && (
             <div className="p-4 mt-2 bg-red-50 text-red-600 rounded-xl border border-red-100">
               Failed to create gig. Please try again.
             </div>
          )}
        </form>
      </div>
    </div>
  );
};
