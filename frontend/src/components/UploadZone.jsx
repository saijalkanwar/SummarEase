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
      className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <p className="text-gray-600">Drop a document here, or click to browse</p>
    </div>
  )
}

export default UploadZone