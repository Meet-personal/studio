
'use client';

import { useState, useEffect } from 'react';
import type { Post } from '@/lib/types';
import PostCard from '@/components/post-card';

export function TodaysPosts({ allPosts, isSearchResults }: { allPosts: Post[], isSearchResults?: boolean }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  if (allPosts.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-lg">
        <p className="text-lg font-semibold">
            {isSearchResults ? 'No posts found.' : 'No posts have been created yet.'}
        </p>
        <p>{isSearchResults ? 'Try a different search term.' : 'You can create one in the admin dashboard.'}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {allPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
