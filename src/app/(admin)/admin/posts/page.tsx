
import { getPosts } from "@/lib/posts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DeletePostButton } from "./delete-post-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export default async function ManagePostsPage() {
  const posts = await getPosts();

  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-foreground">
          Manage Posts
        </h1>
        <p className="text-muted-foreground mt-2">
          View, edit, or delete your blog posts.
        </p>
      </header>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60%]">Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length > 0 ? (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{post.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button asChild variant="ghost" size="icon">
                        <Link href={`/post/${post.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View Post</span>
                        </Link>
                    </Button>
                    <DeletePostButton postId={post.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No posts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
