import { MessageCircle, Phone } from "lucide-react";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[hsl(142,70%,40%)] rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-[0_0_20px_hsl(142_70%_40%/0.4)] transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} className="text-primary-foreground" />
      </a>
      <a
        href="tel:+919876543210"
        className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 red-glow-hover transition-all duration-300 md:hidden"
        aria-label="Call us"
      >
        <Phone size={24} className="text-primary-foreground" />
      </a>
    </div>
  );
};

export default FloatingButtons;
