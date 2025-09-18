import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

export function findImage(id: string): ImagePlaceholder {
  return PlaceHolderImages.find(img => img.id === id) ?? PlaceHolderImages.find(img => img.id === 'default')!;
}
