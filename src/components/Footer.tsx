import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-heading text-2xl font-bold tracking-wider uppercase">
          <span className="text-gradient">Dungeon</span>{" "}
          <span className="text-foreground">Gym</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Instagram size={24} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Facebook size={24} />
          </a>
        </div>

        <p className="text-muted-foreground text-sm font-body">
          © 2025 Dungeon Gym. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
