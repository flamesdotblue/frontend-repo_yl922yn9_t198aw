import { useCallback, useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchControls from "./components/SearchControls";
import ImagePreview from "./components/ImagePreview";
import ResultsGrid from "./components/ResultsGrid";

function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
    : { r: 0, g: 0, b: 0 };
}

function rgbToHex({ r, g, b }) {
  const to = (v) => v.toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

function colorDistance(a, b) {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

const CATALOG = [
  { id: "sneakers-red", title: "Red Sneakers on Street", image: "https://images.unsplash.com/photo-1635964510025-5b389f907ef7?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxSZWQlMjBTbmVha2VycyUyMG9uJTIwU3RyZWV0fGVufDB8MHx8fDE3NjE1ODE0Njh8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80", link: "https://unsplash.com/photos/ixS7UCRJTdM", color: "#c43b3b", tags: ["shoes", "sneakers", "red", "street", "urban", "fashion"] },
  { id: "city-night", title: "Neon City at Night", image: "https://images.unsplash.com/photo-1635964510025-5b389f907ef7?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxSZWQlMjBTbmVha2VycyUyMG9uJTIwU3RyZWV0fGVufDB8MHx8fDE3NjE1ODE0Njh8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80", link: "https://unsplash.com/photos/5NLCaz2wJXE", color: "#2b3877", tags: ["city", "night", "neon", "street", "lights", "urban"] },
  { id: "sunset-beach", title: "Sunset Over the Ocean", image: "https://images.unsplash.com/photo-1635964510025-5b389f907ef7?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxSZWQlMjBTbmVha2VycyUyMG9uJTIwU3RyZWV0fGVufDB8MHx8fDE3NjE1ODE0Njh8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80", link: "https://unsplash.com/photos/JsF6uc9C6i4", color: "#f28c50", tags: ["sunset", "beach", "ocean", "orange", "sky", "travel"] },
  { id: "forest-path", title: "Forest Pathway", image: "https://images.unsplash.com/photo-1635964510025-5b389f907ef7?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxSZWQlMjBTbmVha2VycyUyMG9uJTIwU3RyZWV0fGVufDB8MHx8fDE3NjE1ODE0Njh8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80", link: "https://unsplash.com/photos/6dW3xyQvcYE", color: "#2f5a3a", tags: ["forest", "green", "trees", "nature", "path", "outdoor"] },
  { id: "coffee-desk", title: "Coffee on Work Desk", image: "https://images.unsplash.com/photo-1635964510025-5b389f907ef7?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxSZWQlMjBTbmVha2VycyUyMG9uJTIwU3RyZWV0fGVufDB8MHx8fDE3NjE1ODE0Njh8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80", link: "https://unsplash.com/photos/hjCA3f1J2xk", color: "#8a6b4a", tags: ["coffee", "desk", "brown", "workspace", "mug", "cozy"] },
  { id: "mountain-lake", title: "Crystal Lake and Mountains", image: "https://images.unsplash.com/photo-1635964510025-5b389f907ef7?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxSZWQlMjBTbmVha2VycyUyMG9uJTIwU3RyZWV0fGVufDB8MHx8fDE3NjE1ODE0Njh8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80", link: "https://unsplash.com/photos/A-NVHPka9Rk", color: "#4aa2b8", tags: ["mountain", "lake", "blue", "nature", "hike", "water"] },
  { id: "cat-closeup", title: "Cat Close-up", image: "https://images.unsplash.com/photo-1646016700920-d530a256b372?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxOZW9uJTIwQ2l0eSUyMGF0JTIwTmlnaHR8ZW58MHwwfHx8MTc2MTU4MTQ3MHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80", link: "https://unsplash.com/photos/ftQ6J-0S6yw", color: "#9c8c73", tags: ["cat", "pet", "animal", "fur", "whiskers", "cute"] },
  { id: "bike-orange", title: "Orange Bike Against Wall", image: "https://images.unsplash.com/photo-1597740843708-620addff7948?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTdW5zZXQlMjBPdmVyJTIwdGhlJTIwT2NlYW58ZW58MHwwfHx8MTc2MTU4MTQ3MHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80", link: "https://unsplash.com/photos/FTfjMijq-Ws", color: "#e37b32", tags: ["bike", "bicycle", "orange", "urban", "street", "wheels"] },
  { id: "coding-setup", title: "Minimal Coding Setup", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop", link: "https://unsplash.com/photos/DuHKoV44prg", color: "#1c1d21", tags: ["coding", "monitor", "desk", "dark", "workspace", "tech"] },
  { id: "flower-pink", title: "Pink Flower Macro", image: "https://images.unsplash.com/photo-1677170044648-ccef4d2b3b3c?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDb2ZmZWUlMjBvbiUyMFdvcmslMjBEZXNrfGVufDB8MHx8fDE3NjE1ODE0NzF8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80", link: "https://unsplash.com/photos/TLD6iCOlyb0", color: "#d46aa0", tags: ["flower", "pink", "macro", "nature", "petals", "garden"] },
  { id: "street-food", title: "Street Food Stall", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1200&auto=format&fit=crop", link: "https://unsplash.com/photos/5oRHyqZQyn8", color: "#bd4f3b", tags: ["food", "street", "market", "vendor", "spicy", "asia"] },
  { id: "snow-cabin", title: "Cabin in Snow", image: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1200&auto=format&fit=crop", link: "https://unsplash.com/photos/Im7lZjxeLhg", color: "#9db2c9", tags: ["snow", "cabin", "winter", "blue", "cold", "holiday"] }
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [detectedColor, setDetectedColor] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  const catalog = useMemo(() => CATALOG.map((c) => ({ ...c, rgb: hexToRgb(c.color) })), []);

  const analyzeImage = useCallback(async (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          const w = 240;
          const h = Math.max(1, Math.round((img.height / img.width) * w));
          canvas.width = w; canvas.height = h;
          ctx.drawImage(img, 0, 0, w, h);
          const data = ctx.getImageData(0, 0, w, h).data;
          let r = 0, g = 0, b = 0, n = 0;
          for (let i = 0; i < data.length; i += 4) { r += data[i]; g += data[i+1]; b += data[i+2]; n++; }
          r = Math.round(r / n); g = Math.round(g / n); b = Math.round(b / n);
          resolve({ r, g, b, hex: rgbToHex({ r, g, b }) });
        } catch (e) { resolve(null); }
      };
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }, []);

  const handleImageSelected = async (payload) => {
    if (!payload) {
      setSelected(null); setDetectedColor(null); setResults([]);
      return;
    }
    const src = payload.src; setSelected({ src });
    const color = await analyzeImage(src); setDetectedColor(color);
  };

  const runSearch = async ({ keywords, limit, accuracy, strict }) => {
    setLoading(true);
    const tokens = (keywords || "").toLowerCase().split(/[\,\n\s]+/).filter(Boolean);
    const color = detectedColor;
    const ranked = catalog
      .map((item) => {
        const colorScore = color ? 1 - colorDistance(color, item.rgb) / Math.sqrt(255 * 255 * 3) : 0.2;
        const textScore = tokens.length ? tokens.reduce((acc, t) => (item.tags.some((x) => x.includes(t)) ? acc + 1 : acc), 0) / Math.max(1, tokens.length) : 0.2;
        const score = accuracy * colorScore + (1 - accuracy) * textScore;
        return { ...item, score };
      })
      .filter((x) => (strict ? x.score >= 0.35 : true))
      .sort((a, b) => b.score - a.score)
      .slice(0, Math.max(1, Math.min(50, limit || 12)));
    await new Promise((r) => setTimeout(r, 300));
    setResults(ranked);
    setLoading(false);
    if (searchRef.current) searchRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <Hero onGetStarted={() => searchRef.current?.scrollIntoView({ behavior: "smooth" })} />

      <div ref={searchRef}>
        <SearchControls onSubmit={runSearch} onImageSelected={handleImageSelected} />
        <ImagePreview src={selected?.src} color={detectedColor} />
        <ResultsGrid results={results} loading={loading} />
      </div>

      <footer className="text-center text-xs text-slate-400 py-10">
        Built for rapid, precise visual search — playful, fast, and privacy-friendly.
      </footer>

      {/* page background accents */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-[80vw] rounded-full bg-gradient-to-r from-indigo-600/20 via-fuchsia-500/15 to-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-gradient-to-tr from-fuchsia-500/20 to-indigo-500/20 blur-2xl" />
      </div>
    </div>
  );
}
