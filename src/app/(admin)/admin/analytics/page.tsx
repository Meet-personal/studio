
import { getPosts } from "@/lib/posts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/constants";

export default async function AnalyticsPage() {
  const allPosts = getPosts();
  const totalPosts = allPosts.length;

  const postsByCategory = CATEGORIES.map(category => ({
    name: category.name,
    count: allPosts.filter(post => post.category === category.slug).length,
  }));

  return (
    <div className="p-4 md:p-8">
        <header className="mb-8">
            <h1 className="text-4xl font-bold font-headline text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-2">An overview of your blog's content.</p>
        </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalPosts}</p>
          </CardContent>
        </Card>
      </div>

        <h2 className="text-2xl font-bold font-headline text-foreground mt-12 mb-6">Posts per Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {postsByCategory.map(category => {
                 const CategoryIcon = CATEGORIES.find(c => c.name === category.name)?.Icon;
                 return (
                 <Card key={category.name}>
                 <CardHeader className="flex flex-row items-center justify-between pb-2">
                   <CardTitle className="text-base font-medium">{category.name}</CardTitle>
                   {
                        CategoryIcon && <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                   }
                 </CardHeader>
                 <CardContent>
                   <div className="text-3xl font-bold">{category.count}</div>
                 </CardContent>
               </Card>
               );
            })}
        </div>
    </div>
  );
}
