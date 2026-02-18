import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import gymInterior1 from "@/assets/gym-interior-1.jpg";
import gymInterior2 from "@/assets/gym-interior-2.jpg";
import gymExterior from "@/assets/gym-exterior.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background">
      <div className="section-divider mb-20" />
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}>

            <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary mb-4 block">
              Who We Are
            </span>
            <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-8 leading-[1.05]">
              About{" "}
              <span className="text-gradient">Dungeon Gym</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-body leading-relaxed mb-6">
              Born from the raw underground, Dungeon Gym is where strength meets discipline. 
              We don't believe in shortcuts — only in the relentless pursuit of transformation.
            </p>
            <p className="text-muted-foreground text-lg font-body leading-relaxed">
              Every rep, every set, every drop of sweat brings you closer to the warrior you were meant to be. 
              This isn't just a gym. This is your battlefield.
            </p>
            <div className="w-16 h-1 bg-primary mt-8" />
          </motion.div>

          {/* Right: Stacked image grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-3">

            <div className="col-span-2 image-hover-zoom rounded-lg overflow-hidden">
              




            </div>
            <div className="image-hover-zoom rounded-lg overflow-hidden">
              <img
                src={gymInterior2}
                alt="Dungeon Gym interior 2"
                className="w-full h-40 md:h-52 object-cover" />

            </div>
            <div className="image-hover-zoom rounded-lg overflow-hidden">
              <img
                src={gymExterior}
                alt="Dungeon Gym exterior"
                className="w-full h-40 md:h-52 object-cover" />

            </div>
          </motion.div>
        </div>
      </div>
    </section>);

};

export default AboutSection;