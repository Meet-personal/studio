
import type { Post } from '@/lib/types';
import { findImage } from './placeholder-images';
import fs from 'fs';
import path from 'path';

const postsFilePath = path.join(process.cwd(), 'src', 'lib', 'posts.json');

const generatePostId = (title: string) => {
    const baseId = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') 
        .replace(/\s+/g, '-')         
        .replace(/-+/g, '-');       

    const randomSuffix = Math.random().toString(36).substring(2, 8);
    
    return `${baseId.slice(0, 40)}-${randomSuffix}`;
}

const readPostsFromFile = (): Post[] => {
    try {
        if (fs.existsSync(postsFilePath)) {
            const jsonString = fs.readFileSync(postsFilePath, 'utf-8');
            const data = JSON.parse(jsonString) as { posts: Post[] };
            return data.posts.map(post => ({
                ...post,
                createdAt: new Date(post.createdAt)
            }));
        }
    } catch (error) {
        console.error('Error reading posts from file:', error);
    }
    return [];
};

const writePostsToFile = (posts: Post[]): void => {
    try {
        const data = { posts };
        fs.writeFileSync(postsFilePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing posts to file:', error);
    }
};

let posts: Post[] = readPostsFromFile();

if (posts.length === 0) {
    const createInitialPost = (categorySlug: string, title: string, description: string, content: string, tags: string[], daysAgo: number): Post => {
        const createdAt = new Date();
        createdAt.setDate(createdAt.getDate() - daysAgo);
        const image = findImage(categorySlug, true);
        const id = generatePostId(title)
        return {
            id,
            title,
            description,
            content,
            category: categorySlug,
            tags,
            createdAt,
            image: image.imageUrl,
            imageHint: image.imageHint,
        };
    };
    
    posts = [
        createInitialPost('it', 'The Future of Quantum Computing', 'Exploring the next frontier of computation.', 'Quantum computing is poised to revolutionize various industries by solving problems currently intractable for classical computers. This post explores the latest breakthroughs and what they mean for the future of technology.', ['quantum', 'computing', 'tech'], 0),
        createInitialPost('travel', 'A Journey Through the Swiss Alps', 'Your ultimate guide to the majestic alpine landscapes of Switzerland.', 'Discover the breathtaking beauty of the Swiss Alps. From serene lakes to majestic peaks, this guide will help you plan the ultimate alpine adventure.', ['travel', 'switzerland', 'alps'], 1),
        createInitialPost('finance', 'Navigating the Volatility of Cryptocurrency', 'Strategies for managing risk in the fast-paced world of digital assets.', 'The crypto market is known for its dramatic swings. Learn strategies to manage risk and potentially profit from the inherent volatility of digital assets.', ['crypto', 'finance', 'investing'], 0),
        createInitialPost('business', 'The Art of Effective Leadership in a Remote World', 'Mastering the skills to lead and inspire teams from anywhere.', 'Leading a remote team presents unique challenges. This article covers essential skills and tools for fostering collaboration and productivity from a distance.', ['business', 'leadership', 'remote work'], 2),
        createInitialPost('consultant', 'Digital Transformation: A Consultant’s Perspective', 'Expert insights on navigating the complexities of business modernization.', 'How can businesses successfully navigate digital transformation? A seasoned consultant shares insights on strategy, implementation, and avoiding common pitfalls.', ['consulting', 'digital transformation', 'strategy'], 3),
        createInitialPost('companies', 'Top Tech Companies to Watch in 2024', 'A look at the innovators and market disruptors shaping our future.', 'From AI startups to established giants, we spotlight the tech companies that are making significant waves this year through innovation and market disruption.', ['companies', 'tech', 'innovation'], 4),
        createInitialPost('cryptocoins', 'Bitcoin vs. Ethereum: What’s the Difference?', 'A deep dive into the two titans of the cryptocurrency world.', 'A deep dive into the two largest cryptocurrencies, comparing their technology, use cases, and future potential in the evolving digital economy.', ['bitcoin', 'ethereum', 'blockchain'], 0),
    ];
    writePostsToFile(posts);
}

export const getPosts = (options?: { category?: string, query?: string }): Post[] => {
  let currentPosts = readPostsFromFile();
  let filteredPosts = currentPosts;

  if (options?.category) {
    filteredPosts = currentPosts.filter(post => post.category === options.category);
  }

  if (options?.query) {
    const lowercasedQuery = options.query.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(lowercasedQuery) ||
      post.description.toLowerCase().includes(lowercasedQuery) ||
      post.content.toLowerCase().includes(lowercasedQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery))
    );
  }
  
  return filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getPost = (id: string): Post | undefined => {
  const currentPosts = readPostsFromFile();
  return currentPosts.find(post => post.id === id);
};

export const addPost = (post: Omit<Post, 'id' | 'createdAt'>) => {
  const currentPosts = readPostsFromFile();
  const createdAt = new Date();
  const id = generatePostId(post.title);
  const newPost: Post = {
    ...post,
    id,
    createdAt
  };
  const updatedPosts = [newPost, ...currentPosts];
  writePostsToFile(updatedPosts);
  posts = updatedPosts;
  return newPost;
};
