
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn("w-full py-6 px-8 animate-fade-in", className)}>
      <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center justify-center p-1.5 px-3 mb-2 text-xs font-medium rounded-full bg-primary/10 text-primary animate-fade-in">
          Powered by Google Cloud Vision
        </div>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-2 animate-slide-down">
          Visionary Kids Drawings
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto animate-slide-up delay-150">
          Upload your children's artwork and let AI discover what they've created. Our application uses advanced image recognition to identify objects and concepts in drawings.
        </p>
      </div>
    </header>
  );
};

export default Header;
