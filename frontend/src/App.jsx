import { useState } from 'react'
import UploadZone from './components/UploadZone'
import SummaryOptions from './components/SummaryOptions'
import ResultView from './components/ResultView'
import { extractText, summarizeText } from './services/api'


function App() {
  const [file, setFile] = useState(null)
  const [length, setLength] = useState('medium')
  const [phase, setPhase] = useState('idle') // 'idle' | 'loading' | 'done' | 'error'
  const [error, setError] = useState(null)
  const [summary, setSummary] = useState('')
  const [keyPoints, setKeyPoints] = useState([])

  async function handleGenerate() {
    if (!file) return

    setPhase('loading')
    setError(null)
     try {
      const extractedText = await extractText(file)
      const result = await summarizeText(extractedText, length)

      setSummary(result.summary)
      setKeyPoints(result.key_points || [])
      setPhase('done')
    } catch (err) {
      setError(err.message)
      setPhase('error')
    }
  }

    
  const isLoading = phase === 'loading'

  return (
  <div className="max-w-5xl mx-auto mt-16 px-6">
    <header className="mb-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-2">
        SummarEase - Document Summary Assistant
      </p>
      <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
        Turn any document into a summary
      </h1>
      <p className="mt-2 text-slate-500">
        Upload a PDF or scanned image — we'll extract the text and summarize it.
      </p>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
      {/* Left column: controls */}
      <div>
        <UploadZone onFileSelect={setFile} />
        {file && (
          <p className="mt-4 text-sm text-slate-500">
            Selected: <span className="font-medium text-slate-700">{file.name}</span>
          </p>
        )}

        <div className="mt-8">
          <SummaryOptions value={length} onChange={setLength} />
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={!file || isLoading}
          className="mt-8 w-full py-3.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating…' : 'Generate Summary'}
        </button>

        {phase === 'error' && (
          <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            {error}
          </p>
        )}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
            How it works
          </h3>
          <ul className="text-sm text-slate-500 space-y-1.5">
            <li>Upload a PDF or a scanned image</li>
            <li>We extract the text automatically</li>
            <li>Gemini generates a summary and key points</li>
          </ul>
        </div>
      </div>

      {/* Right column: result */}
      <div>
        {phase === 'done' ? (
          <ResultView summary={summary} keyPoints={keyPoints} />
        ) : (
          <div className="h-full min-h-[280px] border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-center px-6">
            <p className="text-slate-400 text-sm">
              {isLoading
                ? 'Reading your document and writing a summary…'
                : 'Your summary will appear here once you generate it.'}
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
)}
export default App