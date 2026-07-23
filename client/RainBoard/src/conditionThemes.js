const themes = {
  clear: {
    layer1: "rgba(232, 168, 56, 0.35)",
    layer2: "rgba(180, 100, 30, 0.25)",
    layer3: "rgba(200, 80, 20, 0.15)",
    base: "#0d0a04",
  },
  sunny: {
    layer1: "rgba(232, 168, 56, 0.35)",
    layer2: "rgba(180, 100, 30, 0.25)",
    layer3: "rgba(200, 80, 20, 0.15)",
    base: "#0d0a04",
  },
  "partly cloudy": {
    layer1: "rgba(160, 140, 100, 0.3)",
    layer2: "rgba(100, 90, 80, 0.25)",
    layer3: "rgba(80, 70, 100, 0.15)",
    base: "#0a0b0e",
  },
  cloudy: {
    layer1: "rgba(100, 110, 130, 0.35)",
    layer2: "rgba(70, 80, 100, 0.3)",
    layer3: "rgba(60, 60, 80, 0.2)",
    base: "#0a0c12",
  },
  overcast: {
    layer1: "rgba(70, 75, 90, 0.4)",
    layer2: "rgba(50, 55, 70, 0.35)",
    layer3: "rgba(40, 40, 60, 0.25)",
    base: "#080a10",
  },
  mist: {
    layer1: "rgba(120, 125, 140, 0.25)",
    layer2: "rgba(90, 95, 110, 0.2)",
    layer3: "rgba(70, 75, 90, 0.15)",
    base: "#0c0d12",
  },
  fog: {
    layer1: "rgba(120, 125, 140, 0.25)",
    layer2: "rgba(90, 95, 110, 0.2)",
    layer3: "rgba(70, 75, 90, 0.15)",
    base: "#0c0d12",
  },
  "light rain": {
    layer1: "rgba(60, 100, 180, 0.35)",
    layer2: "rgba(40, 70, 140, 0.3)",
    layer3: "rgba(30, 50, 120, 0.2)",
    base: "#060a14",
  },
  rain: {
    layer1: "rgba(40, 80, 160, 0.4)",
    layer2: "rgba(30, 60, 130, 0.35)",
    layer3: "rgba(20, 40, 100, 0.25)",
    base: "#050810",
  },
  "heavy rain": {
    layer1: "rgba(25, 50, 120, 0.45)",
    layer2: "rgba(15, 35, 90, 0.4)",
    layer3: "rgba(10, 25, 70, 0.3)",
    base: "#04060c",
  },
  drizzle: {
    layer1: "rgba(70, 110, 170, 0.3)",
    layer2: "rgba(50, 80, 140, 0.25)",
    layer3: "rgba(40, 60, 120, 0.15)",
    base: "#070b14",
  },
  thunderstorm: {
    layer1: "rgba(80, 40, 140, 0.45)",
    layer2: "rgba(50, 25, 110, 0.4)",
    layer3: "rgba(30, 15, 80, 0.3)",
    base: "#06040e",
  },
  "light snow": {
    layer1: "rgba(140, 160, 200, 0.25)",
    layer2: "rgba(100, 120, 170, 0.2)",
    layer3: "rgba(80, 100, 150, 0.15)",
    base: "#0a0c14",
  },
  snow: {
    layer1: "rgba(120, 140, 190, 0.3)",
    layer2: "rgba(90, 110, 160, 0.25)",
    layer3: "rgba(70, 90, 140, 0.2)",
    base: "#080b14",
  },
  "heavy snow": {
    layer1: "rgba(150, 170, 210, 0.35)",
    layer2: "rgba(110, 130, 180, 0.3)",
    layer3: "rgba(80, 100, 160, 0.25)",
    base: "#0a0d16",
  },
  night: {
    layer1: "rgba(30, 20, 80, 0.45)",
    layer2: "rgba(20, 15, 60, 0.4)",
    layer3: "rgba(15, 10, 50, 0.3)",
    base: "#06050c",
  },
};

const fallback = themes.cloudy;

const conditionToTheme = (conditionText, isNight) => {
  if (isNight) return themes.night;

  const key = (conditionText || "").toLowerCase().trim();
  return themes[key] || fallback;
};

export { themes, conditionToTheme };
