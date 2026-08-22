const LENGTH_OPTIONS = [
  { value: 'short', label: 'Short' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long' },
]

function SummaryOptions({ value, onChange }) {
  return (
    <div className="flex gap-2">
      {LENGTH_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() =>onChange(option.value)}
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
            value === option.value
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default SummaryOptions