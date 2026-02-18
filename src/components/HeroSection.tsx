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

      {/* Overlays — smooth gradient blend, no harsh split */}
      <div className="absolute inset-0 bg-background/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,hsl(358_95%_45%/0.12),transparent_70%)]" />

      {/* Content grid — true 50/50 */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-4 lg:gap-0 min-h-screen py-24">
        {/* Left column - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="order-2 lg:order-1 text-center lg:text-left flex flex-col justify-center">



          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold uppercase leading-[1.05] tracking-tight mb-10 max-w-[600px] mx-auto lg:mx-0">
            Train Like
            <br />
            a Beast.
            <br />
            <span className="text-gradient">Rise</span> from
            <br />
            the <span className="text-gradient">Dungeon.</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl mb-14 font-body max-w-[460px] leading-relaxed mx-auto lg:mx-0">
            Where champions are forged in iron and fire. From beginner to beast,
            experience workouts designed to push your limits.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-row gap-5 justify-center lg:justify-start">

            <a href="#plans" className="btn-primary-premium text-base px-10 py-4 hover:scale-105 transition-transform">
              Join Now
            </a>
            <a href="#about" className="btn-outline-premium text-base px-10 py-4 hover:scale-105 transition-transform">
              Learn More
            </a>
          </motion.div>
        </motion.div>

        {/* Right column - Athlete */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="order-1 lg:order-2 flex items-center justify-center relative">

          {/* Red radial glow behind model */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(358_95%_45%/0.18),transparent_65%)]" />

          <motion.img
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            src={athleteImg}
            alt="Athletic fitness model in dynamic running pose"
            className="w-[320px] md:w-[400px] lg:w-[500px] xl:w-[560px] h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)] relative z-10 lg:-ml-20" />

          {/* Shadow under feet */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-[20px] bg-background/80 blur-2xl rounded-full" />
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