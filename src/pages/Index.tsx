import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FounderSection from "@/components/FounderSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import MembershipSection from "@/components/MembershipSection";
import OutdoorSection from "@/components/OutdoorSection";
import TransformationSection from "@/components/TransformationSection";
import AttendanceSection from "@/components/AttendanceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FounderSection />
      <FacilitiesSection />
      <MembershipSection />
      <OutdoorSection />
      <TransformationSection />
      <AttendanceSection />
      <ContactSection />
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;
