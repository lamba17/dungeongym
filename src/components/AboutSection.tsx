import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import gymInterior1 from "@/assets/gym-interior-1.jpg";
import gymInterior2 from "@/assets/gym-interior-2.jpg";
import gymExterior from "@/assets/gym-exterior.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="px-6 py-28 md:px-10 md:py-36 lg:px-20 lg:py-44 bg-background">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}>

            <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary mb-6 block">
              Who We Are
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-10 leading-[1.05]">
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
            <div className="w-16 h-1 bg-primary mt-10" />
          </motion.div>

          {/* Right: Large dominant image with accent */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative">

            <div className="image-hover-zoom rounded-2xl overflow-hidden red-border-glow shadow-2xl">
              <img
                src={gymInterior1}
                alt="Dungeon Gym interior"
                className="w-full h-[350px] md:h-[450px] lg:h-[520px] object-cover" />
            </div>

            {/* Smaller overlapping accent image */}
            <div className="absolute -bottom-6 -left-6 w-40 md:w-52 image-hover-zoom rounded-xl overflow-hidden red-border-glow shadow-xl hidden md:block">
              



            </div>

            {/* Exterior as small accent top-right */}
            <div className="absolute -top-5 -right-5 w-36 md:w-44 image-hover-zoom rounded-xl overflow-hidden red-border-glow shadow-xl hidden lg:block">
              <img
                src={gymExterior}
                alt="Dungeon Gym exterior"
                className="w-full h-28 md:h-36 object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

};

export default AboutSection;