
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

const LoadingState = ({ 
  message = "Analyzing your image...", 
  className 
}: LoadingStateProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)}>
      <div className="relative">
        <Loader2 size={36} className="text-primary animate-spin" />
        <div className="absolute inset-0 blur-sm opacity-70 animate-pulse">
          <Loader2 size={36} className="text-primary" />
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-lg font-medium animate-pulse">{message}</p>
        <p className="text-muted-foreground text-sm mt-2">This may take a moment</p>
      </div>
    </div>
  );
};

export default LoadingState;
