const socials = [
  { label: 'GitHub', href: 'https://github.com/vickithink' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/vickithink' },
  { label: 'Instagram', href: 'https://instagram.com/vickithink' },
  { label: 'X', href: 'https://x.com/vickithink' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Vicki · <a href="https://iamvicki.in" className="hover:text-foreground transition-colors">iamvicki.in</a>
        </p>
        <div className="flex gap-4">
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
