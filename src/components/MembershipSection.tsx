import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Monthly",
    price: "₹1,999",
    period: "/month",
    features: ["Full gym access", "Locker facility", "Free Wi-Fi", "Basic fitness assessment"],
    popular: false,
  },
  {
    name: "Quarterly",
    price: "₹4,999",
    period: "/3 months",
    features: ["Full gym access", "Locker facility", "Free Wi-Fi", "Diet consultation", "1 personal training session"],
    popular: true,
  },
  {
    name: "Annual",
    price: "₹14,999",
    period: "/year",
    features: ["Full gym access", "Locker facility", "Free Wi-Fi", "Monthly diet plans", "4 personal training sessions", "Priority booking"],
    popular: false,
  },
  {
    name: "Personal Training",
    price: "₹7,999",
    period: "/month",
    features: ["Dedicated personal trainer", "Custom workout plans", "Nutrition coaching", "Progress tracking", "Unlimited gym access", "Recovery guidance"],
    popular: false,
  },
];

const MembershipSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="plans" className="section-padding bg-secondary/50">
      <div className="section-divider mb-20" />
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary mb-4 block">
            Choose Your Path
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
            Membership <span className="text-gradient">Plans</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative bg-card rounded-xl p-7 flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                plan.popular
                  ? "red-border-glow ring-1 ring-primary/30"
                  : "border border-border hover:border-primary/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-heading text-xs uppercase tracking-[0.2em] px-5 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="font-heading text-xl uppercase tracking-[0.15em] mb-5 text-foreground">
                {plan.name}
              </h3>
              <div className="mb-7">
                <span className="font-heading text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
              </div>

              <ul className="flex-1 space-y-3.5 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-muted-foreground text-sm font-body">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-primary" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center font-heading uppercase tracking-[0.15em] py-3.5 rounded-lg transition-all duration-300 text-sm ${
                  plan.popular
                    ? "bg-primary text-primary-foreground red-glow red-glow-hover hover:brightness-110"
                    : "border border-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                Join Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
