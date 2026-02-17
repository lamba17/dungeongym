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

  return;












































};

export default AttendanceSection;