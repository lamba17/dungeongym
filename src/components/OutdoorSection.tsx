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
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
            Outdoor <span className="text-gradient">Activities</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="space-y-6">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative image-hover-zoom h-64 md:h-80"
            >
              <img
                src={activity.image}
                alt={activity.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-background/70 flex items-center justify-center flex-col p-6">
                <h3 className="font-heading text-3xl md:text-4xl uppercase tracking-widest text-foreground mb-2">
                  {activity.name}
                </h3>
                <p className="text-muted-foreground font-body text-center max-w-md">{activity.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutdoorSection;
