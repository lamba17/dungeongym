import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-14 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="font-heading text-2xl font-bold tracking-[0.15em] uppercase">
          <span className="text-gradient">Dungeon</span>{" "}
          <span className="text-foreground">Gym</span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:shadow-[0_0_15px_hsl(358_95%_45%/0.3)] transition-all duration-300"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:shadow-[0_0_15px_hsl(358_95%_45%/0.3)] transition-all duration-300"
          >
            <Facebook size={18} />
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
