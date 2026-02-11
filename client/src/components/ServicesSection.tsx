import { motion } from 'framer-motion';
import { Globe, Layout, Code2, ShieldCheck, Check, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Business Website Development',
    items: ['Company websites', 'School/College websites', 'Landing pages', 'Portfolio websites', 'Fully responsive design'],
  },
  {
    icon: Layout,
    title: 'Full Stack Web Applications',
    items: ['Admin dashboards', 'Authentication systems', 'Database integration', 'REST API development', 'Custom business tools'],
  },
  {
    icon: Code2,
    title: 'Frontend & UI Development',
    items: ['Modern React applications', 'Clean UI (Tailwind / Material UI)', 'Mobile-first layouts', 'Performance optimization'],
  },
  {
    icon: ShieldCheck,
    title: 'Authentication & Backend Setup',
    items: ['Google login', 'JWT authentication', 'Secure APIs', 'MongoDB & Firebase setup'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] mb-4">Services</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">End-to-end web development tailored for your business needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className="rounded-xl border border-border bg-card p-6 transform transition-all hover:scale-105 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-md flex items-center justify-center bg-primary/10 text-primary mb-4">
                <s.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-semibold mb-3 font-['Space_Grotesk']">{s.title}</h3>

              <div className="flex flex-wrap gap-2 mt-2">
                {s.items.map(item => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 text-sm px-2 py-1 rounded-full bg-primary/5 text-primary/800"
                  >
                    <Check className="w-3 h-3" />
                    <span className="truncate max-w-[10rem]">{item}</span>
                  </span>
                ))}
              </div>

              <a href="#contact" className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary hover:underline">
                Discuss project
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
