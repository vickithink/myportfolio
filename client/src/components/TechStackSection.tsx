import { motion } from 'framer-motion';

const techs = [
  { name: 'HTML5', slug: 'html5', color: '#E34F26' },
  { name: 'CSS3', slug: 'css3', color: '#1572B6' },
  { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E' },
  { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
  { name: 'React', slug: 'react', color: '#61DAFB' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '#06B6D4' },
  { name: 'Vite', slug: 'vite', color: '#646CFF' },
  { name: 'Node.js', slug: 'node-dot-js', color: '#43853D' },
  { name: 'Express', slug: 'express', color: '#000000' },
  { name: 'MongoDB', slug: 'mongodb', color: '#47A248' },
  { name: 'Firebase', slug: 'firebase', color: '#FFCA28' },
  { name: 'Git', slug: 'git', color: '#F05032' },
  { name: 'GitHub', slug: 'github', color: '#181717' },
];

const CDN = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${slug}.svg`;

export default function TechStackSection() {
  return (
    <section id="tech" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] mb-4">Tech Stack</h2>
          <p className="text-muted-foreground">Technologies I work with every day.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full">
            <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
              {techs.map(t => (
                <li
                  key={t.name}
                  className="w-full p-4 bg-card border border-border rounded-xl flex flex-col items-center gap-3 hover:shadow-lg transform hover:-translate-y-1 transition-all"
                >
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-full"
                    style={{ backgroundColor: t.color }}
                  >
                    <img
                      src={CDN(t.slug)}
                      alt={t.name + ' logo'}
                      title={t.name}
                      className="w-8 h-8 object-contain filter brightness-0 invert"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">{t.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
