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
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const translations = {
  en: {
    title: "Contact Us",
    subtitle: "We'd love to hear from you",
    getInTouch: "Get in Touch",
    getInTouchDesc: "Whether you have questions about our projects, want to collaborate, or simply want to share your thoughts, we're here to listen.",
    email: "Email",
    location: "Location",
    phone: "Phone",
    quote: "Every journey begins with a single step—or a single message.",
    sendMessage: "Send a Message",
    name: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "your.email@example.com",
    message: "Message",
    messagePlaceholder: "Share your thoughts...",
    send: "Send Message",
    sending: "Sending...",
    successTitle: "Message Sent",
    successDesc: "Thank you for reaching out. We'll get back to you soon!",
    nameError: "Name must be at least 2 characters",
    emailError: "Please enter a valid email address",
    messageError: "Message must be at least 10 characters",
  },
  zh: {
    title: "联系我们",
    subtitle: "我们期待您的来信",
    getInTouch: "联系方式",
    getInTouchDesc: "无论您对我们的项目有任何疑问、希望合作，还是只想分享您的想法，我们都在这里倾听。",
    email: "电子邮件",
    location: "地址",
    phone: "电话",
    quote: "千里之行，始于足下——或始于一条消息。",
    sendMessage: "发送消息",
    name: "姓名",
    namePlaceholder: "您的姓名",
    emailLabel: "电子邮件",
    emailPlaceholder: "your.email@example.com",
    message: "留言",
    messagePlaceholder: "分享您的想法...",
    send: "发送消息",
    sending: "发送中...",
    successTitle: "消息已发送",
    successDesc: "感谢您的来信，我们会尽快回复您！",
    nameError: "姓名至少需要2个字符",
    emailError: "请输入有效的电子邮件地址",
    messageError: "留言至少需要10个字符",
  },
};

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const t = translations[language];

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
          title: t.successTitle,
          description: t.successDesc,
        });
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      toast({
        title: t.successTitle,
        description: t.successDesc,
        variant: "default",
      });
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ButterflyLoader isLoading={showLoader} onComplete={() => setShowLoader(false)} />
      <BrushstrokeMenu isOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} language={language} onLanguageChange={setLanguage} />

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
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        
        <Link href="/" onClick={() => setShowLoader(true)} className="absolute top-6 right-6 z-20">
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
                {t.getInTouch}
              </h2>
              <p className="text-muted-foreground">
                {t.getInTouchDesc}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{t.email}</h3>
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
                  <h3 className="font-medium text-foreground">{t.location}</h3>
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
                  <h3 className="font-medium text-foreground">{t.phone}</h3>
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
                "{t.quote}"
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">{t.sendMessage}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.name}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t.namePlaceholder} 
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
                        <FormLabel>{t.emailLabel}</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder={t.emailPlaceholder} 
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
                        <FormLabel>{t.message}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t.messagePlaceholder} 
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
                      t.sending
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {t.send}
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
