'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { user, signOut, isConfigured } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    setDropdownOpen(false)
  }

  // If Supabase is not configured, show simple navbar without auth
  if (!isConfigured) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="text-3xl">🔬</span>
              <span className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                AI Health Intelligence
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <span className="text-yellow-300 text-sm font-medium">⚙️ Setup Required</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  if (!user) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="text-3xl">🔬</span>
              <span className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                AI Health Intelligence
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/auth/login"
                className="px-6 py-2 rounded-lg text-white hover:bg-white/10 transition-all font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium transition-all glow-hover"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-3xl">🔬</span>
            <span className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
              AI Health Intelligence
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Dashboard
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {user.user_metadata?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="text-white font-medium hidden sm:block">
                  {user.user_metadata?.full_name || 'User'}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 glass rounded-xl border border-white/10 overflow-hidden z-50 animate-fadeIn">
                    <div className="p-4 border-b border-white/10">
                      <p className="text-sm text-gray-400">Signed in as</p>
                      <p className="text-white font-medium truncate">{user.email}</p>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setDropdownOpen(false)
                          router.push('/')
                        }}
                        className="w-full px-4 py-2 text-left text-gray-300 hover:bg-white/10 hover:text-white transition-all flex items-center gap-3"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all flex items-center gap-3"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
