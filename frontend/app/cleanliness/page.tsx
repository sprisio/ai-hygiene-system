'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import Loader from '@/components/Loader'
import ResultCard, { ResultItem, ResultText } from '@/components/ResultCard'

interface CleanlinessResult {
  score: number
  improvement: number
  analysis: string
  summary: string
}

function CleanlinessAnalysisContent() {
  const router = useRouter()
  const [beforeImage, setBeforeImage] = useState<File | null>(null)
  const [afterImage, setAfterImage] = useState<File | null>(null)
  const [beforePreview, setBeforePreview] = useState<string | null>(null)
  const [afterPreview, setAfterPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CleanlinessResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleBeforeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBeforeImage(file)
      setBeforePreview(URL.createObjectURL(file))
      setResult(null)
      setError(null)
    }
  }

  const handleAfterImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAfterImage(file)
      setAfterPreview(URL.createObjectURL(file))
      setResult(null)
      setError(null)
    }
  }

  const handleAnalyze = async () => {
    if (!beforeImage || !afterImage) {
      setError('Please select both before and after images')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('before_image', beforeImage)
      formData.append('after_image', afterImage)

      const response = await fetch('http://localhost:8000/api/cleanliness/analyze', {
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
    setBeforeImage(null)
    setAfterImage(null)
    setBeforePreview(null)
    setAfterPreview(null)
    setResult(null)
    setError(null)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400'
    if (score >= 60) return 'text-blue-400'
    if (score >= 40) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Needs Improvement'
  }

  const ImageUploadBox = ({
    title,
    preview,
    onChange,
  }: {
    title: string
    preview: string | null
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }) => (
    <div className="glass rounded-2xl p-6 border border-white/10 group hover:border-indigo-500/30 transition-all duration-300">
      <h3 className="mb-4 text-lg font-bold text-white flex items-center gap-2">
        <span className="text-2xl">{title.includes('Before') ? '📷' : '✨'}</span>
        {title}
      </h3>
      <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-white/20 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-300">
        {preview ? (
          <div className="relative w-full h-full p-2">
            <img src={preview} alt={title} className="h-full w-full object-contain rounded-lg" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
              <p className="text-white text-sm font-semibold">Click to change</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-3 p-4 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-white mb-1">Click to upload</p>
            <p className="text-xs text-gray-400">PNG, JPG, JPEG</p>
          </div>
        )}
        <input type="file" className="hidden" accept="image/*" onChange={onChange} />
      </label>
    </div>
  )

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
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
            <div className="text-5xl">✨</div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Cleanliness Analysis</h1>
              <p className="text-gray-400">AI-powered before-after comparison and improvement tracking</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Upload Section */}
          <div className="space-y-6 animate-slideIn">
            <ImageUploadBox
              title="Before Cleaning"
              preview={beforePreview}
              onChange={handleBeforeImageChange}
            />

            <ImageUploadBox
              title="After Cleaning"
              preview={afterPreview}
              onChange={handleAfterImageChange}
            />

            <button
              onClick={handleAnalyze}
              disabled={!beforeImage || !afterImage || loading}
              className={`w-full rounded-xl py-4 px-6 font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                !beforeImage || !afterImage || loading
                  ? 'bg-gray-600 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 glow-hover shadow-lg'
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Analyze Cleanliness
                </>
              )}
            </button>

            {result && (
              <button
                onClick={handleNewAnalysis}
                className="w-full rounded-xl py-4 px-6 font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 glow-hover shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                New Analysis
              </button>
            )}

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
                <div className="glass rounded-2xl p-10 border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 text-center">
                  <div className="mb-3">
                    <p className="text-lg font-medium text-gray-300">Cleanliness Score</p>
                  </div>
                  <div className="text-7xl font-bold mb-3 gradient-text">
                    {result.score.toFixed(0)}
                  </div>
                  <div className="inline-block px-6 py-2 rounded-full bg-white/10 border border-white/20">
                    <p className="text-xl font-semibold text-white">{getScoreLabel(result.score)}</p>
                  </div>
                </div>

                <ResultCard title="Improvement Metrics" icon="📊">
                  <ResultItem
                    label="Cleanliness Score"
                    value={`${result.score.toFixed(1)}/100`}
                    valueColor={getScoreColor(result.score)}
                    highlight={true}
                  />
                  <ResultItem
                    label="Improvement"
                    value={`+${result.improvement.toFixed(1)}%`}
                    valueColor="text-emerald-400"
                  />
                </ResultCard>

                <ResultCard title="Detailed Analysis" icon="🔍">
                  <ResultText text={result.analysis} />
                </ResultCard>

                <ResultCard title="Summary" icon="📝">
                  <ResultText text={result.summary} />
                </ResultCard>

                <div className="glass rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
                  <p className="text-sm text-blue-200/80">
                    <strong className="text-blue-300">Note:</strong> This analysis is based on AI visual comparison and provides
                    an estimated assessment of cleanliness improvement.
                  </p>
                </div>
              </div>
            )}

            {!loading && !result && (
              <div className="glass rounded-2xl p-16 border border-white/10 text-center h-full flex flex-col items-center justify-center">
                <div className="text-7xl mb-6 animate-pulse-slow">✨</div>
                <h3 className="text-xl font-semibold text-white mb-3">Ready to Compare</h3>
                <p className="text-gray-400">Upload before and after images to analyze cleanliness improvement</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CleanlinessAnalysis() {
  return (
    <ProtectedRoute>
      <CleanlinessAnalysisContent />
    </ProtectedRoute>
  )
}
