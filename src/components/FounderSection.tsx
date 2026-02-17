import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FounderSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-secondary/50">
      <div className="section-divider mb-20" />
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="image-hover-zoom rounded-xl overflow-hidden">
              <img
                alt="Ashutosh - Founder portrait"
                className="w-full h-[500px] lg:h-[600px] object-cover"
                src="/lovable-uploads/f4831424-e81a-4716-a96a-6902caceef03.png"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary rounded-xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary mb-4 block">
              The Visionary
            </span>
            <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-2 leading-[1.05]">
              Meet The{" "}
              <span className="text-gradient">Founder</span>
            </h2>
            <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase mb-2 mt-6">
              ASHUTOSH
            </h3>
            <p className="text-primary font-heading text-base uppercase tracking-[0.2em] mb-8">
              Founder & Head Coach
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed font-body">
              With over a decade of experience in strength training and competitive fitness, 
              Akash Lamba built Dungeon Gym with one mission: to create a space where 
              ordinary people become extraordinary. His passion for fitness goes beyond 
              lifting — it's about forging mental toughness, building discipline, and 
              helping every member unlock their full potential. Under his guidance, 
              hundreds of members have achieved transformations they never thought possible.
            </p>
            <div className="w-16 h-1 bg-primary mt-8" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
