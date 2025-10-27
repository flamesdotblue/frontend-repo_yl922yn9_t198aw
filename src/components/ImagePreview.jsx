export default function ImagePreview({ src, color }) {
  if (!src) return null;
  return (
    <section className="w-full px-6 sm:px-10 mt-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-slate-900/60 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden shadow-xl">
            <img src={src} alt="Selected" className="w-full h-72 object-contain bg-slate-950/60" />
          </div>
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl border border-white/10 p-4 shadow-xl">
            <h3 className="text-sm font-medium text-slate-100">Detected color signature</h3>
            <div className="mt-3 flex items-center gap-3">
              <div
                className="h-12 w-12 rounded-lg border border-white/10"
                style={{ backgroundColor: color?.hex || "#0f172a" }}
                title={color?.hex || "N/A"}
              />
              <div>
                <div className="text-sm font-semibold text-slate-100">{color?.hex || "N/A"}</div>
                <div className="text-xs text-slate-400">avg rgb({color?.r ?? "-"}, {color?.g ?? "-"}, {color?.b ?? "-"})</div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">
              Processed locally in your browser. We extract a dominant hue and blend it with your keywords for smarter matches.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
