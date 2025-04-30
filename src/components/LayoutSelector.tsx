
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutGrid, LayoutList, Square, Circle } from "lucide-react";

interface LayoutSelectorProps {
  currentLayout: {
    type: string;
    sections: number;
  };
  onLayoutChange: (layout: { type: string; sections: number }) => void;
  onShapesChange: (shapes: string[]) => void;
}

const layoutTypes = [
  {
    id: "grid",
    name: "Grid",
    icon: <LayoutGrid className="h-4 w-4" />
  },
  {
    id: "horizontal",
    name: "Horizontal",
    icon: <LayoutList className="h-4 w-4" />
  }
];

const shapeOptions = [
  { id: "circle", name: "Circles", icon: <Circle className="h-4 w-4" /> },
  { id: "square", name: "Squares", icon: <Square className="h-4 w-4" /> },
  { id: "wave", name: "Waves", icon: <Square className="h-4 w-4 rotate-45" /> }
];

const LayoutSelector = ({ currentLayout, onLayoutChange, onShapesChange }: LayoutSelectorProps) => {
  const handleShapeToggle = (shape: string, isChecked: boolean) => {
    const shapes = shapeOptions
      .filter(s => s.id === shape ? isChecked : document.getElementById(`shape-${s.id}`)?.ariaChecked === "true")
      .map(s => s.id);
      
    if (shapes.length === 0) {
      // Ensure at least one shape is selected
      shapes.push("circle");
    }
    
    onShapesChange(shapes);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Layout Style</h3>
        <Select 
          value={currentLayout.type}
          onValueChange={(value) => onLayoutChange({ ...currentLayout, type: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select layout type" />
          </SelectTrigger>
          <SelectContent>
            {layoutTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                <div className="flex items-center">
                  {type.icon}
                  <span className="ml-2">{type.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Sections</h3>
          <span className="text-sm font-medium">{currentLayout.sections}</span>
        </div>
        <Slider
          min={1}
          max={12}
          step={1}
          value={[currentLayout.sections]}
          onValueChange={(value) => onLayoutChange({ ...currentLayout, sections: value[0] })}
        />
        <span className="text-sm text-muted-foreground">
          Adjust the number of visual sections
        </span>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-medium">Shape Elements</h3>
        <div className="space-y-2">
          {shapeOptions.map((shape) => (
            <div key={shape.id} className="flex items-center space-x-2">
              <Checkbox
                id={`shape-${shape.id}`}
                defaultChecked={true}
                onCheckedChange={(checked) => handleShapeToggle(shape.id, checked as boolean)}
              />
              <Label htmlFor={`shape-${shape.id}`} className="flex items-center space-x-2">
                {shape.icon}
                <span>{shape.name}</span>
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayoutSelector;
