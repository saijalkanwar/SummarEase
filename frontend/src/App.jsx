import { useState } from 'react'
import UploadZone from './components/UploadZone'
import SummaryOptions from './components/SummaryOptions'

function App() {
  const [file, setFile] = useState(null)
  const [length, setLength] = useState('medium')
  const [phase, setPhase] = useState('idle') // 'idle' | 'loading' | 'done' | 'error'
  const [error, setError] = useState(null)

  function handleGenerate() {
    if (!file) return

    setPhase('loading')
    setError(null)

    // TEMPORARY: fake async work. We'll replace this with a real API call
    // to FastAPI in Phase 9.
    setTimeout(() => {
      const fakeSucceeds = false // flip this to false to test the error path

      if (fakeSucceeds) {
        setPhase('done')
      } else {
        setError('Something went wrong while summarizing. Please try again.')
        setPhase('error')
      }
    }, 1500)
  }

  const isLoading = phase === 'loading'

  return (
    <div className="max-w-xl mx-auto mt-16 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Document Summary Assistant</h1>

      <UploadZone onFileSelect={setFile} />
      {file && <p className="mt-4 text-sm text-gray-500">Selected: {file.name}</p>}

      <div className="mt-6">
        <SummaryOptions value={length} onChange={setLength} />
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={!file || isLoading}
        className="mt-6 w-full py-3 rounded-md bg-blue-600 text-white font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generating…' : 'Generate Summary'}
      </button>

      {phase === 'error' && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}

      {phase === 'done' && (
        <p className="mt-4 text-sm text-green-600">
          ✓ Summary generated (this is a placeholder — real results come in Phase 9)
        </p>
      )}
    </div>
  )
}

export default App