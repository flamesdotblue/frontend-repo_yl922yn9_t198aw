import Spline from "@splinetool/react-spline";
import { Rocket } from "lucide-react";

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative h-[56vh] min-h-[420px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Gradient vignettes and grain */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_10%,rgba(100,116,255,0.35),rgba(168,85,247,0.25)_40%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.2),rgba(2,6,23,0.8))]" />
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-20" style={{ backgroundImage: "url('data:image/svg+xml;utf8,</?xml version=\"1.0\" ?><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" viewBox=\"0 0 200 200\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.25\"/></svg>')" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 h-full flex items-end pb-10">
        <div className="w-full bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                VisionSearch
              </h1>
              <p className="mt-2 text-slate-200/80 max-w-2xl">
                A fast, precise and playful visual search. Drop an image, fine-tune accuracy, and explore vibrant, similar results.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-4 py-2.5 font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02] active:scale-[0.99]"
              >
                <Rocket className="h-5 w-5" />
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
