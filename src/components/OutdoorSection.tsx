import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import outdoorBootcamp from "@/assets/outdoor-bootcamp.jpg";
import outdoorWorkout from "@/assets/outdoor-workout.jpg";
import outdoorGroup from "@/assets/outdoor-group.jpg";

const activities = [
  { name: "Bootcamps", image: outdoorBootcamp, desc: "High-intensity outdoor sessions that push your limits" },
  { name: "Outdoor Workouts", image: outdoorWorkout, desc: "Train under open skies with raw energy" },
  { name: "Group Training", image: outdoorGroup, desc: "Unite with the pack and conquer together" },
];

const OutdoorSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background">
      <div className="section-divider mb-20" />
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary mb-4 block">
            Beyond The Walls
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
            Outdoor <span className="text-gradient">Activities</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative group image-hover-zoom rounded-xl overflow-hidden h-80 md:h-[420px] cursor-pointer"
            >
              <img
                src={activity.image}
                alt={activity.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-0 border border-transparent group-hover:border-primary/40 rounded-xl transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-2xl uppercase tracking-[0.1em] text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {activity.name}
                </h3>
                <p className="text-foreground/60 font-body text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                  {activity.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutdoorSection;
