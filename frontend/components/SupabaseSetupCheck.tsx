'use client'

import { isSupabaseConfigured } from '@/lib/supabase'
import Link from 'next/link'

export default function SupabaseSetupCheck({ children }: { children: React.ReactNode }) {
  const isConfigured = isSupabaseConfigured()

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <div className="glass rounded-3xl p-8 border border-yellow-500/30 bg-yellow-500/5">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">⚙️</div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Supabase Setup Required
              </h1>
              <p className="text-gray-400">
                Authentication is not configured yet. Follow these quick steps to enable it.
              </p>
            </div>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="glass rounded-xl p-5 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Create Supabase Project</h3>
                    <p className="text-gray-400 text-sm mb-3">
                      Go to{' '}
                      <a
                        href="https://supabase.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 underline"
                      >
                        supabase.com
                      </a>
                      , sign up (free), and create a new project.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="glass rounded-xl p-5 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Get Your Credentials</h3>
                    <p className="text-gray-400 text-sm mb-3">
                      In your Supabase project: <strong>Settings → API</strong>
                      <br />
                      Copy your <strong>Project URL</strong> and <strong>anon/public key</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="glass rounded-xl p-5 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Create .env.local File</h3>
                    <p className="text-gray-400 text-sm mb-3">
                      In the <code className="bg-white/10 px-2 py-1 rounded">frontend/</code> directory, create a file named{' '}
                      <code className="bg-white/10 px-2 py-1 rounded">.env.local</code>
                    </p>
                    <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-gray-300">
                      <div>NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co</div>
                      <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="glass rounded-xl p-5 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Restart the Server</h3>
                    <p className="text-gray-400 text-sm mb-3">
                      Stop the dev server (Ctrl+C) and restart it:
                    </p>
                    <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-gray-300">
                      npm run dev
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <p className="text-sm text-blue-300">
                <strong>📚 Need detailed help?</strong>
                <br />
                Check the <code className="bg-white/10 px-2 py-1 rounded">SUPABASE_SETUP.md</code> file for complete instructions.
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                Or continue without authentication (limited functionality)
              </p>
              <Link
                href="/"
                className="inline-block mt-3 px-6 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
