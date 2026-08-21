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
          className={`px-4 py-2 rounded-md border text-sm font-medium ${
            value === option.value
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default SummaryOptions