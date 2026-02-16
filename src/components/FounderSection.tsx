import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import founderPortrait from "@/assets/founder-portrait.jpg";
import founderAction from "@/assets/founder-action.jpg";

const FounderSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-secondary">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">

          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
            Meet The <span className="text-gradient">Founder</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4">

            <div className="flex-1 red-border-glow overflow-hidden">
              <img

                alt="Akash Lamba - Founder portrait"
                className="w-full h-80 lg:h-[500px] object-cover" src="/lovable-uploads/f4831424-e81a-4716-a96a-6902caceef03.png" />

            </div>
            <div className="flex-1 red-border-glow overflow-hidden">
              <img
                src={founderAction}
                alt="Akash Lamba - Training action shot"
                className="w-full h-80 lg:h-[500px] object-cover" />

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}>

            <h3 className="font-heading text-3xl md:text-4xl font-bold uppercase mb-2">
              Akash Lamba
            </h3>
            <p className="text-primary font-heading text-lg uppercase tracking-widest mb-6">
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
          </motion.div>
        </div>
      </div>
    </section>);

};

export default FounderSection;