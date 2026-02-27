import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    title: "Phone",
    content: <a href="tel:+919876543210" className="text-muted-foreground font-body hover:text-primary transition-colors duration-300">+91 98765 43210</a>,
  },
  {
    icon: Mail,
    title: "Email",
    content: <a href="mailto:info@dungeongym.com" className="text-muted-foreground font-body hover:text-primary transition-colors duration-300">info@dungeongym.com</a>,
  },
  {
    icon: MapPin,
    title: "Address",
    content: <p className="text-muted-foreground font-body">Dungeon Gym, Industrial Area Phase 2,<br />Sector 45, Gurugram, Haryana 122003</p>,
  },
  {
    icon: Clock,
    title: "Hours",
    content: <p className="text-muted-foreground font-body">Monday - Saturday: 5:00 AM – 11:00 PM<br />Sunday: 6:00 AM – 10:00 PM</p>,
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="px-6 pt-16 pb-20 md:px-10 md:pt-20 md:pb-28 lg:px-20 lg:pt-24 lg:pb-36 bg-secondary/50">
      <div className="section-divider mb-12" />
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary mb-4 block">
            Reach Out
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {contactItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-lg uppercase tracking-[0.15em] mb-1.5">{item.title}</h4>
                  {item.content}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full h-80 lg:h-full min-h-[350px] rounded-xl overflow-hidden border border-border"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2!2d77.04!3d28.46!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzM2LjAiTiA3N8KwMDInMjQuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dungeon Gym Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
