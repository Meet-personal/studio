
'use client';

import { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { deletePost, type FormState } from '@/app/actions';
import { Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function SubmitButton() {
  return (
    <Button variant="destructive" type="submit">
      Delete
    </Button>
  );
}

export function DeletePostButton({ postId }: { postId: string }) {
  const initialState: FormState = null;
  const [state, formAction] = useActionState(deletePost, initialState);
  const { toast } = useToast();

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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4 text-destructive" />
          <span className="sr-only">Delete Post</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form action={formAction}>
            <input type="hidden" name="postId" value={postId} />
            <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the post
                from the database.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
                <SubmitButton />
            </AlertDialogAction>
            </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
