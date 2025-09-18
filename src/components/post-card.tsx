
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Post } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const category = CATEGORIES.find(c => c.slug === post.category);

  return (
    <Link href={`/post/${post.id}`} className="group block">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/50">
        <CardHeader className="p-0">
          <div className="relative w-full aspect-video">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={post.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          {category && <Badge variant="secondary" className="mb-2">{category.name}</Badge>}
          <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
          <p className="mt-4 text-muted-foreground text-sm">{post.description}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <p className="text-xs text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
