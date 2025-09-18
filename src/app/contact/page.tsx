import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
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
          <form className="space-y-6" action="#">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What is your message about?" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Please type your message here." required rows={5} />
            </div>
            <Button type="submit" className="w-full" size="lg">Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
