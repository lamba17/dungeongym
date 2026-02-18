import { motion } from "framer-motion";
import heroImg from "@/assets/hero-gym.jpg";
import athleteImg from "@/assets/hero-athlete.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <img
        src={heroImg}
        alt="Dungeon Gym interior with dramatic red lighting"
        className="absolute inset-0 w-full h-full object-cover scale-105" />

      {/* Overlays */}
      <div className="absolute inset-0 bg-background/85" />
      <div className="absolute inset-0 bg-gradient-to-l from-primary/10 via-transparent to-transparent" />

      {/* Content grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-4">
        {/* Left column - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="order-2 lg:order-1 text-center lg:text-left">

          



          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold uppercase leading-[0.95] tracking-tight mb-8">
            Train Like
            <br />
            a Beast.
            <br />
            <span className="text-gradient">Rise</span> from
            <br />
            the <span className="text-gradient">Dungeon.</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl mb-12 font-body max-w-md leading-relaxed mx-auto lg:mx-0">
            Where champions are forged in iron and fire. From beginner to beast,
            experience workouts designed to push your limits.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

            <a href="#plans" className="btn-primary-premium text-base px-12 py-5">
              Join Now
            </a>
            <a href="#about" className="btn-outline-premium text-base px-12 py-5">
              Learn More
            </a>
          </motion.div>
        </motion.div>

        {/* Right column - Athlete */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end relative">

          <motion.img
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            src={athleteImg}
            alt="Athletic fitness model in dynamic running pose"
            className="w-[280px] md:w-[340px] lg:w-[420px] xl:w-[480px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative z-10 -mb-10 lg:-ml-16" />

          {/* Red glow behind athlete */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[80px] bg-primary/20 blur-3xl rounded-full" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2">

        <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>);

};

export default HeroSection;