import { ModeToggle } from "./ModeToggle";
import { Link } from "react-router-dom";
import { FileSpreadsheet } from "lucide-react";
const Header = () => {
  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
            <FileSpreadsheet className="w-7 h-7 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight">
            <Link
              to="/"
              className="text-xl font-black text-foreground hover:underline focus:underline transition-colors"
            >
              CSV Extractor
            </Link>
            <a
              href="https://github.com/Berto405"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-primary hover:text-yellow-700 transition-colors w-fit"
            >
              by: Berto405
            </a>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
