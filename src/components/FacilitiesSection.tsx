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
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
            Our <span className="text-gradient">Facilities</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {facilities.map((facility, i) => (
            <motion.div
              key={facility.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative group image-hover-zoom ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <img
                src={facility.image}
                alt={facility.name}
                className="w-full h-64 sm:h-72 object-cover"
              />
              <div className="absolute inset-0 bg-background/60 group-hover:bg-background/40 transition-colors duration-300 flex items-end p-6">
                <h3 className="font-heading text-xl uppercase tracking-widest text-foreground">
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
