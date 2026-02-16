import { MessageCircle, Phone } from "lucide-react";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 md:bottom-6 md:right-6">
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[hsl(142,70%,40%)] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} className="text-primary-foreground" />
      </a>
      <a
        href="tel:+919876543210"
        className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform md:hidden"
        aria-label="Call us"
      >
        <Phone size={24} className="text-primary-foreground" />
      </a>
    </div>
  );
};

export default FloatingButtons;
