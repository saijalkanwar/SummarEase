function ResultView({ summary, keyPoints }) {
  return (
  <div>
    <h2 className="text-xs font-semibold uppercase tracking-wide text-amber-600 mb-2">
      Summary
    </h2>
    <p className="text-slate-700 leading-relaxed">{summary}</p>

    {keyPoints && keyPoints.length > 0 && (
      <div className="mt-6 pt-6 border-t border-slate-100">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-amber-600 mb-2">
          Key Points
        </h2>
        <ul className="list-disc list-inside space-y-2.5 text-slate-700">
          {keyPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
)
}

export default ResultView