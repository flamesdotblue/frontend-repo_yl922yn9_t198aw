export default function ResultsGrid({ results, loading }) {
  return (
    <section className="w-full px-6 sm:px-10 mt-6 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Results</h3>
          <div className="text-sm text-gray-500">{results.length} items</div>
        </div>

        {loading ? (
          <div className="mt-6 text-gray-600">Analyzing image and ranking matches…</div>
        ) : results.length === 0 ? (
          <div className="mt-6 text-gray-600">No results yet. Upload an image and click search.</div>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="aspect-video bg-gray-50 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 truncate pr-2">{item.title}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                      {Math.round(item.score * 100)}%
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.tags.slice(0, 5).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
