
import type { Post } from '@/lib/types';
import { Pool } from 'pg';
import { config } from 'dotenv';

config(); 

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.POSTGRES_URL ? {
    rejectUnauthorized: false
  } : false,
});

export const addPost = async (post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
    if (!process.env.POSTGRES_URL) {
     throw new Error('Database is not configured. POSTGRES_URL is missing.');
   }
   const client = await pool.connect();
   const createdAt = new Date();
   const id = post.title
     .toLowerCase()
     .trim()
     .replace(/[^a-z0-9\s-]/g, '')
     .replace(/\s+/g, '-')
     .replace(/-+/g, '-')
     .slice(0, 50) + '-' + Math.random().toString(36).substring(2, 8);
 
   const newPost = {
     id,
     ...post,
     createdAt,
   };
   
   const queryText = `
     INSERT INTO posts(id, title, description, content, category, tags, "createdAt", image, "imageHint")
     VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
   `;
   const values = [
     newPost.id,
     newPost.title,
     newPost.description,
     newPost.content,
     newPost.category,
     newPost.tags,
     newPost.createdAt,
     newPost.image,
     newPost.imageHint,
   ];
 
   try {
     await client.query(queryText, values);
     return newPost;
   } catch (error) {
     console.error('Error adding post:', error);
     throw new Error('Failed to add post to database.');
   } finally {
     client.release();
   }
 };
