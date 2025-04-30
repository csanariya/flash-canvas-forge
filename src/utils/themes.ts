
// Theme utilities to generate color schemes

export const getDarkTheme = (paletteIndex = 0) => {
  const palettes = [
    {
      gradientStart: "#0f172a",
      gradientEnd: "#1e293b",
      accent: "rgba(99, 102, 241, 0.5)",
      text: "#ffffff",
      subtext: "rgba(255, 255, 255, 0.7)",
      shapes: [
        "#6366f1",
        "#8b5cf6",
        "#ec4899",
        "#10b981",
        "#3b82f6"
      ]
    },
    {
      gradientStart: "#18181b",
      gradientEnd: "#27272a",
      accent: "rgba(168, 85, 247, 0.5)",
      text: "#ffffff",
      subtext: "rgba(255, 255, 255, 0.8)",
      shapes: [
        "#a855f7",
        "#f43f5e",
        "#0ea5e9",
        "#14b8a6",
        "#f59e0b"
      ]
    },
    {
      gradientStart: "#312e81",
      gradientEnd: "#3730a3",
      accent: "rgba(79, 70, 229, 0.6)",
      text: "#ffffff",
      subtext: "rgba(255, 255, 255, 0.9)",
      shapes: [
        "#4f46e5",
        "#f97316",
        "#06b6d4",
        "#4ade80",
        "#eab308"
      ]
    },
    {
      gradientStart: "#1a1a2e",
      gradientEnd: "#16213e",
      accent: "rgba(113, 128, 150, 0.5)",
      text: "#ffffff",
      subtext: "rgba(255, 255, 255, 0.8)",
      shapes: [
        "#0f3460",
        "#e94560",
        "#5352ed",
        "#ff9f43",
        "#00d2d3"
      ]
    },
    {
      gradientStart: "#222831",
      gradientEnd: "#393e46",
      accent: "rgba(0, 173, 181, 0.5)",
      text: "#ffffff",
      subtext: "rgba(255, 255, 255, 0.8)",
      shapes: [
        "#00adb5",
        "#ff5722",
        "#ffd369",
        "#a3f7bf",
        "#ff5959"
      ]
    }
  ];
  
  return palettes[paletteIndex % palettes.length];
};

export const getLightTheme = (paletteIndex = 0) => {
  const palettes = [
    {
      gradientStart: "#f8fafc",
      gradientEnd: "#e2e8f0",
      accent: "rgba(99, 102, 241, 0.3)",
      text: "#1e293b",
      subtext: "rgba(15, 23, 42, 0.7)",
      shapes: [
        "#c7d2fe",
        "#ddd6fe",
        "#fae8ff",
        "#d1fae5",
        "#bfdbfe"
      ]
    },
    {
      gradientStart: "#f5f5f5",
      gradientEnd: "#e5e7eb",
      accent: "rgba(168, 85, 247, 0.3)",
      text: "#1e293b",
      subtext: "rgba(15, 23, 42, 0.8)",
      shapes: [
        "#e9d5ff",
        "#fee2e2",
        "#bae6fd",
        "#bbf7d0",
        "#fef3c7"
      ]
    },
    {
      gradientStart: "#f0f9ff",
      gradientEnd: "#e0f2fe",
      accent: "rgba(59, 130, 246, 0.3)",
      text: "#1e293b",
      subtext: "rgba(15, 23, 42, 0.7)",
      shapes: [
        "#bfdbfe",
        "#e0e7ff",
        "#fae8ff",
        "#d1fae5",
        "#fef9c3"
      ]
    },
    {
      gradientStart: "#fefefe",
      gradientEnd: "#f9fafb",
      accent: "rgba(79, 70, 229, 0.2)",
      text: "#111827",
      subtext: "rgba(17, 24, 39, 0.7)",
      shapes: [
        "#fbcfe8",
        "#a5f3fc",
        "#d8b4fe",
        "#86efac",
        "#fde68a"
      ]
    },
    {
      gradientStart: "#f8f9fa",
      gradientEnd: "#e9ecef",
      accent: "rgba(99, 179, 237, 0.3)",
      text: "#212529",
      subtext: "rgba(33, 37, 41, 0.7)",
      shapes: [
        "#ced4da",
        "#adb5bd",
        "#dee2e6",
        "#e9ecef",
        "#f8f9fa"
      ]
    }
  ];
  
  return palettes[paletteIndex % palettes.length];
};

export const getMulticolorTheme = (paletteIndex = 0) => {
  const palettes = [
    {
      gradientStart: "#4338ca",
      gradientEnd: "#ec4899",
      accent: "rgba(255, 255, 255, 0.5)",
      text: "#ffffff",
      subtext: "rgba(255, 255, 255, 0.8)",
      shapes: [
        "#f97316",
        "#06b6d4",
        "#14b8a6",
        "#f59e0b",
        "#8b5cf6"
      ]
    },
    {
      gradientStart: "#7c3aed",
      gradientEnd: "#db2777",
      accent: "rgba(255, 255, 255, 0.6)",
      text: "#ffffff",
      subtext: "rgba(255, 255, 255, 0.9)",
      shapes: [
        "#eab308",
        "#0ea5e9",
        "#10b981",
        "#f97316",
        "#c026d3"
      ]
    },
    {
      gradientStart: "#0891b2",
      gradientEnd: "#4f46e5",
      accent: "rgba(255, 255, 255, 0.5)",
      text: "#ffffff",
      subtext: "rgba(255, 255, 255, 0.8)",
      shapes: [
        "#84cc16",
        "#f43f5e",
        "#facc15",
        "#6366f1",
        "#22d3ee"
      ]
    },
    {
      gradientStart: "#6d28d9",
      gradientEnd: "#be185d",
      accent: "rgba(255, 255, 255, 0.5)",
      text: "#ffffff",
      subtext: "rgba(255, 255, 255, 0.8)",
      shapes: [
        "#fbbf24",
        "#34d399",
        "#60a5fa",
        "#a78bfa",
        "#fb7185"
      ]
    },
    {
      gradientStart: "#059669",
      gradientEnd: "#8b5cf6",
      accent: "rgba(255, 255, 255, 0.5)",
      text: "#ffffff",
      subtext: "rgba(255, 255, 255, 0.8)",
      shapes: [
        "#fcd34d",
        "#f472b6",
        "#38bdf8",
        "#4ade80",
        "#fb923c"
      ]
    }
  ];
  
  return palettes[paletteIndex % palettes.length];
};
