import { motion } from "framer-motion";
import heroImg from "@/assets/hero-gym.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroImg}
        alt="Dungeon Gym interior with dramatic red lighting"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 dark-overlay" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-none mb-6"
        >
          Train Like a Beast.{" "}
          <span className="text-gradient">Rise from the Dungeon.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-muted-foreground text-lg md:text-xl mb-10 font-body"
        >
          Where champions are forged in iron and fire
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#plans"
            className="bg-primary text-primary-foreground font-heading text-lg uppercase tracking-widest px-10 py-4 hover:bg-primary/90 transition-all red-glow animate-pulse-glow"
          >
            Join Now
          </a>
          <a
            href="#attendance"
            className="border border-foreground/30 text-foreground font-heading text-lg uppercase tracking-widest px-10 py-4 hover:border-primary hover:text-primary transition-all"
          >
            Download App
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
