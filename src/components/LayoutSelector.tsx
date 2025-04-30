
import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  LayoutGrid, 
  LayoutList, 
  Square, 
  Circle, 
  Line, 
  Curve 
} from "lucide-react";

interface LayoutSelectorProps {
  currentLayout: {
    type: string;
    sections: number;
  };
  onLayoutChange: (layout: { type: string; sections: number }) => void;
  onShapesChange: (shapes: string[]) => void;
  sectionTexts: string[];
  onSectionTextsChange: (texts: string[]) => void;
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
    icon: <LayoutList className="h-4 w-4 rotate-0" />
  },
  {
    id: "columns-2",
    name: "Two Columns",
    icon: <LayoutList className="h-4 w-4 rotate-90" />
  },
  {
    id: "columns-3",
    name: "Three Columns",
    icon: <LayoutList className="h-4 w-4 rotate-90" />
  }
];

const shapeOptions = [
  { id: "circle", name: "Circles", icon: <Circle className="h-4 w-4" /> },
  { id: "square", name: "Squares", icon: <Square className="h-4 w-4" /> },
  { id: "line", name: "Lines", icon: <Line className="h-4 w-4" /> },
  { id: "curve", name: "Curves", icon: <Curve className="h-4 w-4" /> },
  { id: "wave", name: "Waves", icon: <Square className="h-4 w-4 rotate-45" /> },
  { id: "blob", name: "Blobs", icon: <Circle className="h-4 w-4 stroke-dashed" /> }
];

const LayoutSelector = ({ 
  currentLayout, 
  onLayoutChange, 
  onShapesChange,
  sectionTexts,
  onSectionTextsChange 
}: LayoutSelectorProps) => {
  const [selectedShapes, setSelectedShapes] = useState<string[]>(["circle", "square", "wave"]);
  
  const handleShapeToggle = (shape: string, isChecked: boolean) => {
    let newShapes = [...selectedShapes];
    
    if (isChecked) {
      if (!newShapes.includes(shape)) {
        newShapes.push(shape);
      }
    } else {
      newShapes = newShapes.filter(s => s !== shape);
    }
    
    if (newShapes.length === 0) {
      // Ensure at least one shape is selected
      newShapes = ["circle"];
    }
    
    setSelectedShapes(newShapes);
    onShapesChange(newShapes);
  };

  const updateSectionText = (index: number, text: string) => {
    const newTexts = [...sectionTexts];
    newTexts[index] = text;
    onSectionTextsChange(newTexts);
  };

  // Ensure we have enough text entries for all sections
  useEffect(() => {
    if (sectionTexts.length !== currentLayout.sections) {
      const newTexts = [...sectionTexts];
      
      // Add entries if needed
      while (newTexts.length < currentLayout.sections) {
        newTexts.push(`Section ${newTexts.length + 1}`);
      }
      
      // Remove extras if needed
      while (newTexts.length > currentLayout.sections) {
        newTexts.pop();
      }
      
      onSectionTextsChange(newTexts);
    }
  }, [currentLayout.sections, sectionTexts, onSectionTextsChange]);
  
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
        <h3 className="text-lg font-medium">Section Text</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {sectionTexts.map((text, index) => (
            <div key={`section-${index}`} className="flex items-center space-x-2">
              <span className="text-sm font-medium min-w-8">{index + 1}:</span>
              <Input
                value={text}
                onChange={(e) => updateSectionText(index, e.target.value)}
                placeholder={`Section ${index + 1}`}
                className="text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-medium">Shape Elements</h3>
        <div className="space-y-2">
          {shapeOptions.map((shape) => (
            <div key={shape.id} className="flex items-center space-x-2">
              <Checkbox
                id={`shape-${shape.id}`}
                checked={selectedShapes.includes(shape.id)}
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
