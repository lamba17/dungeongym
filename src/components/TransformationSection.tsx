import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import transform1 from "@/assets/transform-1.jpg";
import transform2 from "@/assets/transform-2.jpg";

const transformations = [
  {
    image: transform1,
    name: "Rahul S.",
    testimonial: "Dungeon Gym changed my life. I went from skinny to strong in 6 months. The trainers here don't let you quit.",
  },
  {
    image: transform2,
    name: "Vikram P.",
    testimonial: "Lost 30kg in one year at Dungeon Gym. The environment, the community, the coaching — everything is world-class.",
  },
];

const TransformationCard = ({ image, name, testimonial }: { image: string; name: string; testimonial: string }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(10, Math.min(90, x)));
  };

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative h-72 md:h-96 cursor-col-resize overflow-hidden red-border-glow select-none"
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        <img src={image} alt={`${name} transformation`} className="absolute inset-0 w-full h-full object-cover" />
        <div
          className="absolute inset-0 bg-primary/20"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        />
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary z-10"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-heading">↔</span>
          </div>
        </div>
        <div className="absolute top-4 left-4 bg-background/80 px-3 py-1 font-heading text-xs uppercase tracking-widest">
          Before
        </div>
        <div className="absolute top-4 right-4 bg-primary/80 px-3 py-1 font-heading text-xs uppercase tracking-widest text-primary-foreground">
          After
        </div>
      </div>
      <div className="text-center">
        <h4 className="font-heading text-xl uppercase tracking-widest text-foreground">{name}</h4>
        <p className="text-muted-foreground font-body italic mt-2">"{testimonial}"</p>
      </div>
    </div>
  );
};

const TransformationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-secondary">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
            Real <span className="text-gradient">Transformations</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {transformations.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <TransformationCard {...t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
