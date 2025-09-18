
import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

export function findImage(id: string, random: boolean = false): ImagePlaceholder {
  const placeholder = PlaceHolderImages.find(img => img.id === id) ?? PlaceHolderImages.find(img => img.id === 'default')!;

  if (random) {
    // Create a new object to avoid mutating the original
    const randomPlaceholder = { ...placeholder };
    const randomSeed = Math.random().toString(36).substring(2, 15);
    const baseUrl = placeholder.imageUrl.split('/seed/')[0];
    const dimensions = placeholder.imageUrl.split('/').slice(-2).join('/');
    randomPlaceholder.imageUrl = `${baseUrl}/seed/${randomSeed}/${dimensions}`;
    return randomPlaceholder;
  }
  
  return placeholder;
}
