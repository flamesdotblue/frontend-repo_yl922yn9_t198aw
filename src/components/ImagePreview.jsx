export default function ImagePreview({ src, color }) {
  if (!src) return null;
  return (
    <section className="w-full px-6 sm:px-10 mt-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <img src={src} alt="Selected" className="w-full h-72 object-contain bg-gray-50" />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-700">Detected color signature</h3>
            <div className="mt-3 flex items-center gap-3">
              <div
                className="h-12 w-12 rounded-lg border"
                style={{ backgroundColor: color?.hex || "#e5e7eb", borderColor: "#e5e7eb" }}
                title={color?.hex || "N/A"}
              />
              <div>
                <div className="text-sm font-semibold text-gray-900">{color?.hex || "N/A"}</div>
                <div className="text-xs text-gray-500">avg rgb({color?.r ?? "-"}, {color?.g ?? "-"}, {color?.b ?? "-"})</div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              We analyze the image locally in your browser to extract a dominant color, then prioritize results with similar hues.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
