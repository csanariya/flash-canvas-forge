
import React, { useRef, useEffect } from "react";
import { getDarkTheme, getLightTheme, getMulticolorTheme } from "@/utils/themes";

interface CanvasCreatorProps {
  theme: string;
  layout: {
    type: string;
    sections: number;
  };
  primaryText: string;
  secondaryText: string;
  isAnimated: boolean;
  shapes: string[];
}

const CanvasCreator = ({
  theme,
  layout,
  primaryText,
  secondaryText,
  isAnimated,
  shapes,
}: CanvasCreatorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();

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
          return getDarkTheme();
        case "light":
          return getLightTheme();
        case "multicolor":
          return getMulticolorTheme();
        default:
          return getDarkTheme();
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
    
    // Draw sections based on layout
    const drawSections = () => {
      const { type, sections } = layout;
      
      if (type === "grid") {
        const gridSize = Math.ceil(Math.sqrt(sections));
        const cellWidth = canvas.width / gridSize;
        const cellHeight = canvas.height / gridSize;
        
        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            if (i * gridSize + j < sections) {
              const x = j * cellWidth;
              const y = i * cellHeight;
              
              ctx.strokeStyle = themeColors.accent;
              ctx.lineWidth = 1;
              ctx.strokeRect(x, y, cellWidth, cellHeight);
            }
          }
        }
      } else if (type === "horizontal") {
        const sectionHeight = canvas.height / sections;
        
        for (let i = 0; i < sections; i++) {
          const y = i * sectionHeight;
          
          ctx.strokeStyle = themeColors.accent;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }
    };
    
    // Create abstract shapes
    const elements: any[] = [];
    
    const createElements = () => {
      elements.length = 0;
      const numElements = layout.sections * 2;
      
      for (let i = 0; i < numElements; i++) {
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        
        const element = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 10 + Math.random() * 50,
          type: shapeType,
          color: themeColors.shapes[Math.floor(Math.random() * themeColors.shapes.length)],
          speed: isAnimated ? 0.2 + Math.random() * 0.5 : 0,
          angle: Math.random() * Math.PI * 2,
          opacity: 0.1 + Math.random() * 0.3,
        };
        
        elements.push(element);
      }
    };
    
    // Draw abstract shapes
    const drawElements = (time = 0) => {
      elements.forEach((element) => {
        ctx.save();
        ctx.globalAlpha = element.opacity;
        ctx.fillStyle = element.color;
        
        if (isAnimated) {
          element.x += Math.cos(element.angle) * element.speed;
          element.y += Math.sin(element.angle) * element.speed;
          
          // Bounce off walls
          if (element.x < 0 || element.x > canvas.width) {
            element.angle = Math.PI - element.angle;
          }
          if (element.y < 0 || element.y > canvas.height) {
            element.angle = -element.angle;
          }
          
          // Pulsing size
          element.size += Math.sin(time / 1000) * 0.5;
        }
        
        switch (element.type) {
          case "circle":
            ctx.beginPath();
            ctx.arc(element.x, element.y, element.size, 0, Math.PI * 2);
            ctx.fill();
            break;
          case "square":
            ctx.fillRect(
              element.x - element.size / 2,
              element.y - element.size / 2,
              element.size,
              element.size
            );
            break;
          case "wave":
            ctx.beginPath();
            for (let i = 0; i < Math.PI * 2; i += 0.1) {
              const x = element.x + Math.cos(i) * element.size;
              const y = element.y + Math.sin(i) * element.size + Math.sin(i * 8 + time / 500) * 5;
              
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
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw primary text
      ctx.font = `bold ${canvas.width / 10}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillStyle = themeColors.text;
      ctx.fillText(primaryText, centerX, centerY);
      
      // Draw secondary text
      ctx.font = `${canvas.width / 30}px sans-serif`;
      ctx.fillStyle = themeColors.subtext;
      ctx.fillText(secondaryText, centerX, centerY + canvas.height / 10);
    };
    
    // Animation function
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawBackground();
      drawElements(time);
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
  }, [theme, layout, primaryText, secondaryText, isAnimated, shapes]);

  return (
    <canvas
      id="canvas-output"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default CanvasCreator;
