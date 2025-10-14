import { uploadApi } from './uploadApi';

export const uploadImage = async (
  file: File,
  movieId: string,
  imageType: 'poster' | 'backdrop'
): Promise<string> => {
  try {
    const url = await uploadApi.uploadImage(file, movieId, imageType);
    return url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const deleteImage = async (fileName: string): Promise<void> => {
  try {
    await uploadApi.deleteImage(fileName);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

export const uploadMovieImages = async (
  posterFile: File | null,
  backdropFile: File | null,
  movieId: string
): Promise<{ posterUrl?: string; backdropUrl?: string }> => {
  try {
    const results: { posterUrl?: string; backdropUrl?: string } = {};

    if (posterFile) {
      results.posterUrl = await uploadImage(posterFile, movieId, 'poster');
    }

    if (backdropFile) {
      results.backdropUrl = await uploadImage(
        backdropFile,
        movieId,
        'backdrop'
      );
    }

    return results;
  } catch (error) {
    console.error('Error uploading movie images:', error);
    throw error;
  }
};
