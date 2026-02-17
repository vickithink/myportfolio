import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Zap, Target, Award, FileText, ShoppingCart, Monitor } from 'lucide-react';

const projects = [
  {
    name: 'Generase — Document Tools Suite',
    problem: 'Users needed a fast, browser-based suite to edit documents, convert files and optimize images without complex installs.',
    solution:
      'Generase provides a lightweight, user-friendly web app for document editing, image optimization, file conversion, QR generation and link shortening — all in one place.',
    impact: 'Improves editing speed and content-sharing workflows for individuals and small teams.',
    tech: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'MongoDB'],
    demo: 'https://www.generase.website',
    github: null,
    gradient: 'from-indigo-500/20 to-blue-500/10',
    icon: FileText,
  },
  {
    name: 'Gleepack — Events E‑commerce Platform',
    problem: 'Customers wanted curated, event-specific kits delivered at home (birthday, anniversary, baby shower, etc.).',
    solution:
      'Gleepack is a full-featured e‑commerce platform for event kits: product catalogs, influencer integrations, inventory & order management, delivery routing and real‑time order updates.',
    impact: 'Built as a ready-to-launch solution for event commerce companies with panels for admin, delivery, inventory, influencers and DB admins.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT', 'Razorpay'],
    demo: 'https://www.gleepack.shop',
    github: null, // Do not expose repo
    confidential: true,
    gradient: 'from-pink-500/20 to-rose-400/10',
    icon: ShoppingCart,
  },
  {
    name: 'ExamOn — AI Proctored Exam Platform',
    problem: 'Universities needed a reliable, proctored exam system with analytics and timed assessments.',
    solution:
      'ExamOn offers AI-proctored, timed exams with question banks, mock tests, per‑student analytics and secure reporting — designed for MCA and similar courses.',
    impact: 'Enables institutions to run remote assessments with proctoring and detailed reports.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'AI/Video Moderation'],
    demo: 'https://exam-on.vercel.app',
    github: null, // not published
    confidential: true,
    gradient: 'from-emerald-500/20 to-teal-400/10',
    icon: Monitor,
  },
  {
    name: 'Civil Consultancy — In Progress',
    problem: 'A consultancy site is being built to showcase services, case studies and allow client onboarding.',
    solution: 'Ongoing: design, content and contact flows are being implemented. Will include project galleries, testimonial management and service pages.',
    impact: 'Will provide a professional presence for a civil engineer consultancy and a streamlined lead capture process.',
    tech: ['HTML', 'CSS', 'React', 'Tailwind CSS'],

    github: null,
    
    gradient: 'from-slate-400/10 to-slate-300/5',
    icon: Target,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] mb-4">
              <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Real solutions for real businesses. Each project tells a story of innovation and impact.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {projects.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className={`group relative rounded-xl border border-border/50 bg-gradient-to-br ${p.gradient} backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all duration-300`}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative p-4 sm:p-5">
                  
                  {/* Header with icon */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold font-['Space_Grotesk'] text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
                        {p.name}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Brief description */}
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2">
                    {p.solution}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.slice(0, 4).map((t, idx) => (
                        <motion.span 
                          key={t}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + idx * 0.05 }}
                          className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-200"
                        >
                          {t}
                        </motion.span>
                      ))}
                      {p.tech.length > 4 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                          +{p.tech.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      asChild 
                      size="sm" 
                      className="rounded-lg gap-1.5 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 font-semibold text-xs h-8"
                    >
                      <a href={p.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3.5 h-3.5" /> 
                        <span>Demo</span>
                      </a>
                    </Button>
                    {p.github && (
                      <Button 
                        asChild 
                        variant="outline" 
                        size="sm" 
                        className="rounded-lg gap-1.5 hover:bg-primary/10 hover:border-primary/50 text-xs h-8"
                      >
                        <a href={p.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-3.5 h-3.5" /> 
                          <span>Code</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6">Interested in seeing more or starting a project?</p>
          <Button 
            asChild 
            size="lg" 
            className="rounded-full gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-8"
          >
            <a href="#contact">
              Let's Create Magic Together 🚀
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
