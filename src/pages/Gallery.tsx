import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

import gymInterior1 from "@/assets/gym-interior-1.jpg";
import gymInterior2 from "@/assets/gym-interior-2.jpg";
import gymExterior from "@/assets/gym-exterior.jpg";
import facilityStrength from "@/assets/facility-strength.jpg";
import facilityCardio from "@/assets/facility-cardio.jpg";
import facilityFunctional from "@/assets/facility-functional.jpg";
import facilityLocker from "@/assets/facility-locker.jpg";
import facilityHeavy from "@/assets/facility-heavy.jpg";
import founderPortrait from "@/assets/founder-portrait.jpg";
import founderAction from "@/assets/founder-action.jpg";
import outdoorBootcamp from "@/assets/outdoor-bootcamp.jpg";
import outdoorWorkout from "@/assets/outdoor-workout.jpg";
import outdoorGroup from "@/assets/outdoor-group.jpg";
import transform1 from "@/assets/transform-1.jpg";
import transform2 from "@/assets/transform-2.jpg";

const categories = ["All", "Interiors", "Exterior", "Transformations", "Outdoor", "Trainers"] as const;

type Category = (typeof categories)[number];

const images: { src: string; category: Category[]; alt: string }[] = [
  { src: gymInterior1, category: ["All", "Interiors"], alt: "Gym interior with red lighting" },
  { src: gymInterior2, category: ["All", "Interiors"], alt: "Weight room" },
  { src: facilityStrength, category: ["All", "Interiors"], alt: "Strength zone" },
  { src: facilityCardio, category: ["All", "Interiors"], alt: "Cardio zone" },
  { src: facilityFunctional, category: ["All", "Interiors"], alt: "Functional training area" },
  { src: facilityLocker, category: ["All", "Interiors"], alt: "Locker area" },
  { src: facilityHeavy, category: ["All", "Interiors"], alt: "Heavy equipment section" },
  { src: gymExterior, category: ["All", "Exterior"], alt: "Gym exterior at night" },
  { src: transform1, category: ["All", "Transformations"], alt: "Body transformation 1" },
  { src: transform2, category: ["All", "Transformations"], alt: "Body transformation 2" },
  { src: outdoorBootcamp, category: ["All", "Outdoor"], alt: "Outdoor bootcamp" },
  { src: outdoorWorkout, category: ["All", "Outdoor"], alt: "Outdoor workout" },
  { src: outdoorGroup, category: ["All", "Outdoor"], alt: "Group training" },
  { src: founderPortrait, category: ["All", "Trainers"], alt: "Akash Lamba portrait" },
  { src: founderAction, category: ["All", "Trainers"], alt: "Akash Lamba training" },
];

const Gallery = () => {
  const [active, setActive] = useState<Category>("All");
  const filtered = images.filter((img) => img.category.includes(active));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 section-padding">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4 text-center">
            Our <span className="text-gradient">Gallery</span>
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-12" />

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-heading text-sm uppercase tracking-widest px-5 py-2 transition-all ${
                  active === cat
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((img, i) => (
              <motion.div
                key={img.alt + active}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="relative image-hover-zoom group"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Gallery;
