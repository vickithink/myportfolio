import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] mb-6">About Me</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            I'm <span className="text-foreground font-medium">Vicki</span>, a Full Stack Web Developer based in India, specializing in React and Node.js. I help startups, schools, and small businesses build clean, fast, and scalable web applications that drive real results.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            With a strong focus on writing maintainable code and delivering reliable solutions, I take a client-first approach to every project. Whether you need a business website, a custom dashboard, or a complete web application — I'm here to turn your ideas into reality.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
