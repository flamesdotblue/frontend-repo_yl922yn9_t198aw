import { Camera } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Camera className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight text-white">VisionSearch</div>
            <div className="text-xs text-slate-300/80">Smart, colorful image discovery</div>
          </div>
        </div>
        <div className="hidden sm:block text-xs text-slate-300/70">
          Built for speed • Privacy-friendly • In-browser analysis
        </div>
      </div>
    </header>
  );
}
