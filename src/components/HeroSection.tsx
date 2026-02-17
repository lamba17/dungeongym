import { motion } from "framer-motion";
import heroImg from "@/assets/hero-gym.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <img
        src={heroImg}
        alt="Dungeon Gym interior with dramatic red lighting"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

      <div className="relative z-10 px-6 md:px-10 lg:px-20 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="inline-block font-heading text-sm uppercase tracking-[0.3em] text-primary mb-6 border border-primary/30 px-4 py-1.5 rounded-full">
            Premium Underground Fitness
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] font-bold uppercase leading-[0.95] tracking-tight mb-8"
        >
          Train Like
          <br />
          a Beast.{" "}
          <span className="text-gradient">Rise from
          <br />the Dungeon.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-foreground/60 text-lg md:text-xl mb-12 font-body max-w-lg leading-relaxed"
        >
          Where champions are forged in iron and fire. From beginner to beast, 
          experience workouts designed to push your limits.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a href="#plans" className="btn-primary-premium text-base px-12 py-5">
            Join Now
          </a>
          <a href="#about" className="btn-outline-premium text-base px-12 py-5">
            Learn More
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
