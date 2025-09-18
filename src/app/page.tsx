import { getPosts } from '@/lib/posts';
import { TodaysPosts } from '@/components/todays-posts';

export default async function HomePage() {
  const allPosts = getPosts();

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-bold font-headline mb-8 text-foreground">
        Today's Chronicles
      </h1>
      <TodaysPosts allPosts={allPosts} />
    </div>
  );
}
