
'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
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
  const [state, formAction] = useActionState(createPost, initialState);
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
    <form action={formAction}>
      <input type="hidden" name="category" value={category} />
      <SubmitButton />
    </form>
  );
}
