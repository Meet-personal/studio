
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { createPost, type FormState } from '@/app/actions';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} size="lg">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
      Generate New Post
    </Button>
  );
}

export function GeneratePostButton({ category }: { category: string }) {
  const initialState: FormState = null;
  const [state, formAction] = useFormState(createPost, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state) {
      if (state.type === 'success') {
        toast({
          title: 'Success!',
          description: state.message,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Oh no!',
          description: state.message,
        });
      }
    }
  }, [state, toast]);

  return (
    <form action={formAction}>
      <input type="hidden" name="category" value={category} />
      <SubmitButton />
    </form>
  );
}
