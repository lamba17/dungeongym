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

const ReviewCard = ({ review, index }: { review: typeof reviews[0]; index: number }) => {
  const initials = review.name.split(" ").map((n) => n[0]).join("");

  return (
    <div className="flex-shrink-0 w-[340px] bg-card border border-border p-6 flex flex-col gap-4 hover:border-primary/50 transition-colors">
      {/* Google-style header */}
      <div className="flex items-center gap-1">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-[hsl(45,100%,50%)] text-[hsl(45,100%,50%)]" />
        ))}
      </div>

      <p className="text-foreground font-body leading-relaxed text-sm flex-1">
        "{review.text}"
      </p>

      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <span className="font-heading text-sm text-primary">{initials}</span>
        </div>
        <div>
          <p className="font-heading text-sm uppercase tracking-wider text-foreground">{review.name}</p>
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
    const speed = 0.5;
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
      <div className="max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
            Member <span className="text-gradient">Reviews</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4" />
          <div className="flex items-center justify-center gap-2 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} className="fill-[hsl(45,100%,50%)] text-[hsl(45,100%,50%)]" />
            ))}
            <span className="text-foreground font-heading text-lg ml-2">5.0</span>
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
        className="flex gap-6 overflow-hidden cursor-grab"
      >
        {/* Duplicate reviews for seamless loop */}
        {[...reviews, ...reviews].map((review, i) => (
          <ReviewCard key={i} review={review} index={i} />
        ))}
      </motion.div>
    </section>
  );
};

export default ReviewsSection;
