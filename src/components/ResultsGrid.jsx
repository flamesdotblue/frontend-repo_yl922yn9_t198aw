export default function ResultsGrid({ results, loading }) {
  return (
    <section className="w-full px-6 sm:px-10 mt-6 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between">
          <h3 className="text-lg font-semibold text-slate-100">Results</h3>
          <div className="text-sm text-slate-400">{results.length} items</div>
        </div>

        {loading ? (
          <div className="mt-6 text-slate-300">Analyzing image and ranking matches…</div>
        ) : results.length === 0 ? (
          <div className="mt-6 text-slate-300">No results yet. Upload an image and click search.</div>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="group bg-slate-900/60 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden shadow-xl hover:shadow-2xl transition"
              >
                <div className="aspect-video bg-slate-950/50 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-300"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-slate-100 truncate pr-2">{item.title}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30">
                      {Math.round(item.score * 100)}%
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.tags.slice(0, 5).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-200 border border-white/10">
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
