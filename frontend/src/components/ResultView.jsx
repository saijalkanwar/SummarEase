function ResultView({ summary, keyPoints }) {
  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
        Summary
      </h2>
      <p className="text-gray-800 leading-relaxed">{summary}</p>

      {keyPoints && keyPoints.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
            Key Points
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
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