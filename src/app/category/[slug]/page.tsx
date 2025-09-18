
import { getPosts } from '@/lib/posts';
import { CATEGORIES } from '@/lib/constants';
import { notFound } from 'next/navigation';
import PostCard from '@/components/post-card';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  const posts = getPosts({ category: slug });

  if (!category) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
            <h1 className="text-4xl font-bold font-headline text-foreground">{category.name}</h1>
            <p className="text-muted-foreground mt-2">Browse the latest posts in {category.name}.</p>
        </div>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-lg">
          <p className="text-lg font-semibold">No posts in this category yet.</p>
          <p>You can create one in the admin dashboard.</p>
        </div>
      )}
    </>
  );
}
