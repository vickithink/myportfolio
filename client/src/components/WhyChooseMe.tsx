import { motion } from 'framer-motion';
import { Sparkles, Zap, MessageSquare, ShieldCheck, BadgeDollarSign, HeartHandshake } from 'lucide-react';

const benefits = [
  { icon: Sparkles, title: 'Clean & Professional Design', desc: 'Pixel-perfect UIs that leave a lasting impression.' },
  { icon: Zap, title: 'Fast Delivery', desc: 'On-time delivery without compromising quality.' },
  { icon: MessageSquare, title: 'Clear Communication', desc: 'Regular updates and transparent progress reports.' },
  { icon: ShieldCheck, title: 'Secure & Scalable', desc: 'Built with best practices for security and growth.' },
  { icon: BadgeDollarSign, title: 'Affordable Pricing', desc: 'Fair pricing tailored for startups and small businesses.' },
  { icon: HeartHandshake, title: 'Long-term Support', desc: 'Post-delivery support to keep your project running smoothly.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

export default function WhyChooseMe() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] mb-4">Why Choose Me</h2>
          <p className="text-muted-foreground">What sets me apart from the rest.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-xl border border-border bg-card p-6 text-center hover:border-primary/40 transition-colors"
            >
              <b.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1 font-['Space_Grotesk']">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
