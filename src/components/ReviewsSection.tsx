import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rahul Sharma",
    result: "Lost 18kg in 5 months",
    text: "Best gym environment in the city. The vibe is intense and motivating. Every session feels like a war — and I love it.",
    rating: 5,
  },
  {
    name: "Priya Verma",
    result: "Gained lean muscle in 3 months",
    text: "Dungeon Gym is not just a gym, it's a lifestyle. The trainers push you beyond your limits. Akash sir is the best coach I've ever had.",
    rating: 5,
  },
  {
    name: "Arjun Patel",
    result: "Deadlift PR: 200kg",
    text: "The equipment here is top-notch and the atmosphere is unmatched. If you want results, this is the only place to train.",
    rating: 5,
  },
  {
    name: "Sneha Kapoor",
    result: "Complete body transformation",
    text: "I was scared to join a hardcore gym, but the community here is so supportive. My confidence has skyrocketed. 10/10 recommend.",
    rating: 5,
  },
  {
    name: "Deepak Yadav",
    result: "Lost 25kg in 8 months",
    text: "From 105kg to 80kg — Dungeon Gym made it possible. The discipline, the diet guidance, the intense workouts. Life-changing.",
    rating: 5,
  },
  {
    name: "Ananya Singh",
    result: "Strength doubled in 4 months",
    text: "Finally a gym that takes women's strength training seriously. No judgment, just pure grind. The red lights hit different at 5 AM.",
    rating: 5,
  },
];

const ReviewCard = ({ review, featured = false }: { review: typeof reviews[0]; featured?: boolean }) => {
  const initials = review.name.split(" ").map((n) => n[0]).join("");

  return (
    <div
      className={`flex-shrink-0 w-[340px] rounded-xl p-6 flex flex-col gap-4 transition-all duration-500 ${
        featured
          ? "bg-card border border-primary/30 shadow-[0_0_30px_hsl(358_95%_45%/0.1)]"
          : "bg-card border border-border hover:border-primary/30"
      }`}
    >
      <div className="flex items-center gap-1">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-[hsl(45,100%,50%)] text-[hsl(45,100%,50%)]" />
        ))}
      </div>

      <p className="text-foreground/80 font-body leading-relaxed text-sm flex-1">
        "{review.text}"
      </p>

      <div className="flex items-center gap-3 pt-3 border-t border-border">
        <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
          <span className="font-heading text-sm text-primary">{initials}</span>
        </div>
        <div>
          <p className="font-heading text-sm uppercase tracking-[0.1em] text-foreground">{review.name}</p>
          <p className="text-primary text-xs font-body">{review.result}</p>
        </div>
      </div>
    </div>
  );
};

const ReviewsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    let pos = 0;
    const speed = 0.4;
    const halfWidth = el.scrollWidth / 2;

    const animate = () => {
      if (!isPaused) {
        pos += speed;
        if (pos >= halfWidth) pos = 0;
        el.scrollLeft = pos;
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  return (
    <section className="section-padding bg-background overflow-hidden" ref={ref}>
      <div className="section-divider mb-20" />
      <div className="max-w-7xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary mb-4 block">
            What Members Say
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-6">
            Member <span className="text-gradient">Reviews</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={22} className="fill-[hsl(45,100%,50%)] text-[hsl(45,100%,50%)]" />
            ))}
            <span className="text-foreground font-heading text-xl ml-3">5.0</span>
          </div>
          <p className="text-muted-foreground font-body text-sm">Based on 200+ Google Reviews</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-5 overflow-hidden cursor-grab"
      >
        {[...reviews, ...reviews].map((review, i) => (
          <ReviewCard key={i} review={review} featured={i === 0} />
        ))}
      </motion.div>
    </section>
  );
};

export default ReviewsSection;
