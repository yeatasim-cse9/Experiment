export const uploadImageToImgBB = async (file: File): Promise<string> => {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error('ImgBB API key is not configured.');
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.data && data.data.url) {
      return data.data.url;
    } else {
      throw new Error('Invalid response format from ImgBB');
    }
  } catch (error) {
    console.error('Error uploading image to ImgBB:', error);
    throw error;
  }
};
