
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
  CircleDashed,
  SquareDashed
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface LayoutSelectorProps {
  currentLayout: {
    type: string;
    sections: number;
  };
  onLayoutChange: (layout: { type: string; sections: number }) => void;
  onShapesChange: (shapes: string[]) => void;
  sectionTexts: string[];
  onSectionTextsChange: (texts: string[]) => void;
  primaryText?: string;
  secondaryText?: string;
  onPrimaryTextChange?: (text: string) => void;
  onSecondaryTextChange?: (text: string) => void;
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
  { id: "line", name: "Lines", icon: <Square className="h-4 w-4 rotate-45" /> },
  { id: "curve", name: "Curves", icon: <CircleDashed className="h-4 w-4" /> },
  { id: "wave", name: "Waves", icon: <Square className="h-4 w-4 rotate-45" /> },
  { id: "blob", name: "Blobs", icon: <SquareDashed className="h-4 w-4" /> }
];

const LayoutSelector = ({ 
  currentLayout, 
  onLayoutChange, 
  onShapesChange,
  sectionTexts = [], // Provide default empty array
  onSectionTextsChange,
  primaryText = "85%",
  secondaryText = "Engagement increase",
  onPrimaryTextChange,
  onSecondaryTextChange
}: LayoutSelectorProps) => {
  const [selectedShapes, setSelectedShapes] = useState<string[]>(["circle", "square", "wave"]);
  const [sectionInputs, setSectionInputs] = useState<{primary: string, secondary: string}[]>([]);
  
  // Initialize section inputs based on sectionTexts
  useEffect(() => {
    if (sectionTexts && sectionTexts.length > 0) {
      const newInputs = sectionTexts.map(text => {
        const parts = text.split('|');
        return {
          primary: parts[0] || '',
          secondary: parts[1] || ''
        };
      });
      setSectionInputs(newInputs);
    }
  }, []);
  
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

  const updateSectionText = (index: number, field: 'primary' | 'secondary', value: string) => {
    const newInputs = [...sectionInputs];
    
    // Create the object if it doesn't exist
    if (!newInputs[index]) {
      newInputs[index] = { primary: '', secondary: '' };
    }
    
    // Update the specific field
    newInputs[index][field] = value;
    setSectionInputs(newInputs);
    
    // Update the combined text format (primary|secondary)
    const newTexts = newInputs.map(input => `${input.primary}|${input.secondary}`);
    onSectionTextsChange(newTexts);
  };

  // Ensure we have enough text entries for all sections
  useEffect(() => {
    if (currentLayout.sections > 0) {
      const newInputs = [...sectionInputs];
      
      // Add entries if needed
      while (newInputs.length < currentLayout.sections) {
        newInputs.push({
          primary: `Section ${newInputs.length + 1}`,
          secondary: ''
        });
      }
      
      // Remove extras if needed
      while (newInputs.length > currentLayout.sections) {
        newInputs.pop();
      }
      
      setSectionInputs(newInputs);
      
      // Update the combined text format
      const newTexts = newInputs.map(input => `${input.primary}|${input.secondary}`);
      onSectionTextsChange(newTexts);
    }
  }, [currentLayout.sections]);
  
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

      <div className="space-y-3 border-t pt-3">
        <h3 className="text-lg font-medium">Title Text</h3>
        <div className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="primary-text">Main Title</Label>
            <Input
              id="primary-text"
              value={primaryText}
              onChange={(e) => onPrimaryTextChange && onPrimaryTextChange(e.target.value)}
              placeholder="Enter main title"
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="secondary-text">Subtitle</Label>
            <Input
              id="secondary-text"
              value={secondaryText}
              onChange={(e) => onSecondaryTextChange && onSecondaryTextChange(e.target.value)}
              placeholder="Enter subtitle"
              className="text-sm"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-lg font-medium">Section Text</h3>
        <div className="space-y-4 max-h-48 overflow-y-auto pr-1">
          {sectionInputs.map((input, index) => (
            <div key={`section-${index}`} className="space-y-2 pb-2 border-b border-border">
              <p className="text-sm font-medium">Section {index + 1}</p>
              
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor={`section-primary-${index}`} className="text-xs">Primary Text</Label>
                  <Input
                    id={`section-primary-${index}`}
                    value={input.primary}
                    onChange={(e) => updateSectionText(index, 'primary', e.target.value)}
                    placeholder={`Section ${index + 1}`}
                    className="text-sm"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor={`section-secondary-${index}`} className="text-xs">Secondary Text</Label>
                  <Input
                    id={`section-secondary-${index}`}
                    value={input.secondary}
                    onChange={(e) => updateSectionText(index, 'secondary', e.target.value)}
                    placeholder="Optional section description"
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 border-t pt-3">
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
