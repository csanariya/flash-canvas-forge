
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Play, Pause } from "lucide-react";

interface AnimationToggleProps {
  isAnimated: boolean;
  onToggle: (animated: boolean) => void;
}

const AnimationToggle = ({ isAnimated, onToggle }: AnimationToggleProps) => {
  return (
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
  );
};

export default AnimationToggle;
