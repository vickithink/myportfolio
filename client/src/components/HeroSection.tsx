import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowRight, Eye } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="text-primary font-medium mb-4 tracking-wide text-sm uppercase">
            Full Stack Developer · React & Node.js Specialist
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-['Space_Grotesk']">
            I Build Modern, Fast &{' '}
            <span className="text-primary">Scalable Websites</span>{' '}
            for Your Business
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            Helping startups, schools, and small businesses grow with secure and high-performance web solutions.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="rounded-full gap-2">
              <a href="#contact">
                Get a Free Consultation <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full gap-2">
              <a href="#portfolio">
                <Eye className="w-4 h-4" /> View My Work
              </a>
            </Button>
            <Button asChild size="lg" className="rounded-full gap-2 bg-green-600 hover:bg-green-700 text-white border-0">
              <a href="https://wa.me/919572949137" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" /> WhatsApp Me
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
