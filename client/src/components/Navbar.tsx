import { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/vickithink', icon: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
  )},
  { label: 'LinkedIn', href: 'https://linkedin.com/in/vickithink', icon: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  )},
  { label: 'Instagram', href: 'https://instagram.com/vickithink', icon: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
  )},
  { label: 'X', href: 'https://x.com/vickithink', icon: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  )},
];

export default function Navbar() {
  const { isDark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="text-2xl font-bold font-['Space_Grotesk'] text-primary">
            Vicki
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
            <button onClick={toggle} className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle theme">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Button asChild size="sm" className="rounded-full">
              <a href="#contact">Hire Me</a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggle} className="p-2 text-muted-foreground" aria-label="Toggle theme">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-foreground" aria-label="Menu">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - MODERN & PROFESSIONAL */}
      {mobileOpen && (
        <div className="md:hidden absolute left-0 right-0 top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border min-h-screen">
          <div className="px-4 py-6 space-y-6">
            
            {/* Navigation Links */}
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Navigation</p>
              {navLinks.map((l, idx) => (
                <a 
                  key={l.href} 
                  href={l.href} 
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-3 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 font-medium"
                >
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  {l.label}
                </a>
              ))}
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

            {/* Social Links */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Connect</p>
              <div className="grid grid-cols-4 gap-3">
                {socials.map(s => (
                  <a 
                    key={s.label} 
                    href={s.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 rounded-lg bg-primary/5 hover:bg-primary/15 text-muted-foreground hover:text-primary transition-all duration-200 border border-primary/10 hover:border-primary/30"
                    aria-label={s.label}
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

            {/* CTA Button */}
            <Button 
              asChild 
              size="lg" 
              className="w-full rounded-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 font-semibold text-base py-6 transition-all duration-200"
            >
              <a href="#contact" onClick={() => setMobileOpen(false)}>
                Let's Start Your Project 🚀
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
