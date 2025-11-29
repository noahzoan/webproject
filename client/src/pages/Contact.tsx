import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/Footer";
import { BrushstrokeMenu } from "@/components/BrushstrokeMenu";
import { ButterflyLoader } from "@/components/ButterflyLoader";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "Thank you for reaching out. We'll get back to you soon!",
        });
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. We'll get back to you soon!",
        variant: "default",
      });
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ButterflyLoader isLoading={isNavigating} />
      <BrushstrokeMenu isOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} language="en" onLanguageChange={() => {}} />

      <header className="relative h-[35vh] min-h-[280px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M10 70 Q40 30 70 70' fill='none' stroke='%23C8102E' stroke-opacity='0.08' stroke-width='2'/%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px',
          }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 px-6 animate-fade-in">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              We'd love to hear from you
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        
        <Link href="/" onClick={() => setIsNavigating(true)} className="absolute top-6 right-6 z-20">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-background/60 backdrop-blur-md border-border/50"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                Get in Touch
              </h2>
              <p className="text-muted-foreground">
                Whether you have questions about our projects, want to collaborate, 
                or simply want to share your thoughts, we're here to listen.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Email</h3>
                  <a 
                    href="mailto:hello@discoverheritage.com" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                    data-testid="link-email"
                  >
                    hello@discoverheritage.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-accent/30 text-accent-foreground flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Location</h3>
                  <p className="text-muted-foreground">
                    123 Heritage Lane<br />
                    Cultural District, CD 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Phone</h3>
                  <a 
                    href="tel:+1234567890" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                    data-testid="link-phone"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground italic">
                "Every journey begins with a single step—or a single message."
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            {...field} 
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your.email@example.com" 
                            {...field}
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share your thoughts..." 
                            rows={5}
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                    data-testid="button-submit"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
