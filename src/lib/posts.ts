
import type { Post } from '@/lib/types';
import { db } from './firebase';
import { collection, getDocs, getDoc, doc, addDoc, query, where, orderBy, Timestamp } from 'firebase/firestore';

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

const postFromDoc = (doc: any): Post => {
    const data = doc.data();
    return {
        id: doc.id,
        ...data,
        createdAt: (data.createdAt as Timestamp).toDate(),
    } as Post;
};

export const getPosts = async (options?: { category?: string, query?: string }): Promise<Post[]> => {
  try {
    const postsCollection = collection(db, 'posts');
    let queries = [];

    if (options?.category) {
        queries.push(where('category', '==', options.category));
    }
    
    queries.push(orderBy('createdAt', 'desc'));

    const q = query(postsCollection, ...queries);
    const querySnapshot = await getDocs(q);
    let posts = querySnapshot.docs.map(postFromDoc);

    if (options?.query) {
      const lowercasedQuery = options.query.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(lowercasedQuery) ||
        post.description.toLowerCase().includes(lowercasedQuery) ||
        post.content.toLowerCase().includes(lowercasedQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery))
      );
    }
    
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const getPost = async (id: string): Promise<Post | undefined> => {
  try {
    const postDoc = await getDoc(doc(db, 'posts', id));
    if (postDoc.exists()) {
      return postFromDoc(postDoc);
    }
  } catch (error) {
    console.error('Error fetching post:', error);
  }
  return undefined;
};

export const addPost = async (post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
  const createdAt = new Date();
  const newPostData = {
    ...post,
    createdAt: Timestamp.fromDate(createdAt),
  };
  
  try {
    const docRef = await addDoc(collection(db, 'posts'), newPostData);
    return {
      id: docRef.id,
      ...post,
      createdAt,
    };
  } catch (error) {
    console.error('Error adding post:', error);
    throw new Error('Failed to add post to database.');
  }
};
