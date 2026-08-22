import { useRef, useState } from 'react'

const ACCEPTED_TYPES = ['application/pdf', 'image/png', 'image/jpeg']

function UploadZone({ onFileSelect }) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  function handleFiles(fileList) {
    const selected = fileList[0]
    if (!selected) return

    if (!ACCEPTED_TYPES.includes(selected.type)) {
      alert('Please upload a PDF, PNG, or JPG file.')
      return
    }

    onFileSelect(selected)
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }


  return (
  <div
    onClick={() => inputRef.current?.click()}
    onDragOver={(e) => {
      e.preventDefault()
      setIsDragging(true)
    }}
    onDragLeave={() => setIsDragging(false)}
    onDrop={handleDrop}
    className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
      isDragging ? 'border-amber-400 bg-amber-50' : 'border-slate-200 hover:border-slate-300 bg-slate-50'
    }`}
  >
    <input
      ref={inputRef}
      type="file"
      accept=".pdf,.png,.jpg,.jpeg"
      className="hidden"
      onChange={(e) => handleFiles(e.target.files)}
    />
    <svg
      className="w-8 h-8 mx-auto mb-3 text-slate-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 16.5V9.75m0 0-3 3m3-3 3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
      />
    </svg>
    <p className="text-slate-700 font-medium">Drop a document here</p>
    <p className="text-sm text-slate-400 mt-1">or click to browse — PDF, PNG, or JPG</p>
  </div>
)}

export default UploadZone