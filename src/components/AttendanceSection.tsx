import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Smartphone, ScanLine, CheckCircle } from "lucide-react";

const steps = [
{ icon: Smartphone, title: "Open App", desc: "Launch the Dungeon Gym app on your phone" },
{ icon: ScanLine, title: "Scan Barcode", desc: "Scan your unique QR/barcode at the gym entrance" },
{ icon: CheckCircle, title: "Attendance Marked", desc: "Your attendance is recorded automatically" }];


const AttendanceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
            Scan. Enter. <span className="text-gradient">Train.</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Members use the Dungeon Gym app to scan their unique QR/barcode at entry to mark attendance automatically.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="text-center p-8 bg-secondary rounded-lg red-border-glow"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl uppercase tracking-widest mb-2 text-foreground">Step {i + 1}</h3>
              <h4 className="font-heading text-lg text-primary mb-2">{step.title}</h4>
              <p className="text-muted-foreground font-body text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AttendanceSection;