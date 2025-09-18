
'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { createPost, type FormState } from '@/app/actions';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CATEGORIES } from '@/lib/constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" size="lg" className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
      Generate Post
    </Button>
  );
}

export default function AdminPage() {
  const initialState: FormState = null;
  const [state, formAction] = useActionState(createPost, initialState);
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    if (state) {
      toast({
        title: state.type === 'success' ? 'Success!' : 'Oh no!',
        description: state.message,
        variant: state.type === 'error' ? 'destructive' : 'default',
      });
    }
  }, [state, toast]);

  return (
    <div className="p-4 md:p-8">
        <header className="mb-8">
            <h1 className="text-4xl font-bold font-headline text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Generate new blog posts for any category.</p>
        </header>

        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Generate a New Blog Post</CardTitle>
                <CardDescription>Select a category and let AI do the work.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-6">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium mb-2">
                            Category
                        </label>
                        <Select name="category" required value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger id="category" className="w-full">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {CATEGORIES.map(category => (
                                    <SelectItem key={category.slug} value={category.slug}>
                                        <div className="flex items-center gap-2">
                                            <category.Icon className="h-4 w-4" />
                                            {category.name}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    </div>
  );
}
