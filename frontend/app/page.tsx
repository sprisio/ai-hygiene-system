'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Card from '@/components/Card'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  const handleNavigation = (path: string) => {
    if (!user) {
      router.push('/auth/login')
    } else {
      router.push(path)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        {/* Header */}
        <div className="mb-20 text-center animate-fadeIn">
          <div className="mb-4 inline-block">
            <span className="text-sm font-semibold text-indigo-400 uppercase tracking-wider px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              WEB-A-THON-2.0
            </span>
          </div>
          
          <h1 className="mb-6 text-6xl md:text-7xl font-bold leading-tight">
            <span className="text-white">Accelerate Your</span>
            <br />
            <span className="gradient-text">Health Intelligence</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Highly personalized AI-powered analysis, expertly curated to meet your objectives and drive your healthcare forward.
          </p>

          {/* CTA Buttons - Show only if not logged in */}
          {!user && (
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                href="/auth/register"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold transition-all glow-hover shadow-lg flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Get Started Free
              </Link>
              <Link
                href="/auth/login"
                className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold transition-all"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 opacity-60">
            <div className="text-gray-500 text-sm">Powered by</div>
            {/* <div className="font-semibold text-gray-400">Google Gemini 2.5</div> */}
            <div className="font-semibold text-gray-400">Next.js 14</div>
            <div className="font-semibold text-gray-400">FastAPI</div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="flex flex-wrap justify-center gap-8 mb-20 animate-slideIn">
          <Card
            title="Skin Analysis"
            description="Advanced AI detection for acne, eczema, psoriasis, and more with professional-grade insights"
            icon="🔬"
            gradient="from-indigo-600 to-purple-600"
            onClick={() => handleNavigation('/skin')}
          />

          <Card
            title="Cleanliness Analysis"
            description="Intelligent before-after comparison to measure and track cleanliness improvements with precision"
            icon="✨"
            gradient="from-emerald-600 to-teal-600"
            onClick={() => handleNavigation('/cleanliness')}
          />
        </div>

        {/* Features Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-6 border border-white/10 text-center group hover:border-indigo-500/30 transition-all duration-300">
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-400">Get results in seconds with Our Model</p>
            </div>
            
            <div className="glass rounded-2xl p-6 border border-white/10 text-center group hover:border-indigo-500/30 transition-all duration-300">
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">🎯</div>
              <h3 className="text-lg font-semibold text-white mb-2">Highly Accurate</h3>
              <p className="text-sm text-gray-400">Advanced AI models for precise detection</p>
            </div>
            
            <div className="glass rounded-2xl p-6 border border-white/10 text-center group hover:border-indigo-500/30 transition-all duration-300">
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">🔒</div>
              <h3 className="text-lg font-semibold text-white mb-2">Secure & Private</h3>
              <p className="text-sm text-gray-400">Your data is processed securely and privately</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="glass rounded-2xl px-8 py-6 border border-yellow-500/20 bg-yellow-500/5">
            <p className="text-sm text-yellow-200/80">
              <strong className="text-yellow-300">Medical Disclaimer:</strong> This is an AI-based screening tool and not a substitute for professional medical advice.
              Always consult healthcare professionals for proper diagnosis and treatment.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-500 text-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
            <p>Made By Alogorithm Avengers</p>
          </div>
          <p className="text-gray-600">Built with Next.js, FastAPI & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  )
}
