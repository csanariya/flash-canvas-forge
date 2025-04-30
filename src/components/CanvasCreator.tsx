
import React, { useRef, useEffect } from "react";
import { getDarkTheme, getLightTheme, getMulticolorTheme } from "@/utils/themes";

interface CanvasCreatorProps {
  theme: string;
  paletteIndex: number;
  layout: {
    type: string;
    sections: number;
  };
  primaryText: string;
  secondaryText: string;
  sectionTexts: string[];
  isAnimated: boolean;
  animationSpeed: number;
  shapes: string[];
}

const CanvasCreator = ({
  theme,
  paletteIndex,
  layout,
  primaryText,
  secondaryText,
  sectionTexts,
  isAnimated,
  animationSpeed,
  shapes,
}: CanvasCreatorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const timeRef = useRef<number>(0);
  const elementsRef = useRef<any[]>([]);
  
  // Set up canvas elements and animation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Get theme colors
    const getThemeColors = () => {
      switch (theme) {
        case "dark":
          return getDarkTheme(paletteIndex);
        case "light":
          return getLightTheme(paletteIndex);
        case "multicolor":
          return getMulticolorTheme(paletteIndex);
        default:
          return getDarkTheme(paletteIndex);
      }
    };

    const themeColors = getThemeColors();
    
    // Draw the background
    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, themeColors.gradientStart);
      gradient.addColorStop(1, themeColors.gradientEnd);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    // Calculate section dimensions based on layout type
    const getSectionDimensions = () => {
      const { type, sections } = layout;
      const sectionDims = [];
      
      // Reserve space for the title - use 15% of canvas height for title area
      const titleAreaHeight = canvas.height * 0.15;
      const availableHeight = canvas.height - titleAreaHeight;
      
      if (type === "grid") {
        const gridSize = Math.ceil(Math.sqrt(sections));
        const cellWidth = canvas.width / gridSize;
        const cellHeight = availableHeight / gridSize;
        
        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            if (i * gridSize + j < sections) {
              sectionDims.push({
                x: j * cellWidth,
                y: titleAreaHeight + (i * cellHeight), // Start after title area
                width: cellWidth,
                height: cellHeight,
                index: i * gridSize + j
              });
            }
          }
        }
      } else if (type === "horizontal") {
        const sectionHeight = availableHeight / sections;
        
        for (let i = 0; i < sections; i++) {
          sectionDims.push({
            x: 0,
            y: titleAreaHeight + (i * sectionHeight), // Start after title area
            width: canvas.width,
            height: sectionHeight,
            index: i
          });
        }
      } else if (type === "columns-2") {
        const columnWidth = canvas.width / 2;
        const rowsPerColumn = Math.ceil(sections / 2);
        const rowHeight = availableHeight / rowsPerColumn;
        
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < rowsPerColumn; j++) {
            const index = i * rowsPerColumn + j;
            if (index < sections) {
              sectionDims.push({
                x: i * columnWidth,
                y: titleAreaHeight + (j * rowHeight), // Start after title area
                width: columnWidth,
                height: rowHeight,
                index
              });
            }
          }
        }
      } else if (type === "columns-3") {
        const columnWidth = canvas.width / 3;
        const rowsPerColumn = Math.ceil(sections / 3);
        const rowHeight = availableHeight / rowsPerColumn;
        
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < rowsPerColumn; j++) {
            const index = i * rowsPerColumn + j;
            if (index < sections) {
              sectionDims.push({
                x: i * columnWidth,
                y: titleAreaHeight + (j * rowHeight), // Start after title area
                width: columnWidth,
                height: rowHeight,
                index
              });
            }
          }
        }
      }
      
      return sectionDims;
    };
    
    // Draw sections based on layout
    const drawSections = () => {
      const sectionDims = getSectionDimensions();
      
      sectionDims.forEach(section => {
        // Remove gridlines by not drawing section borders
        // ctx.strokeStyle = themeColors.accent;
        // ctx.lineWidth = 1;
        // ctx.strokeRect(section.x, section.y, section.width, section.height);
        
        // Draw section text if available
        if (sectionTexts && sectionTexts[section.index]) {
          const texts = sectionTexts[section.index].split('|');
          const primaryText = texts[0] || '';
          const secondaryText = texts[1] || '';
          
          ctx.save();
          
          // Draw primary text
          if (primaryText) {
            ctx.font = `bold ${Math.max(section.width / 12, 12)}px sans-serif`;
            ctx.textAlign = "center";
            ctx.fillStyle = themeColors.text;
            ctx.fillText(
              primaryText,
              section.x + section.width / 2,
              section.y + section.height / 2 - 10
            );
          }
          
          // Draw secondary text
          if (secondaryText) {
            ctx.font = `${Math.max(section.width / 18, 10)}px sans-serif`;
            ctx.textAlign = "center";
            ctx.fillStyle = themeColors.subtext;
            ctx.fillText(
              secondaryText,
              section.x + section.width / 2,
              section.y + section.height / 2 + 15
            );
          }
          
          ctx.restore();
        }
      });
    };
    
    // Create or use existing elements
    const createElements = () => {
      // Only create new elements if they don't exist or if shapes selection changed
      if (elementsRef.current.length === 0) {
        const numElements = layout.sections * 2;
        
        for (let i = 0; i < numElements; i++) {
          const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
          
          // Base properties for all elements
          const element = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.max(10 + Math.random() * 50, 15), // Ensure minimum size of 15
            type: shapeType,
            color: themeColors.shapes[Math.floor(Math.random() * themeColors.shapes.length)],
            speed: isAnimated ? (0.2 + Math.random() * 0.5) * animationSpeed : 0,
            angle: Math.random() * Math.PI * 2,
            opacity: 0.1 + Math.random() * 0.3,
            amplitude: 5 + Math.random() * 15,
            frequency: 0.5 + Math.random() * 2,
            points: Math.floor(5 + Math.random() * 8),
            rotation: 0,
            rotationSpeed: Math.random() * 0.01 * animationSpeed,
            // Add special properties for lines and curves
            length: canvas.width * (0.6 + Math.random() * 0.3), // For lines - spanning more of canvas
            controlPointOffset: Math.random() * 100 + 50 // For curves
          };
          
          elementsRef.current.push(element);
        }
      } else {
        // Update colors when theme or palette changes
        elementsRef.current.forEach(element => {
          element.color = themeColors.shapes[Math.floor(Math.random() * themeColors.shapes.length)];
        });
      }
    };
    
    // Draw abstract shapes
    const drawElements = (time = 0) => {
      elementsRef.current.forEach((element) => {
        ctx.save();
        ctx.globalAlpha = element.opacity;
        ctx.fillStyle = element.color;
        ctx.strokeStyle = element.color;
        
        if (isAnimated) {
          element.x += Math.cos(element.angle) * element.speed;
          element.y += Math.sin(element.angle) * element.speed;
          element.rotation += element.rotationSpeed;
          
          // Bounce off walls
          if (element.x < 0 || element.x > canvas.width) {
            element.angle = Math.PI - element.angle;
          }
          if (element.y < 0 || element.y > canvas.height) {
            element.angle = -element.angle;
          }
          
          // Pulsing size with smoother animation
          element.size += Math.sin(time / 1000) * 0.5 * animationSpeed;
        }
        
        ctx.translate(element.x, element.y);
        ctx.rotate(element.rotation);
        
        switch (element.type) {
          case "circle":
            ctx.beginPath();
            // Ensure radius is positive
            const radius = Math.max(1, element.size);
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.fill();
            break;
            
          case "square":
            const size = Math.max(2, element.size);
            ctx.fillRect(
              -size / 2,
              -size / 2,
              size,
              size
            );
            break;
            
          case "line":
            // Draw line spanning most of the canvas
            ctx.beginPath();
            ctx.moveTo(-element.length / 2, 0);
            ctx.lineTo(element.length / 2, 0);
            ctx.lineWidth = Math.max(1, element.size / 10);
            ctx.stroke();
            break;
            
          case "curve":
            // Draw curve with control points that create a nice arc
            ctx.beginPath();
            ctx.moveTo(-element.length / 2, 0);
            ctx.quadraticCurveTo(
              0, 
              -element.controlPointOffset, 
              element.length / 2, 
              0
            );
            ctx.lineWidth = Math.max(1, element.size / 10);
            ctx.stroke();
            break;
            
          case "wave":
            ctx.beginPath();
            for (let i = 0; i < Math.PI * 2; i += 0.1) {
              const x = Math.cos(i) * element.size;
              const y = Math.sin(i) * element.size + 
                        Math.sin(i * 8 + time / (500 / animationSpeed)) * 
                        element.amplitude * (isAnimated ? 1 : 0.5);
              
              if (i === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.closePath();
            ctx.fill();
            break;
            
          case "blob":
            ctx.beginPath();
            for (let i = 0; i < Math.PI * 2; i += (Math.PI * 2) / element.points) {
              // Ensure radius is always positive by using Math.max
              const radius = Math.max(1, element.size * 
                            (0.8 + Math.sin(i * element.frequency + 
                                           (isAnimated ? time / (1000 / animationSpeed) : 0)) * 0.2));
              const x = Math.cos(i) * radius;
              const y = Math.sin(i) * radius;
              
              if (i === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.closePath();
            ctx.fill();
            break;
        }
        
        ctx.restore();
      });
    };
    
    // Draw text
    const drawText = () => {
      // Draw main title text at the top of the canvas
      ctx.font = `bold ${canvas.width / 15}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillStyle = themeColors.text;
      ctx.fillText(primaryText, canvas.width / 2, canvas.height * 0.08);
      
      // Draw subtitle text below the main title
      ctx.font = `${canvas.width / 30}px sans-serif`;
      ctx.fillStyle = themeColors.subtext;
      ctx.fillText(secondaryText, canvas.width / 2, canvas.height * 0.08 + 35);
    };
    
    // Animation function with time-based animation
    const animate = (timestamp: number) => {
      // Initialize timeRef on first frame
      if (!timeRef.current) {
        timeRef.current = timestamp;
      }
      
      // Calculate elapsed time
      const elapsed = timestamp - timeRef.current;
      timeRef.current = timestamp;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawBackground();
      drawElements(timestamp);
      drawSections();
      drawText();
      
      if (isAnimated) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };
    
    // Initialize and start animation
    createElements();
    
    if (isAnimated) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      animate(0);
    }
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [theme, paletteIndex, layout, primaryText, secondaryText, sectionTexts, isAnimated, animationSpeed, shapes]);

  // Reset elements when shapes change
  useEffect(() => {
    elementsRef.current = [];
  }, [shapes]);

  return (
    <canvas
      id="canvas-output"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default CanvasCreator;
