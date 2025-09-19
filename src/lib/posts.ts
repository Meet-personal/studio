
import type { Post } from '@/lib/types';
import { Pool } from 'pg';
import { config } from 'dotenv';

config(); // Load environment variables from .env file

// Initialize the connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.POSTGRES_URL ? {
    rejectUnauthorized: false
  } : false,
});

// Function to ensure the 'posts' table exists
const ensureTableExists = async () => {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id VARCHAR(255) PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                content TEXT NOT NULL,
                category VARCHAR(100) NOT NULL,
                tags TEXT[] NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                image VARCHAR(255) NOT NULL,
                "imageHint" VARCHAR(255) NOT NULL
            );
        `);
    } finally {
        client.release();
    }
};

// Ensure table exists on startup
if (process.env.POSTGRES_URL) {
    ensureTableExists().catch(console.error);
}


export const getPosts = async (options?: { category?: string, query?: string }): Promise<Post[]> => {
  if (!process.env.POSTGRES_URL) {
    console.warn('POSTGRES_URL is not set, returning empty posts array.');
    return [];
  }
  const client = await pool.connect();
  try {
    let queryText = 'SELECT id, title, description, content, category, tags, "createdAt", image, "imageHint" FROM posts';
    const params = [];

    if (options?.category) {
      params.push(options.category);
      queryText += ` WHERE category = $${params.length}`;
    }

    if (options?.query) {
      const lowercasedQuery = `%${options.query.toLowerCase()}%`;
      params.push(lowercasedQuery);
      const queryParamIndex = `$${params.length}`;
      
      if (options.category) {
        queryText += ' AND (';
      } else {
        queryText += ' WHERE (';
      }
      
      queryText += `
        LOWER(title) LIKE ${queryParamIndex} OR
        LOWER(description) LIKE ${queryParamIndex} OR
        LOWER(content) LIKE ${queryParamIndex} OR
        EXISTS (
            SELECT 1 FROM unnest(tags) AS tag WHERE LOWER(tag) LIKE ${queryParamIndex}
        )
      )`;
    }

    queryText += ' ORDER BY "createdAt" DESC';

    const res = await client.query(queryText, params);
    return res.rows.map(row => ({
      ...row,
      createdAt: new Date(row.createdAt),
      imageHint: row.imageHint
    }));

  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  } finally {
    client.release();
  }
};

export const getPost = async (id: string): Promise<Post | undefined> => {
  if (!process.env.POSTGRES_URL) {
    return undefined;
  }
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM posts WHERE id = $1', [id]);
    if (res.rows.length > 0) {
      const row = res.rows[0];
      return {
        ...row,
        createdAt: new Date(row.createdAt),
        imageHint: row.imageHint
      };
    }
  } catch (error) {
    console.error('Error fetching post:', error);
  } finally {
    client.release();
  }
  return undefined;
};

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
