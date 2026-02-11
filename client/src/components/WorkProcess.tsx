import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Requirement Discussion', desc: 'Understanding your goals and project scope.' },
  { num: '02', title: 'Planning & Design', desc: 'Wireframes, tech choices, and project roadmap.' },
  { num: '03', title: 'Development', desc: 'Building your application with clean, scalable code.' },
  { num: '04', title: 'Testing', desc: 'Thorough QA to ensure everything works perfectly.' },
  { num: '05', title: 'Delivery & Support', desc: 'Launch and ongoing maintenance support.' },
];

export default function WorkProcess() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] mb-4">How I Work</h2>
          <p className="text-muted-foreground">A simple, transparent process from start to finish.</p>
        </div>
        <div className="grid sm:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary/30 mb-2 font-['Space_Grotesk']">{s.num}</div>
              <h3 className="font-semibold text-sm mb-1 font-['Space_Grotesk']">{s.title}</h3>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
