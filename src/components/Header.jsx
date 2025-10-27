import { Camera, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full px-6 sm:px-10 py-8">
      <div className="max-w-6xl mx-auto flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg">
          <Camera className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
            VisionSearch — Smart Image Finder
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Upload an image and we’ll find visually similar photos and related content. Precise controls, fast results, friendly UI.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-gray-500">
          <Search className="h-5 w-5" />
          <span className="text-sm">Visual match</span>
        </div>
      </div>
    </header>
  );
}
