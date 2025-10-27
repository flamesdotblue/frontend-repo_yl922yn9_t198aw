import { useRef, useState } from "react";
import { Upload, Link as LinkIcon, SlidersHorizontal, X, Search } from "lucide-react";

export default function SearchControls({
  onSubmit,
  onImageSelected,
  defaultLimit = 12,
  defaultAccuracy = 0.7,
}) {
  const fileRef = useRef(null);
  const [keywords, setKeywords] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [limit, setLimit] = useState(defaultLimit);
  const [accuracy, setAccuracy] = useState(defaultAccuracy);
  const [strict, setStrict] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      onImageSelected({ file, src: URL.createObjectURL(file) });
    }
  };

  const handlePasteUrl = async () => {
    if (!imageUrl) return;
    onImageSelected({ url: imageUrl, src: imageUrl });
  };

  const handleClear = () => {
    setKeywords("");
    setImageUrl("");
    setLimit(defaultLimit);
    setAccuracy(defaultAccuracy);
    setStrict(false);
    if (fileRef.current) fileRef.current.value = "";
    onImageSelected(null);
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ keywords, imageUrl, limit: Number(limit), accuracy: Number(accuracy), strict });
  };

  return (
    <section className="w-full px-6 sm:px-10">
      <form
        onSubmit={submit}
        className="max-w-6xl mx-auto bg-white/70 backdrop-blur rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-1">
            <label className="text-sm font-medium text-gray-700">Upload image</label>
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-500 transition"
              >
                <Upload className="h-4 w-4" /> Choose file
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                <X className="h-4 w-4" /> Clear
              </button>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">Or paste image link</label>
              <div className="mt-2 flex items-center gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={handlePasteUrl}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                >
                  Use
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">For best accuracy, upload a file. Some links block color analysis.</p>
            </div>
          </div>

          <div className="col-span-1">
            <label className="text-sm font-medium text-gray-700">Keywords (optional)</label>
            <div className="mt-2 relative">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. red sneakers, street, sunset"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" /> Accuracy
                </label>
                <input
                  type="range"
                  min="0.3"
                  max="1"
                  step="0.05"
                  value={accuracy}
                  onChange={(e) => setAccuracy(e.target.value)}
                  className="w-full mt-2"
                />
                <div className="text-xs text-gray-500">{Math.round(accuracy * 100)}% emphasis on visual match</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Limit results</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                  <input
                    type="checkbox"
                    checked={strict}
                    onChange={(e) => setStrict(e.target.checked)}
                  />
                  Strict mode (hide weak matches)
                </label>
              </div>
            </div>
          </div>

          <div className="col-span-1 flex items-end">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-500 transition"
            >
              <Search className="h-5 w-5" /> Find similar images
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
