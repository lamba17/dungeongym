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
    <section id="plans" className="section-padding bg-secondary">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
            Membership <span className="text-gradient">Plans</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-card p-6 flex flex-col ${plan.popular ? "red-border-glow" : "border border-border"}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-heading text-xs uppercase tracking-widest px-4 py-1">
                  Most Popular
                </div>
              )}

              <h3 className="font-heading text-xl uppercase tracking-widest mb-4 text-foreground">
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className="font-heading text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-muted-foreground text-sm font-body">
                    <Check size={16} className="text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="block text-center bg-primary text-primary-foreground font-heading uppercase tracking-widest py-3 hover:bg-primary/90 transition-colors text-sm"
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
