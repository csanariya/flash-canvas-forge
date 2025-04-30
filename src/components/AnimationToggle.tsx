
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Play, Pause } from "lucide-react";

interface AnimationToggleProps {
  isAnimated: boolean;
  onToggle: (animated: boolean) => void;
  animationSpeed: number;
  onSpeedChange: (speed: number) => void;
}

const AnimationToggle = ({ 
  isAnimated, 
  onToggle, 
  animationSpeed, 
  onSpeedChange 
}: AnimationToggleProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isAnimated ? (
            <Play className="h-4 w-4 text-green-500" />
          ) : (
            <Pause className="h-4 w-4 text-muted-foreground" />
          )}
          <Label htmlFor="animation-toggle" className="text-sm font-medium">
            Animation
          </Label>
        </div>
        <Switch
          id="animation-toggle"
          checked={isAnimated}
          onCheckedChange={onToggle}
        />
      </div>
      
      {isAnimated && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="animation-speed" className="text-sm font-medium">
              Speed
            </Label>
            <span className="text-xs text-muted-foreground">
              {animationSpeed === 1 
                ? "Slow" 
                : animationSpeed === 2 
                  ? "Medium" 
                  : "Fast"}
            </span>
          </div>
          <Slider
            id="animation-speed"
            min={1}
            max={3}
            step={1}
            value={[animationSpeed]}
            onValueChange={(value) => onSpeedChange(value[0])}
          />
        </div>
      )}
    </div>
  );
};

export default AnimationToggle;
