
import type { Post } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { findImage } from './placeholder-images';
import { isToday } from 'date-fns';

const createInitialPost = (categorySlug: string, title: string, content: string, tags: string[], daysAgo: number): Post => {
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - daysAgo);
    const image = findImage(categorySlug);
    return {
        id: `post_${Date.now()}_${categorySlug}_${Math.random()}`,
        title,
        content,
        category: categorySlug,
        tags,
        createdAt,
        image: image.imageUrl,
        imageHint: image.imageHint,
    };
};

const initialPosts: Post[] = [
    createInitialPost('it', 'The Future of Quantum Computing', 'Quantum computing is poised to revolutionize various industries by solving problems currently intractable for classical computers. This post explores the latest breakthroughs and what they mean for the future of technology.', ['quantum', 'computing', 'tech'], 0),
    createInitialPost('travel', 'A Journey Through the Swiss Alps', 'Discover the breathtaking beauty of the Swiss Alps. From serene lakes to majestic peaks, this guide will help you plan the ultimate alpine adventure.', ['travel', 'switzerland', 'alps'], 1),
    createInitialPost('finance', 'Navigating the Volatility of Cryptocurrency', 'The crypto market is known for its dramatic swings. Learn strategies to manage risk and potentially profit from the inherent volatility of digital assets.', ['crypto', 'finance', 'investing'], 0),
    createInitialPost('business', 'The Art of Effective Leadership in a Remote World', 'Leading a remote team presents unique challenges. This article covers essential skills and tools for fostering collaboration and productivity from a distance.', ['business', 'leadership', 'remote work'], 2),
    createInitialPost('consultant', 'Digital Transformation: A Consultant’s Perspective', 'How can businesses successfully navigate digital transformation? A seasoned consultant shares insights on strategy, implementation, and avoiding common pitfalls.', ['consulting', 'digital transformation', 'strategy'], 3),
    createInitialPost('companies', 'Top Tech Companies to Watch in 2024', 'From AI startups to established giants, we spotlight the tech companies that are making significant waves this year through innovation and market disruption.', ['companies', 'tech', 'innovation'], 4),
    createInitialPost('cryptocoins', 'Bitcoin vs. Ethereum: What’s the Difference?', 'A deep dive into the two largest cryptocurrencies, comparing their technology, use cases, and future potential in the evolving digital economy.', ['bitcoin', 'ethereum', 'blockchain'], 0),
];

let posts: Post[] = [...initialPosts];

export const getPosts = (options?: { category?: string }): Post[] => {
  let filteredPosts = posts;

  if (options?.category) {
    filteredPosts = posts.filter(post => post.category === options.category);
  }
  
  return filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getPost = (id: string): Post | undefined => {
  return posts.find(post => post.id === id);
};

export const addPost = (post: Post) => {
  posts.unshift(post);
};

export function isAdmin() {
  // For now, we'll just return true.
  // In a real app, you'd have a proper user authentication and role system.
  return true;
}

export function hasPostForToday(categorySlug: string): boolean {
  return posts.some(
    (post) =>
      post.category === categorySlug && isToday(new Date(post.createdAt))
  );
}
