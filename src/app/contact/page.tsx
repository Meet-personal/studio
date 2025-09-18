
'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { handleContactForm, type FormState } from '@/app/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" size="lg" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Send Message
    </Button>
  );
}

export default function ContactPage() {
  const initialState: FormState = null;
  const [state, formAction] = useActionState(handleContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state) {
      toast({
        title: state.type === 'success' ? 'Message Sent!' : 'Something went wrong',
        description: state.message,
        variant: state.type === 'error' ? 'destructive' : 'default',
      });
      if (state.type === 'success') {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-foreground leading-tight mb-4">
          Contact Us
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question, feedback, or a partnership inquiry, please don't hesitate to reach out. Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </header>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Send us a Message</CardTitle>
          <CardDescription>
            Your feedback is important to us.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} className="space-y-6" action={formAction}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Enter your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="Enter your email" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" placeholder="What is your message about?" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Please type your message here." required rows={5} />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
