import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import gymInterior1 from "@/assets/gym-interior-1.jpg";
import gymInterior2 from "@/assets/gym-interior-2.jpg";
import gymExterior from "@/assets/gym-exterior.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
            About <span className="text-gradient">Dungeon Gym</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto font-body leading-relaxed">
            Born from the raw underground, Dungeon Gym is where strength meets discipline. 
            We don't believe in shortcuts — only in the relentless pursuit of transformation. 
            Every rep, every set, every drop of sweat brings you closer to the warrior you were meant to be. 
            This isn't just a gym. This is your battlefield.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[gymInterior1, gymInterior2, gymExterior].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="image-hover-zoom red-border-glow"
            >
              <img
                src={img}
                alt={`Dungeon Gym interior ${i + 1}`}
                className="w-full h-64 md:h-80 object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
