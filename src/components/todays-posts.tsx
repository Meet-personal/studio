
'use client';

import { useState, useEffect } from 'react';
import { isToday } from 'date-fns';
import type { Post } from '@/lib/types';
import PostCard from '@/components/post-card';

export function TodaysPosts({ allPosts, isSearchResults }: { allPosts: Post[], isSearchResults?: boolean }) {
  const [displayPosts, setDisplayPosts] = useState<Post[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      if (isSearchResults) {
        setDisplayPosts(allPosts);
      } else {
        const filteredPosts = allPosts.filter(post => isToday(new Date(post.createdAt)));
        setDisplayPosts(filteredPosts);
      }
    }
  }, [allPosts, isClient, isSearchResults]);

  if (!isClient) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-card p-4 rounded-lg shadow-md animate-pulse">
                <div className="w-full h-48 bg-muted rounded-md mb-4"></div>
                <div className="w-3/4 h-6 bg-muted rounded mb-2"></div>
                <div className="w-full h-4 bg-muted rounded mb-4"></div>
                <div className="w-full h-4 bg-muted rounded"></div>
            </div>
        ))}
      </div>
    );
  }

  if (displayPosts.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-lg">
        <p className="text-lg font-semibold">
            {isSearchResults ? 'No posts found.' : 'No posts generated yet today.'}
        </p>
        <p>{isSearchResults ? 'Try a different search term.' : 'Check back later or explore the categories.'}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
