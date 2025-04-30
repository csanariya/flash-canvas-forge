
import { useState } from "react";
import CanvasCreator from "@/components/CanvasCreator";
import ThemeSelector from "@/components/ThemeSelector";
import LayoutSelector from "@/components/LayoutSelector";
import TextEditor from "@/components/TextEditor";
import AnimationToggle from "@/components/AnimationToggle";
import ExportOptions from "@/components/ExportOptions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [theme, setTheme] = useState("dark");
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [layout, setLayout] = useState({ type: "grid", sections: 4 });
  const [primaryText, setPrimaryText] = useState("85%");
  const [secondaryText, setSecondaryText] = useState("Engagement increase");
  const [sectionTexts, setSectionTexts] = useState(Array(4).fill("").map((_, i) => `Section ${i+1}`));
  const [isAnimated, setIsAnimated] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(2); // 1=slow, 2=medium, 3=fast
  const [shapes, setShapes] = useState(["circle", "square", "wave"]);
  
  const handleCyclePalette = () => {
    setPaletteIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const handleLayoutChange = (newLayout: { type: string; sections: number }) => {
    // Ensure sectionTexts array is properly sized when layout changes
    const newSectionTexts = [...sectionTexts];
    
    // Add entries if needed
    while (newSectionTexts.length < newLayout.sections) {
      newSectionTexts.push(`Section ${newSectionTexts.length + 1}`);
    }
    
    // Remove extras if needed
    while (newSectionTexts.length > newLayout.sections) {
      newSectionTexts.pop();
    }
    
    setSectionTexts(newSectionTexts);
    setLayout(newLayout);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Flash Canvas Forge
          </h1>
          <p className="text-muted-foreground text-center max-w-md mt-2">
            Create beautiful, customizable canvas backgrounds for your projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="col-span-1 md:col-span-4 lg:col-span-3 space-y-6">
            <div className="bg-card rounded-lg shadow p-4 space-y-4">
              <Tabs defaultValue="theme">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="theme">Theme</TabsTrigger>
                  <TabsTrigger value="layout">Layout</TabsTrigger>
                  <TabsTrigger value="text">Text</TabsTrigger>
                </TabsList>
                
                <TabsContent value="theme" className="space-y-4 pt-4">
                  <ThemeSelector 
                    selectedTheme={theme} 
                    onSelectTheme={setTheme}
                    paletteIndex={paletteIndex}
                    onCyclePalette={handleCyclePalette}
                  />
                </TabsContent>
                
                <TabsContent value="layout" className="space-y-4 pt-4">
                  <LayoutSelector
                    currentLayout={layout}
                    onLayoutChange={handleLayoutChange}
                    onShapesChange={setShapes}
                    sectionTexts={sectionTexts}
                    onSectionTextsChange={setSectionTexts}
                  />
                </TabsContent>
                
                <TabsContent value="text" className="space-y-4 pt-4">
                  <TextEditor
                    primaryText={primaryText}
                    secondaryText={secondaryText}
                    onPrimaryTextChange={setPrimaryText}
                    onSecondaryTextChange={setSecondaryText}
                  />
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="bg-card rounded-lg shadow p-4 space-y-4">
              <h3 className="text-lg font-medium">Export Options</h3>
              <Separator />
              <AnimationToggle 
                isAnimated={isAnimated} 
                onToggle={setIsAnimated} 
                animationSpeed={animationSpeed}
                onSpeedChange={setAnimationSpeed}
              />
              <ExportOptions isAnimated={isAnimated} />
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-8 lg:col-span-9">
            <div className="bg-card rounded-lg shadow p-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-md">
                <CanvasCreator
                  theme={theme}
                  paletteIndex={paletteIndex}
                  layout={layout}
                  primaryText={primaryText}
                  secondaryText={secondaryText}
                  sectionTexts={sectionTexts}
                  isAnimated={isAnimated}
                  animationSpeed={animationSpeed}
                  shapes={shapes}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
