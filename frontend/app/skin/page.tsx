'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import Loader from '@/components/Loader'
import ResultCard, { ResultItem, ResultText } from '@/components/ResultCard'

interface SkinAnalysisResult {
  condition: string
  confidence: number
  severity: string
  analysis: string
  recommendation: string
}

function SkinAnalysisContent() {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SkinAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setResult(null)
      setError(null)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError('Please select an image first')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('image', selectedImage)

      const response = await fetch('http://localhost:8000/api/skin/analyze', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Analysis failed')
      }

      if (data.success && data.data) {
        setResult(data.data)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis')
    } finally {
      setLoading(false)
    }
  }

  const handleNewAnalysis = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
    setResult(null)
    setError(null)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low':
        return 'text-emerald-400'
      case 'moderate':
        return 'text-yellow-400'
      case 'high':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getConditionIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'acne':
        return '🔴'
      case 'eczema':
        return '🟠'
      case 'psoriasis':
        return '🟣'
      case 'fungal infection':
        return '🟢'
      case 'normal':
        return '✅'
      default:
        return '🔬'
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <button
            onClick={() => router.push('/')}
            className="mb-6 flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="text-5xl">🔬</div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Skin Analysis</h1>
              <p className="text-gray-400">AI-powered skin condition detection and analysis</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Upload Section */}
          <div className="space-y-6 animate-slideIn">
            <div className="glass rounded-2xl p-8 border border-white/10">
              <h2 className="mb-6 text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-3xl">📤</span>
                Upload Image
              </h2>
              
              <div className="space-y-6">
                <div className="relative group">
                  <label className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer bg-white/5 hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-300">
                    {previewUrl ? (
                      <div className="relative w-full h-full p-4">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="h-full w-full object-contain rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                          <p className="text-white font-semibold">Click to change image</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <div className="mb-4 p-6 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                          <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <p className="mb-2 text-lg font-semibold text-white">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray-400">PNG, JPG, JPEG (MAX. 10MB)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={!selectedImage || loading}
                  className={`w-full rounded-xl py-4 px-6 font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                    !selectedImage || loading
                      ? 'bg-gray-600 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 glow-hover shadow-lg'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Analyze Skin
                    </>
                  )}
                </button>

                {result && (
                  <button
                    onClick={handleNewAnalysis}
                    className="w-full rounded-xl py-4 px-6 font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 glow-hover shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    New Analysis
                  </button>
                )}
              </div>
            </div>

            {error && (
              <div className="glass rounded-2xl border border-red-500/30 bg-red-500/10 p-5 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-300 font-medium">Error: {error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div>
            {loading && <Loader />}

            {result && !loading && (
              <div className="space-y-6 animate-fadeIn">
                <ResultCard title="Analysis Results" icon={getConditionIcon(result.condition)}>
                  <ResultItem
                    label="Condition Detected"
                    value={result.condition}
                    highlight={true}
                  />
                  <ResultItem
                    label="Confidence"
                    value={`${result.confidence.toFixed(1)}%`}
                  />
                  <ResultItem
                    label="Severity"
                    value={result.severity}
                    valueColor={getSeverityColor(result.severity)}
                  />
                </ResultCard>

                <ResultCard title="Detailed Analysis" icon="📋">
                  <ResultText text={result.analysis} />
                </ResultCard>

                <ResultCard title="Recommendations" icon="💡">
                  <ResultText text={result.recommendation} />
                </ResultCard>

                <div className="glass rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
                  <p className="text-sm text-yellow-200/80">
                    <strong className="text-yellow-300">Medical Disclaimer:</strong> This analysis is for informational purposes only.
                    Please consult a qualified healthcare professional for proper medical advice and treatment.
                  </p>
                </div>
              </div>
            )}

            {!loading && !result && (
              <div className="glass rounded-2xl p-16 border border-white/10 text-center h-full flex flex-col items-center justify-center">
                <div className="text-7xl mb-6 animate-pulse-slow">🔬</div>
                <h3 className="text-xl font-semibold text-white mb-3">Ready to Analyze</h3>
                <p className="text-gray-400">Upload an image and click "Analyze Skin" to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SkinAnalysis() {
  return (
    <ProtectedRoute>
      <SkinAnalysisContent />
    </ProtectedRoute>
  )
}
