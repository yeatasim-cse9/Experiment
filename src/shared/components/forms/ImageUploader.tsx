import { useState, useRef } from 'react';
import { uploadImageToImgBB } from '../../../utils/image';

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
}

export const ImageUploader = ({ onUploadSuccess }: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Set local preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setError(null);
    setIsUploading(true);

    try {
      const url = await uploadImageToImgBB(file);
      onUploadSuccess(url);
    } catch (_err) {
      setError('Failed to upload image. Please try again.');
      setPreviewUrl(null); // Clear preview on failure
    } finally {
      setIsUploading(false);
    }
  };

  const handleTriggerClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Gig Cover Image
      </label>
      <div 
        className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl transition-colors overflow-hidden ${
          error ? 'border-red-400 bg-red-50 dark:bg-red-900/10' : 
          previewUrl ? 'border-indigo-500' : 
          'border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800'
        }`}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
        
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <button 
                type="button"
                onClick={handleTriggerClick}
                disabled={isUploading}
                className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium text-sm shadow-sm"
              >
                Change Image
              </button>
            </div>
            {isUploading && (
              <div className="absolute inset-0 bg-white/60 dark:bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin mb-2"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Uploading...</span>
              </div>
            )}
          </>
        ) : (
          <div 
            className="flex flex-col items-center justify-center w-full h-full cursor-pointer p-6 text-center"
            onClick={handleTriggerClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-400 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Click to upload image</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};
