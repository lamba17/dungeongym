import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import facilityStrength from "@/assets/facility-strength.jpg";
import facilityCardio from "@/assets/facility-cardio.jpg";
import facilityFunctional from "@/assets/facility-functional.jpg";
import facilityLocker from "@/assets/facility-locker.jpg";
import facilityHeavy from "@/assets/facility-heavy.jpg";

const facilities = [
  { name: "Strength Zone", image: facilityStrength },
  { name: "Cardio Zone", image: facilityCardio },
  { name: "Functional Training", image: facilityFunctional },
  { name: "Locker Area", image: facilityLocker },
  { name: "Heavy Equipment", image: facilityHeavy },
];

const FacilitiesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="facilities" className="section-padding bg-background">
      <div className="section-divider mb-20" />
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary mb-4 block">
            World-Class Equipment
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
            Our <span className="text-gradient">Facilities</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {facilities.map((facility, i) => (
            <motion.div
              key={facility.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative group image-hover-zoom rounded-xl overflow-hidden cursor-pointer ${
                i === 0 ? "sm:col-span-2 lg:col-span-1 sm:row-span-2 lg:row-span-1" : ""
              }`}
            >
              <img
                src={facility.image}
                alt={facility.name}
                className="w-full h-72 sm:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 border border-transparent group-hover:border-primary/50 rounded-xl transition-all duration-500 group-hover:shadow-[0_0_25px_hsl(358_95%_45%/0.2)]" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-heading text-lg uppercase tracking-[0.15em] text-foreground group-hover:text-primary transition-colors duration-300">
                  {facility.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
