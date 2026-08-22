// Base URL for the backend. In production, set VITE_API_URL as an
// environment variable pointing to the deployed backend.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function extractText(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_BASE_URL}/extract`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null)
    throw new Error(errorBody?.detail || 'Failed to extract text from the document.')
  }

  const data = await response.json()
  return data.text
}

export async function summarizeText(text, length) {
  const response = await fetch(`${API_BASE_URL}/summarize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, length }),
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null)
    throw new Error(errorBody?.detail || 'Failed to generate a summary.')
  }

  return response.json() // { summary, key_points }
}