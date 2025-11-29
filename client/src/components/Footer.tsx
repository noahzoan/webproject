import { Link } from "wouter";
import { Mail, MapPin, Phone, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-transparent via-background/80 to-background border-t border-border/30">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMzAgMCBRNDUgMzAgMzAgNjAgUTE1IDMwIDMwIDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-50 dark:opacity-20" />
      
      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-semibold text-foreground flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary">
                <path
                  d="M12 2 L4 8 L4 20 L20 20 L20 8 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 2 L12 8 L20 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              About Us
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Discover Heritage is an immersive digital experience celebrating traditional Asian landscapes and culture. Our mission is to connect people with the rich heritage of ancient civilizations through interactive storytelling.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-xl font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <Link 
                href="/" 
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                data-testid="link-footer-home"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                Home
              </Link>
              <Link 
                href="/discover/conservation" 
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                data-testid="link-footer-conservation"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                Conservation
              </Link>
              <Link 
                href="/discover/heritage" 
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                data-testid="link-footer-heritage"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                Heritage
              </Link>
              <Link 
                href="/about" 
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                data-testid="link-footer-about"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                About
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-xl font-semibold text-foreground">Contact</h3>
            <div className="flex flex-col gap-3">
              <a 
                href="mailto:hello@discoverheritage.com" 
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-3"
                data-testid="link-footer-email"
              >
                <Mail className="w-4 h-4" />
                hello@discoverheritage.com
              </a>
              <div className="text-muted-foreground flex items-center gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>123 Heritage Lane, Cultural District</span>
              </div>
              <a 
                href="tel:+1234567890" 
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-3"
                data-testid="link-footer-phone"
              >
                <Phone className="w-4 h-4" />
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for cultural heritage
          </p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Discover Heritage. All rights reserved.
          </p>
        </div>

        <div className="absolute bottom-4 right-4 opacity-10">
          <svg viewBox="0 0 100 60" className="w-24 h-14">
            <path
              d="M10 50 Q25 20, 50 30 T90 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-foreground"
            />
            <path
              d="M20 55 Q40 35, 60 45 T95 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-foreground"
            />
          </svg>
        </div>
      </div>
    </footer>
  );
}
