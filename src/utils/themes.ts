
// Theme utilities to generate color schemes

export const getDarkTheme = () => {
  return {
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
  };
};

export const getLightTheme = () => {
  return {
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
  };
};

export const getMulticolorTheme = () => {
  return {
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
  };
};
