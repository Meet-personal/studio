
import { getPost } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CATEGORIES } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = getPost(params.id);

  if (!post) {
    notFound();
  }

  const category = CATEGORIES.find(c => c.slug === post.category);

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <header className="mb-8">
        {category && (
            <Link href={`/category/${category.slug}`}>
                <Badge variant="default" className="mb-4 bg-accent text-accent-foreground hover:bg-accent/80 transition-colors">{category.name}</Badge>
            </Link>
        )}
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-foreground leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-muted-foreground">
          Published on{' '}
          {new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </header>

      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-lg">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
          data-ai-hint={post.imageHint}
        />
      </div>

      <div
        className="prose-styles max-w-none text-foreground/90"
        dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
      />

      <footer className="mt-12">
        <h3 className="text-lg font-semibold mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </footer>
    </article>
  );
}
