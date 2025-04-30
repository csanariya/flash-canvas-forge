
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

const themes = [
  {
    id: "dark",
    name: "Dark",
    description: "Deep gradients with vibrant accents"
  },
  {
    id: "light",
    name: "Light",
    description: "Soft pastels with gentle gradients"
  },
  {
    id: "multicolor",
    name: "Multi-color",
    description: "Rich, vibrant color combinations"
  }
];

interface ThemeSelectorProps {
  selectedTheme: string;
  onSelectTheme: (theme: string) => void;
  paletteIndex: number;
  onCyclePalette: () => void;
}

const ThemeSelector = ({ 
  selectedTheme, 
  onSelectTheme,
  paletteIndex,
  onCyclePalette
}: ThemeSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Choose a Theme</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1" 
          onClick={onCyclePalette}
        >
          <RotateCw className="h-3 w-3" />
          <span className="text-xs">Cycle Palette</span>
        </Button>
      </div>
      <RadioGroup
        value={selectedTheme}
        onValueChange={onSelectTheme}
        className="space-y-2"
      >
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`flex items-center space-x-3 rounded-md border p-3 cursor-pointer transition-all hover:bg-accent ${
              selectedTheme === theme.id ? "border-primary bg-accent/50" : "border-muted"
            }`}
            onClick={() => onSelectTheme(theme.id)}
          >
            <RadioGroupItem value={theme.id} id={`theme-${theme.id}`} />
            <div className="flex flex-col">
              <Label htmlFor={`theme-${theme.id}`} className="font-medium">
                {theme.name}
              </Label>
              <span className="text-sm text-muted-foreground">
                {theme.description}
              </span>
            </div>
            <div className="ml-auto h-8 w-8 rounded-md overflow-hidden">
              <div 
                className={`h-full w-full ${
                  theme.id === "dark" 
                    ? "bg-gradient-to-br from-slate-900 to-indigo-900" 
                    : theme.id === "light" 
                      ? "bg-gradient-to-br from-sky-100 to-indigo-200"
                      : "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500"
                }`} 
              />
              <span className="absolute bottom-0 right-0 bg-background/80 text-xs px-1 rounded">
                {paletteIndex + 1}/3
              </span>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ThemeSelector;
