
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ExportOptionsProps {
  isAnimated: boolean;
}

const ExportOptions = ({ isAnimated }: ExportOptionsProps) => {
  const handleDownloadImage = () => {
    const canvas = document.getElementById("canvas-output") as HTMLCanvasElement;
    if (!canvas) return;
    
    const link = document.createElement("a");
    link.download = `flash-canvas-${Date.now()}.${isAnimated ? "gif" : "png"}`;
    
    if (isAnimated) {
      // For GIF we would need a proper GIF encoding library
      // This is a placeholder for the actual implementation
      alert("GIF export functionality will be implemented with a proper GIF encoder");
    } else {
      // For static image we can use toDataURL
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };
  
  return (
    <div className="space-y-4">
      <Button 
        onClick={handleDownloadImage}
        className="w-full flex items-center gap-2"
        variant="default"
      >
        <Download className="h-4 w-4" />
        Download as {isAnimated ? "GIF" : "PNG"}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        {isAnimated 
          ? "Download an animated version of your canvas" 
          : "Download a high-quality image of your canvas"}
      </p>
    </div>
  );
};

export default ExportOptions;
